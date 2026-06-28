const Eletrodomestico = require("../models/eletrodomestico");

// ===============================
// LISTAR EQUIPAMENTOS VISÍVEIS
// ===============================

async function listarEquipamentos(req, res) {

    try {

        const equipamentos = await Eletrodomestico.findAll({

            where: {
                visivel: true
            },

            order: [
                ["categoria", "ASC"],
                ["nome", "ASC"]
            ]

        });

        res.render("eletrodomesticos", {

            equipamentos: equipamentos.map(e => e.get({ plain: true }))

        });

    } catch (erro) {

        console.error("Erro ao listar equipamentos:", erro);

        res.status(500).send("Erro ao carregar os equipamentos.");

    }

}


// ===============================
// OCULTAR EQUIPAMENTO
// ===============================

async function ocultarEquipamento(req, res) {

    try {

        await Eletrodomestico.update(

            {
                visivel: false
            },

            {
                where: {
                    id: req.params.id
                }
            }

        );

        res.redirect("/eletrodomesticos");

    } catch (erro) {

        console.error("Erro ao ocultar equipamento:", erro);

        res.status(500).send("Erro ao ocultar equipamento.");

    }

}


// ===============================
// LISTAR EQUIPAMENTOS OCULTOS
// ===============================

async function listarOcultos(req, res) {

    try {

        const equipamentos = await Eletrodomestico.findAll({

            where: {
                visivel: false
            },

            order: [
                ["categoria", "ASC"],
                ["nome", "ASC"]
            ]

        });

        res.render("ocultos", {

            equipamentos: equipamentos.map(e => e.get({ plain: true }))

        });

    } catch (erro) {

        console.error("Erro ao listar ocultos:", erro);

        res.status(500).send("Erro ao carregar equipamentos ocultos.");

    }

}


// ===============================
// RESTAURAR EQUIPAMENTO
// ===============================

async function restaurarEquipamento(req, res) {

    try {

        await Eletrodomestico.update(

            {
                visivel: true
            },

            {
                where: {
                    id: req.params.id
                }
            }

        );

        res.redirect("/equipamentos-ocultos");

    } catch (erro) {

        console.error("Erro ao restaurar equipamento:", erro);

        res.status(500).send("Erro ao restaurar equipamento.");

    }

}


module.exports = {

    listarEquipamentos,

    ocultarEquipamento,

    listarOcultos,

    restaurarEquipamento

};