const { Router } = require("express");
const { getMarcas, getIdMarcas, createMarca, updateMarca, deleteMarca } = require("../../controllers/marcas");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole } = require("../../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getMarcas);
router.get("/:id", [validarJWT, esAdminRole], getIdMarcas);
router.post(
  "/",
  [validarJWT, createTipoAdquision,
     check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  createMarca,
);

router.put(
  "/:id",
  [validarJWT, esAdminRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  updateMarca,
);

router.delete("/:id", [validarJWT, esAdminRole], deleteMarca);

module.exports = router;
