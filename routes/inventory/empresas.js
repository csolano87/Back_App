const { Router } = require("express");

const {  createEmpresa,
  getEmpresa,
  getIdEmpresa,
  updateEmpresa,
  deleteEmpresa, } = require("../../controllers/inventory/empresas");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");
const router = Router();

router.get("/", [validarJWT, tieneRole], getEmpresa);
router.get("/:id", [validarJWT, tieneRole], getIdEmpresa);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
     check("razonSocial", "La razonSocial es obligatorio").not().isEmpty(),
    check("ruc", "El ruc es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es obligatorio").not().isEmpty(),
    check("ruc", "El ruc es obligatorio").not().isEmpty(),
     check("correo", "El correo es obligatorio").not().isEmpty(),
    validarCampos
   // check("rolId").custom(rolValido),
  ],
  createEmpresa,
);

router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("razonSocial", "La razonSocial es obligatorio").not().isEmpty(),
    check("ruc", "El ruc es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es obligatorio").not().isEmpty(),
    check("ruc", "El ruc es obligatorio").not().isEmpty(),
     check("correo", "El correo es obligatorio").not().isEmpty(),
   // check("rolId").custom(rolValido),
   validarCampos
  ],
  updateEmpresa,
);

router.delete("/:id", [validarJWT, tieneRole], deleteEmpresa);

module.exports = router;
