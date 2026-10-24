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
const { esAdminRole } = require("../../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getAreaEquipo);
router.get("/:id", [validarJWT, esAdminRole], getIdAreaEquipo);
router.post(
  "/",
  [validarJWT, createTipoAdquision, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  createAreaEquipo,
);

router.put(
  "/:id",
  [validarJWT, esAdminRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  updateAreaEquipo,
);

router.delete("/:id", [validarJWT, esAdminRole], deleteAreaEquipo);

module.exports = router;
