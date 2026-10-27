const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { getEquipos, getByIdEquipos, createEquipos, updateEquipos, deleteEquipos } = require("../../controllers/inventory/equipos");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getEquipos);
router.get("/:id", [validarJWT, esAdminRole], getByIdEquipos);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("serie", "La serie es obligatorio").not().isEmpty(),
    check("fechaElaboracion", "La fecha de elaboracion es obligatorio").not().isEmpty(),
validarCampos
  //  check("rolId").custom(rolValido),
  ],
  createEquipos,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("serie", "La serie es obligatorio").not().isEmpty(),
    check("fechaElaboracion", "La fecha de elaboracion es obligatorio").not().isEmpty(),
validarCampos
   // check("rolId").custom(rolValido),
  ],
  updateEquipos,
);
router.delete("/:id", [validarJWT, tieneRole], deleteEquipos);

module.exports = router;
