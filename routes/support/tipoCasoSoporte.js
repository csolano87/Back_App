const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const {
  deleteTipoSoporte,
  updateTipoSoporte,
  createTipoSoporte,
  getByIdTipoSoporte,
  getTipoSoporte,
} = require("../../controllers/support/tipoCasoSoporte");

const router = Router();

router.get("/", [validarJWT, tieneRole, getTipoSoporte]);
router.get("/:id", [validarJWT, tieneRole, getByIdTipoSoporte]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
  createTipoSoporte,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
  updateTipoSoporte,
]);
router.delete("/:id", [validarJWT, tieneRole, deleteTipoSoporte]);

module.exports = router;
