// Importaciones necesarias de Mongoose y bcrypt
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Expresión regular para validar direcciones de correo electrónico
const emailRegex: RegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// Definición de la interfaz IUser que extiende de Document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
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
        required: true,
      },
      url: {
        type: String,
        required: true,
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

// Método para comparar contraseñas utilizando bcrypt
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creación del modelo de usuario con el esquema definido
const UserModel: Model<IUser> = mongoose.model("User", userSchema);

// Exportación del modelo de usuario para su uso en otros módulos
export default UserModel;
