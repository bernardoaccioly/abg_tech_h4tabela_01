const express=require("express");

const router=express.Router();

const controller=require("../controllers/equipamentoController");



router.get(
"/equipamentos",
controller.listar
);



router.put(
"/equipamentos/:id/visibilidade",
controller.alterarVisibilidade
);



module.exports=router;  