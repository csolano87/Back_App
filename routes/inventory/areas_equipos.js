const { Router } = require("express");
const {
  createTipoAdquision,
  getIdTipoAdquision,
  getTipoAdquision,
  updateTipoAdquision,
  deleteTipoAdquision,
} = require("../../controllers/inventory/tipo_adquision");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTipoAdquision);
router.get("/:id", [validarJWT, tieneRole], getIdTipoAdquision);
router.post("/", [validarJWT, tieneRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos], createTipoAdquision);

router.put(
  "/:id",
  [validarJWT, tieneRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos],
  updateTipoAdquision,
);

router.delete("/:id", [validarJWT, tieneRole], deleteTipoAdquision);

module.exports = router;
