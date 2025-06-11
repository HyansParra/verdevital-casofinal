# VerdeVital - Tienda Natural (Proyecto Final de Programación Web)

Este proyecto fue desarrollado como parte de la evaluación final para la asignatura de Programación Web del IP Santo Tomás. El objetivo principal fue tomar una maqueta estática de una tienda de productos naturales, "VerdeVital", y transformarla en una aplicación web completamente funcional, implementando un backend robusto para gestionar productos, usuarios y pedidos.

## Descripción del Proyecto

VerdeVital es una tienda familiar que necesitaba digitalizar su sistema de inventario y ventas, que hasta ahora era completamente manual. El desafío era construir una solución que permitiera a los clientes ver el stock de productos en tiempo real, registrarse, comprar de forma segura y que, a su vez, actualizara el inventario de forma automática tras cada pedido.

Este repositorio contiene el código fuente tanto del frontend (la tienda visible para el cliente) como del backend (el servidor que procesa toda la lógica).

## Funcionalidades Implementadas

* **Catálogo de Productos Dinámico:** Los productos se cargan directamente desde una base de datos MongoDB, asegurando que la información esté siempre actualizada.
* **API RESTful:** Se construyó un servidor con Node.js y Express para exponer diferentes endpoints que gestionan productos, autenticación y pedidos.
* **Sistema de Autenticación de Usuarios:** Los usuarios pueden registrarse y crear una cuenta. El inicio de sesión es seguro y utiliza JSON Web Tokens (JWT) para gestionar las sesiones.
* **Persistencia de Datos:** Toda la información (usuarios, productos) se almacena de forma permanente en una base de datos en la nube (MongoDB Atlas).
* **Carrito de Compras y Sincronización de Stock:** Los usuarios pueden agregar productos a un carrito, que persiste en el navegador. Al completar un pedido, el stock del producto se descuenta automáticamente en la base de datos.
* **Notificaciones en Tiempo Real:** Se integró un bot de Telegram que avisa al equipo de operaciones instantáneamente cada vez que se recibe un nuevo pedido, optimizando la gestión de la tienda.

## Tecnologías Utilizadas

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
    * Fetch API
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB Atlas (Base de Datos en la Nube)
    * Mongoose (para modelar los datos de la BD)
    * JSON Web Tokens (jsonwebtoken)
    * Bcrypt.js (para encriptación de contraseñas)
    * Node-Telegram-Bot-API (para la integración con Telegram)
    * Dotenv (para la gestión de variables de entorno)

## Instalación y Puesta en Marcha

Para ejecutar este proyecto en un entorno local, sigue estos pasos:

### Prerrequisitos

* Tener instalado [Node.js](https://nodejs.org/)
* Tener instalado [Git](https://git-scm.com/)
* Credenciales para una base de datos en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
* Un Token de un Bot de Telegram y un Chat ID.

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/HyansParra/verdevital-casofinal.git](https://github.com/HyansParra/verdevital-casofinal.git)
cd verdevital-casofinal

2. Configuración del Backend
Navega a la carpeta del backend:
Bash

cd backend
Instala todas las dependencias necesarias:
Bash

npm install
Crea un archivo .env en la raíz de la carpeta backend y añade tus credenciales:
MONGO_URI=TU_CADENA_DE_CONEXION_DE_MONGODB
JWT_SECRET=UNA_CLAVE_SECRETA_PARA_JWT
TELEGRAM_BOT_TOKEN=EL_TOKEN_DE_TU_BOT_DE_TELEGRAM
TELEGRAM_CHAT_ID=EL_ID_DE_TU_CHAT_DE_TELEGRAM
Puebla la base de datos con los productos iniciales ejecutando el script "seeder":
Bash

node seeder.js
Inicia el servidor del backend:
Bash

node server.js
Si todo va bien, verás un mensaje confirmando la conexión a MongoDB y que el servidor está corriendo en el puerto 3000.
3. Ejecución del Frontend
Abre la carpeta principal del proyecto (verdevital-casofinal) en Visual Studio Code.
Haz clic derecho en el archivo index.html y ábrelo con Live Server.
La página se abrirá en tu navegador y se conectará automáticamente al backend que dejaste corriendo en la terminal. ¡Ya puedes registrarte, iniciar sesión y probar la tienda!