const { Router } = require("express");

const {
  createEquipoMovimiento,
  getEquipoMovimiento,
  getIdEquipoMovimiento,
  updateEquipoMovimiento,
  deleteEquipoMovimiento,
} = require("../../controllers/inventory/equipo_movimiento");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getEquipoMovimiento);
router.get("/:id", [validarJWT, tieneRole], getIdEquipoMovimiento);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("fechaMovimiento", "La fecha movimiento es obligatorio").not().isEmpty(),
    check("observacion", "La observacion fin es obligatorio").not().isEmpty(),
validarCampos
 //   check("rolId").custom(rolValido),
  ],
  createEquipoMovimiento,
);

router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("fechaMovimiento", "La fecha movimiento es obligatorio").not().isEmpty(),
    check("observacion", "La observacion fin es obligatorio").not().isEmpty(),
    //check("rolId").custom(rolValido),
    validarCampos
  ],
  updateEquipoMovimiento,
);

router.delete("/:id", [validarJWT, tieneRole], deleteEquipoMovimiento);

module.exports = router;
