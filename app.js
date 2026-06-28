const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const sequelize = require("./config/bd");

const Eletrodomestico = require("./models/eletrodomestico");
const equipamentos = require("./seed/equipamentos");
const routes = require("./routes/eletrodomesticoRoutes");

const app = express();


// ======================
// CONFIGURAÇÕES
// ======================

app.engine("handlebars", engine());

app.set("view engine", "handlebars");


app.use(express.urlencoded({
    extended:true
}));

app.use("/", routes);

app.use(express.json());

app.use("/", routes);

app.use(express.static(
    path.join(__dirname,"public")
));

app.use("/", routes);


// ======================
// ROTAS
// ======================


app.get("/", (req,res)=>{

    res.send("Servidor funcionando");

});


// ======================
// BANCO + SERVIDOR
// ======================


async function iniciar(){

    try{

        await sequelize.sync();

        console.log("Tabela criada!");


        const quantidade = await Eletrodomestico.count();


        if(quantidade === 0){

            await Eletrodomestico.bulkCreate(equipamentos);

            console.log("Equipamentos cadastrados!");

        } else {

            console.log(
              `Banco já possui ${quantidade} equipamentos`
            );

        }



        app.listen(3000,()=>{

            console.log(
                "Servidor em http://localhost:3000"
            );

        });



    }catch(erro){

        console.log(
            "Erro:",
            erro
        );

    }

}

iniciar();