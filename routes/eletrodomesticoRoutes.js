const express = require("express");

const router = express.Router();

const controller = require("../controllers/eletrodomesticoController");

router.get(
    "/eletrodomesticos",
    controller.listarEquipamentos
);

router.post(
    "/ocultar/:id",
    controller.ocultarEquipamento
);

router.get(
    "/equipamentos-ocultos",
    controller.listarOcultos
);

router.post(
    "/restaurar/:id",
    controller.restaurarEquipamento
);

module.exports = router;