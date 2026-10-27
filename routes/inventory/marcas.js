const { Router } = require("express");
const { getMarcas, getIdMarcas, createMarca, updateMarca, deleteMarca } = require("../../controllers/inventory/marcas");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getMarcas);
router.get("/:id", [validarJWT, tieneRole], getIdMarcas);
router.post(
  "/",
  [validarJWT, tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
   // check("rolId").custom(rolValido),
  validarCampos],
  createMarca,
);

router.put(
  "/:id",
  [validarJWT, tieneRole,
     check("nombre", "El nombre es obligatorio").not().isEmpty(), 
    // check("rolId").custom(rolValido)
    validarCampos],
  updateMarca,
);

router.delete("/:id", [validarJWT, tieneRole], deleteMarca);

module.exports = router;
