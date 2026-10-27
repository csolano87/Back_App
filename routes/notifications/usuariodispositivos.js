const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getUsuarioDispositivo,
  getIdUsuarioDispositivo,
  createUsuarioDispositivo,
  updateUsuarioDispositivo,
  deleteUsuarioDispositivo,
} = require("../../controllers/notifications/usuariodispositivos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getUsuarioDispositivo);
router.get("/:id", [validarJWT, tieneRole], getIdUsuarioDispositivo);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("tokenPush", "El token push es obligatorio").not().isEmpty(),
    check("proveedorPush", "La proveedor push es obligatorio").not().isEmpty(),
    check("plataforma", "La plataforma es obligatorio").not().isEmpty(),
    check("identificadorInstalacion", "El odentificador es obligatorio").not().isEmpty(),

    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createUsuarioDispositivo,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
     check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("tokenPush", "El token push es obligatorio").not().isEmpty(),
    check("proveedorPush", "La proveedor push es obligatorio").not().isEmpty(),
    check("plataforma", "La plataforma es obligatorio").not().isEmpty(),
    check("identificadorInstalacion", "El odentificador es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  updateUsuarioDispositivo,
);
router.delete("/:id", [validarJWT, tieneRole], deleteUsuarioDispositivo);

module.exports = router;
