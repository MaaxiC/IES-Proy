import { initializeMongoDB } from "./database.js";
import { config } from "./config/config.js";
import { createRoles } from "./libs/initialSetup.js";
import app from "./app.js";

//Inicializacion
initializeMongoDB();
createRoles();

//Servidor
app.listen(config.server.PORT);
console.log(`Servidor escuchando en ${config.server.PORT}`);
