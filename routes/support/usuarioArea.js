const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole]);
router.get("/:id", [validarJWT, tieneRole]);
router.post(
  "/",
  [validarJWT, tieneRole],
  check("usuarioId", "El nombre es obligatorio").not().isEmpty(),
  check("areaId", "El nombre es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
);
router.put(
  "/:id",
  [validarJWT, tieneRole],
  check("usuarioId", "El nombre es obligatorio").not().isEmpty(),
  check("areaId", "El nombre es obligatorio").not().isEmpty(),
  //  check("rolId").custom(rolValido)
  validarCampos,
);
router.delete("/:id", [validarJWT, tieneRole]);

module.exports = router;
