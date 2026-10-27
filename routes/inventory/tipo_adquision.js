const { Router } = require("express");
const {
createAreaEquipo,
  getIdAreaEquipo,
  getAreaEquipo,
  updateAreaEquipo,
  deleteAreaEquipo,
} = require("../../controllers/inventory/areas_equipos");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getAreaEquipo);
router.get("/:id", [validarJWT, tieneRole], getIdAreaEquipo);
router.post(
  "/",
  [validarJWT, tieneRole,
     check("nombre", "El nombre es obligatorio").not().isEmpty(), 
   //  check("rolId").custom(rolValido)
    validarCampos],
  createAreaEquipo,
);

router.put(
  "/:id",
  [validarJWT, tieneRole,
     check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
  validarCampos
    ],
  updateAreaEquipo,
);

router.delete("/:id", [validarJWT, tieneRole], deleteAreaEquipo);

module.exports = router;
