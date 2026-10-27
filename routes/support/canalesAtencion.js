const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const {
  getCanalAtencion,
  getByIdCanalAtencion,
  createCanalAtencion,
  updateCanalAtencion,
  deleteCanalAtencion,
} = require("../../controllers/support/canalesAtencion");

const router = Router();

router.get("/", [validarJWT, tieneRole, getCanalAtencion]);
router.get("/:id", [validarJWT, tieneRole, getByIdCanalAtencion]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),

  validarCampos,
  createCanalAtencion,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),

  validarCampos,
  updateCanalAtencion,
]);
router.delete("/:id", [validarJWT, tieneRole, deleteCanalAtencion]);

module.exports = router;
