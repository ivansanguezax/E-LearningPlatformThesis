import {app} from './app';
import connectDB from './utils/db';
require('dotenv').config();


//Creamos el server
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
    connectDB();
});