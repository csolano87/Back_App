const { Router } = require("express");
const {
  createTipoAdquision,
  getIdTipoAdquision,
  getTipoAdquision,
  updateTipoAdquision,
  deleteTipoAdquision,
} = require("../../controllers/tipo_adquision");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole } = require("../../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getTipoAdquision);
router.get("/:id", [validarJWT, esAdminRole], getIdTipoAdquision);
router.post(
  "/",
  [validarJWT, createTipoAdquision, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  createRoles,
);

router.put(
  "/:id",
  [validarJWT, esAdminRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  updateTipoAdquision,
);

router.delete("/:id", [validarJWT, esAdminRole], deleteTipoAdquision);

module.exports = router;
