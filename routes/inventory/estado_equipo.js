const { Router } = require("express");

const {
  createEstadoEquipo,
  getEstadoEquipo,
  getIdEstadoEquipo,
  updateEstadoEquipo,
  deleteEstadoEquipo,
} = require("../../controllers/inventory/estado_equipo");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getEstadoEquipo);
router.get("/:id", [validarJWT, tieneRole], getIdEstadoEquipo);
router.post(
  "/",
  [validarJWT, tieneRole, 
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check("rolId").custom(rolValido)
     validarCampos],
  createEstadoEquipo,
);

router.put(
  "/:id",
  [validarJWT, tieneRole, 
    check("nombre", "El nombre es obligatorio").not().isEmpty(), 
    //check("rolId").custom(rolValido)
  validarCampos],
  updateEstadoEquipo,
);

router.delete("/:id", [validarJWT, tieneRole], deleteEstadoEquipo);

module.exports = router;
