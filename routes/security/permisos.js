const { Router } = require("express");

const {   createPermisos,
  getPermisos,
  getIdPermisos,
  updatePermisos,
  deletePermisos, } = require("../../controllers/security/permisos");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");
const router = Router();

router.get("/", [validarJWT, esAdminRole], getPermisos);
router.get("/:id", [validarJWT, esAdminRole], getIdPermisos);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
validarCampos
 //   check("rolId").custom(rolValido),
  ],
  createPermisos,
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
validarCampos
    //check("rolId").custom(rolValido),
  ],
  updatePermisos,
);

router.delete("/:id", [validarJWT, esAdminRole], deletePermisos);

module.exports = router;
