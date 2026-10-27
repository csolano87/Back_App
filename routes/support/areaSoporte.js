const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const {
  getAreaSoporte,
  getByIdAreaSoporte,
  createAreaSoporte,
  updateAreaSoporte,
  deleteAreaSoporte,
} = require("../../controllers/support/areaSoporte");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validarJWT, tieneRole], getAreaSoporte);
router.get("/:id", [validarJWT, tieneRole], getByIdAreaSoporte);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createAreaSoporte,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  updateAreaSoporte,
);
router.delete("/:id", [validarJWT, tieneRole], deleteAreaSoporte);

module.exports = router;
