// Importa la librería dotenv para cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Importa las librerías nodemailer, Transporter de nodemailer, ejs y path
import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

// Define la interfaz para las opciones del correo electrónico
interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

// Función asincrónica para enviar correos electrónicos
const sendMail = async (options: EmailOptions): Promise<void> => {
    // Crea un transportador de nodemailer con la configuración proporcionada
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Extrae las propiedades necesarias de las opciones proporcionadas
    const { email, subject, template, data } = options;

    // Construye la ruta completa del archivo de plantilla de correo electrónico
    const templatePath = path.join(__dirname, '../mails', template);

    // Renderiza el contenido HTML del correo electrónico utilizando EJS y los datos proporcionados
    const html: string = await ejs.renderFile(templatePath, data);

    // Configura las opciones del correo electrónico
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: subject,
        html: html,
    };

    // Envía el correo electrónico utilizando el transportador
    await transporter.sendMail(mailOptions);
};

// Exporta la función sendMail para su uso en otros módulos
export default sendMail;
