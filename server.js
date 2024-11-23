import express, { json } from "express";
import routes from "./src/routes/postsRoutes.js";
// Array de posts de exemplo (será substituído pelos dados do banco de dados)

// Cria uma instância do Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});