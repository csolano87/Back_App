const { Router } = require("express");

const { createRoles, getRoles, deleteRoles, updateRoles, getIdRoles } = require("../../controllers/security/roles");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const router = Router();

router.get("/", [validarJWT, esAdminRole], getRoles);
router.get("/:id", [validarJWT, esAdminRole], getIdRoles);
router.post(
  "/",
  [validarJWT, esAdminRole, check("nombre", "El nombre es obligatorio").not().isEmpty(),
     check("rolId").custom(rolValido)],
  createRoles,
);

router.put(
  "/:id",
  [validarJWT, esAdminRole, check("nombre", "El nombre es obligatorio").not().isEmpty(), check("rolId").custom(rolValido)],
  updateRoles,
);

router.delete("/:id", [validarJWT, esAdminRole], deleteRoles);

module.exports = router;
