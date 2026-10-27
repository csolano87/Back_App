const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validarJWT, tieneRole]);
router.get("/:id", [validarJWT, tieneRole]);
router.post("/", [
  validarJWT,
  tieneRole,
  check("numeroCaso", "El numero de caso es obligatorio").not().isEmpty(),
  check("asunto", "El asunto es obligatorio").not().isEmpty(),
  check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
]);
router.put("/:id", [
  validarJWT,
  tieneRole,
  check("numeroCaso", "El numero de caso es obligatorio").not().isEmpty(),
  check("asunto", "El asunto es obligatorio").not().isEmpty(),
  check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
]);
router.delete("/:id", [validarJWT, tieneRole]);

module.exports = router;
