const { Router } = require("express");

const {
  createTipoMovimiento,
  getTipoMovimiento,
  getIdTipoMovimiento,
  updateTipoMovimiento,
  deleteTipoMovimiento,
} = require("../../controllers/inventory/tipos_movimiento");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");
const router = Router();

router.get("/", [validarJWT, tieneRole], getTipoMovimiento);
router.get("/:id", [validarJWT, tieneRole], getIdTipoMovimiento);
router.post(
  "/",
  [validarJWT, tieneRole, 
    check("nombre", "El nombre es obligatorio").not().isEmpty(), 
    //check("rolId").custom(rolValido)
  validarCampos],
  createTipoMovimiento,
);

router.put(
  "/:id",
  [validarJWT, tieneRole, 
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
     //check("rolId").custom(rolValido)
    ],
  updateTipoMovimiento,
);

router.delete("/:id", [validarJWT, tieneRole], deleteTipoMovimiento);

module.exports = router;
