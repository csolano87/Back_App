const { Router } = require("express");

const { getMenus,
getIdMenus,
createMenus,
updateMenus,
deleteMenus} = require("../../controllers/security/menus");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole } = require("../../middleware/validar-roles");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getMenus);
router.get("/:id", [validarJWT, esAdminRole], getIdMenus);
router.post(
  "/",
  [validarJWT, esAdminRole, 
    check("nombre", "El nombre es obligatorio").not().isEmpty(), 
    check("ruta", "La ruta es obligatorio").not().isEmpty(), 
    check("orden", "El orden es obligatorio").not().isEmpty(), 
  //  check("rolId").custom(rolValido)
  validarCampos],
  createMenus,
);

router.put("/:id", [validarJWT, esAdminRole,
   check("nombre", "El nombre es obligatorio").not().isEmpty(), 
    check("ruta", "La ruta es obligatorio").not().isEmpty(), 
    check("orden", "El orden es obligatorio").not().isEmpty(), 
    //check("rolId").custom(rolValido)
    validarCampos
], updateMenus);

router.delete("/:id", [validarJWT, esAdminRole], deleteMenus);

module.exports = router;
