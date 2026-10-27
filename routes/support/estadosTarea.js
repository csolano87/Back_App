const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const {
  getEstadoTarea,
  getByIdEstadoTarea,
  createEstadoTarea,
  updateEstadoTarea,
  deleteEstadoTarea,
} = require("../../controllers/support/estadosTarea");

const router = Router();

router.get("/", [validarJWT, tieneRole, getEstadoTarea]);
router.get("/:id", [validarJWT, tieneRole, getByIdEstadoTarea]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("codigo", "El codigo es obligatorio").not().isEmpty(),

  check("nombre", "El nombre es obligatorio").not().isEmpty(),

  validarCampos,
  createEstadoTarea,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("codigo", "El codigo es obligatorio").not().isEmpty(),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),

  validarCampos,
  updateEstadoTarea,
]);
router.delete("/:id", [validarJWT, tieneRole, deleteEstadoTarea]);

module.exports = router;
