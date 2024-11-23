import express from "express";
import multer from "multer";
import { listarPosts,postarNovoPost ,uploadImagem,atualizarNovoPost} from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
  origin : "http://localhost:8000",
  optionsSuccessStatus : 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });

const upload = multer({dest:"/.uploads",storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    app.post("/posts",postarNovoPost);

    app.post("/upload",upload.single("imagem") , uploadImagem)
    //Metodo para atualizar 
    app.put("/upload/:id",atualizarNovoPost)
}

export default routes;