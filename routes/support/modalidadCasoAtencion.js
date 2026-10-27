const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getModalidadAtencion,
  getByIdModalidadAtencion,
  createModalidadAtencion,
  updateModalidadAtencion,
  deleteModalidadAtencion,
} = require("../../controllers/support/modalidadCasoAtencion");

const router = Router();

router.get("/", [validarJWT, tieneRole, getModalidadAtencion]);
router.get("/:id", [validarJWT, tieneRole, getByIdModalidadAtencion]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("codigo", "El codigo es obligatorio").not().isEmpty(),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
  createModalidadAtencion,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("codigo", "El codigo es obligatorio").not().isEmpty(),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
  updateModalidadAtencion,
]);
router.delete("/:id", [validarJWT, tieneRole, deleteModalidadAtencion]);

module.exports = router;
