// Importa la librería dotenv para cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importaciones necesarias de Mongoose, jwt y bcrypt
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Expresión regular para validar direcciones de correo electrónico
const emailRegex: RegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// Definición de la interfaz IUser que extiende de Document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

// Definición del esquema de usuario con validaciones y opciones
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (val: string) {
          return emailRegex.test(val);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    avatar: {
        public_id: {
          type: String,
          required: false, // Hacerlo opcional
        },
        url: {
          type: String,
          required: false, // Hacerlo opcional
        },
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Middleware pre-save para hash de la contraseña antes de guardar en la base de datos
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});


// Método para generar un token JWT de acceso
userSchema.methods.signAccessToken = function () {
  return jwt.sign({id:this._id}, process.env.ACCESS_TOKEN || '');
};

// Método para generar un token JWT de actualización
userSchema.methods.signRefreshToken = function () {
  return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN || '');
}


// Método para comparar contraseñas utilizando bcrypt
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creación del modelo de usuario con el esquema definido
const UserModel: Model<IUser> = mongoose.model("User", userSchema);

// Exportación del modelo de usuario para su uso en otros módulos
export default UserModel;
