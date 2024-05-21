<p align="center">
  <a href="#">
    <picture>
      <source height="100" media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dfgjenml4/image/upload/v1716307272/swaorux0plylop5vcffx.png">
      <img height="100" alt="Fiber" src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716307272/swaorux0plylop5vcffx.png">
    </picture>
  </a>
</p>
<p align="center">
  <em><b>AruQhana</b> es una <b>solución innovadora</b> diseñada para que los niños con discapacidad auditiva puedan continuar su educación incluso en tiempos de crisis. Esta <b>plataforma accesible</b> adapta las materias ya impartidas en los colegios a un formato efectivo y accesible para estos estudiantes. <br/> <br/>  Este prototipo ha sido desarrollado para la Universidad Mayor de San Andrés como requisito para optar por un grado académico.</em>
</p>


---
## ⚠️ **Atención**

AruQhana es actualmente un prototipo y se encuentra en desarrollo activo. Aunque ofrece características emocionantes, ten en cuenta que puede no ser estable para su uso en producción. Recomendamos utilizar versiones estables y probadas para aplicaciones críticas.

---

### Tecnologías usadas 🛠️

#### Frontend
![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### Backend
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-%2334318C.svg?style=for-the-badge&logo=cloudinary&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-%23E535AB.svg?style=for-the-badge&logo=upstash&logoColor=white)


## ⚙️ Installation

### Frontend
#### 📂 Clonar el repositorio
   ```bash
   git clone [URL del repositorio]
   cd [nombre del repositorio]
```
Clona el repositorio y navega al directorio del proyecto.
#### 🔧 Instalar dependencias
 ```bash
 npm install
```
Este comando instalará todas las dependencias necesarias para el proyecto.

#### ⚙️ Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:
```bash
NEXT_PUBLIC_SERVER_URI="http://localhost:8000/api/v1/"
NEXT_PUBLIC_SOCKET_SERVER_URI="http://localhost:8000/"
```
#### 🔑 Agregar Google Client ID y Secret

Agrega las siguientes líneas a tu archivo .env:

```bash
GOOGLE_CLIENT_ID="[tu-google-client-id]"
GOOGLE_CLIENT_SECRET="[tu-google-client-secret]"

```
#### ▶️ Iniciar el servidor de desarrollo
```bash
npm run dev
```
Este comando iniciará el servidor de desarrollo en modo local. Generalmente, estará disponible en http://localhost:3000.

### Backend
#### 📂 Clonar el repositorio
```bash
   git clone [URL del repositorio]
   cd [nombre del repositorio]
```
   Clona el repositorio y navega al directorio del proyecto.
#### 🔧 Instalar dependencias
```bash
npm install
```
Este comando instalará todas las dependencias necesarias para el proyecto.
#### ⚙️ Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:
```bash
PORT=8000
ORIGIN=['http://localhost:3000/']

NODE_ENV=development
DB_URL='[TU_DB_URL]'

CLOUD_NAME='[TU_CLOUD_NAME]'
CLOUD_API_KEY='[TU_CLOUD_API_KEY]'
CLOUD_SECRET_KEY='[TU_CLOUD_SECRET_KEY]'

REDIS_URL='[TU_REDIS_URL]'

ACTIVATION_SECRET='[TU_ACTIVATION_SECRET]'
ACCESS_TOKEN='[TU_ACCESS_TOKEN]'
REFRESH_TOKEN='[TU_REFRESH_TOKEN]'
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_EMAIL='[TU_SMTP_EMAIL]'
SMTP_PASSWORD='[TU_SMTP_PASSWORD]'

VDOCIPHER_API_SECRET='[TU_VDOCIPHER_API_SECRET]'
```
#### 🔧 Configurar Upstash para Redis
Registra tu cuenta en Upstash y crea una nueva instancia de Redis. Copia la URL de Redis y agrégala en el archivo .env:
```bash
REDIS_URL='[TU_REDIS_URL]'
```
#### ☁️ Configurar Cloudinary
Registra tu cuenta en Cloudinary y crea una nueva configuración. Copia el nombre de tu nube, clave API y secreto API, luego agrégalo en el archivo .env:
```bash
CLOUD_NAME='[TU_CLOUD_NAME]'
CLOUD_API_KEY='[TU_CLOUD_API_KEY]'
CLOUD_SECRET_KEY='[TU_CLOUD_SECRET_KEY]'
```
#### 📧 Configurar SMTP para envío de correos
Utiliza una cuenta de Gmail o cualquier otro servicio SMTP. Asegúrate de habilitar el acceso de aplicaciones menos seguras en tu cuenta de Gmail o utiliza una contraseña de aplicación. Agrega los detalles en el archivo .env:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_EMAIL='[TU_SMTP_EMAIL]'
SMTP_PASSWORD='[TU_SMTP_PASSWORD]'
```
#### 🔐 Configurar tokens de autenticación
Genera tus propios secretos y tokens de autenticación y agrégalos en el archivo .env:

```bash
ACTIVATION_SECRET='[TU_ACTIVATION_SECRET]'
ACCESS_TOKEN='[TU_ACCESS_TOKEN]'
REFRESH_TOKEN='[TU_REFRESH_TOKEN]'
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3
```

#### 🔐 Configurar VdoCipher
Registra tu cuenta en VdoCipher y copia tu secreto API, luego agrégalo en el archivo .env:
```bash
VDOCIPHER_API_SECRET='[TU_VDOCIPHER_API_SECRET]'
```

#### ▶️ Iniciar el servidor

```bash 
npm start
```

Este comando iniciará el servidor backend en modo local. Generalmente, estará disponible en http://localhost:8000.

## 🧾MIT License

Copyright (c) 2024 Ivan Sangueza Alarcon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
