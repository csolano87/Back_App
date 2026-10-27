const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");
const {
  getEstadoCaso,
  updateEstadoCaso,
  createEstadoCaso,
  getByIdEstadoCaso,
  deleteEstadoCaso,
} = require("../../controllers/support/estadoCasos");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validarJWT, tieneRole], getEstadoCaso);
router.get("/:id", [validarJWT, tieneRole], getByIdEstadoCaso);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createEstadoCaso,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  updateEstadoCaso,
);
router.delete("/:id", [validarJWT, tieneRole], deleteEstadoCaso);

module.exports = router;
