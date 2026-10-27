const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const {
  getCasoAsignacion,
  getByIdCasoAsignacion,
  createCasoAsignacion,
  updateCasoAsignacion,
  deleteCasoAsignacion,
} = require("../../controllers/support/casoSoporteAsignacion");
const { check } = require("express-validator");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole, getCasoAsignacion]);
router.get("/:id", [validarJWT, tieneRole, getByIdCasoAsignacion]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("casoId", "El numeor de caso  es obligatorio").not().isEmpty(),
  check("motivo", "El motivo es obligatorio").not().isEmpty(),
  check("usuarioOrigenId", "El usuario origen es obligatorio").not().isEmpty(),
  check("usuarioDestinoId", "El usuario destino es obligatorio").not().isEmpty(),
  check("usuarioAsignadorId", "El usuario asignador  es obligatorio").not().isEmpty(),

  validarCampos,
  createCasoAsignacion,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("casoId", "El numeor de caso  es obligatorio").not().isEmpty(),
  check("motivo", "El motivo es obligatorio").not().isEmpty(),
  check("usuarioOrigenId", "El usuario origen es obligatorio").not().isEmpty(),
  check("usuarioDestinoId", "El usuario destino es obligatorio").not().isEmpty(),
  check("usuarioAsignadorId", "El usuario asignador  es obligatorio").not().isEmpty(),

  validarCampos,
  updateCasoAsignacion,
]);
router.delete("/:id", [validarJWT, tieneRole, deleteCasoAsignacion]);

module.exports = router;
