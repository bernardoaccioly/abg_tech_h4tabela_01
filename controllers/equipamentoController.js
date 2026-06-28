const Equipamento=require("../models/equipamento");
const UsuarioEquipamento=require("../models/usuarioEquipamento");



exports.listar = async(req,res)=>{


const usuario=1;


const equipamentos = await Equipamento.findAll({

include:[

{
model:UsuarioEquipamento,
where:{
usuario_id:usuario
},
required:false
}

]


});


res.render("equipamentos",{

equipamentos

});


};

exports.alterarVisibilidade = async(req,res)=>{


const id=req.params.id;


const {visivel}=req.body;



await UsuarioEquipamento.update(

{
visivel
},

{
where:{
equipamento_id:id,
usuario_id:1
}

}


);


res.redirect("/equipamentos");


}