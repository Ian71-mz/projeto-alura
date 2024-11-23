import { getTodosPosts,criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { buffer } from "stream/consumers";

export async function listarPosts (req, res)
{
    const posts =  await getTodosPosts();
    res.status(200).json(posts);

}

export async function postarNovoPost(req,res){
    const novoPost = req.body;
    try{
       const postCriado = await criarPost (novoPost)
       res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.menssage);
        res.status(500).json({"Erro":"Falha na requisição"})
    }

}

export async function uploadImagem(req,res){
    const novoPost = {
        descricao : "",
        imgUrl : req.file.originalname,
        alt : ""
    }
    try{
       const postCriado = await criarPost (novoPost)
       const imagemAtulizada = `uploads/${postCriado.insertedId}.png`
       fs.renameSync(req.file.path,imagemAtulizada)
       res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.menssage);
        res.status(500).json({"Erro":"Falha na requisição"})
    }

}

export async function atualizarNovoPost(req,res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    
    try{
       const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
       const descricao = await gerarDescricaoComGemini(imgBuffer)

       const post = {
        imgUrl : urlImagem,
        descricao : descricao,
        alt : req.body.alt
       }

       const postCriado = await atualizarPost (id,post)
       res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.menssage);
        res.status(500).json({"Erro":"Falha na requisição"})
    }

}



    
