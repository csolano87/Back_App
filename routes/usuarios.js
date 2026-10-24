const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosUpdate,
  usuariosPost,
  usuariosDelete,
  usuariosGetID,
  usuariosGetfiltro,
} = require("../controllers/usuarios");
const { rolValido } = require("../helpers/db-validators");
const { validarCampos } = require("../middleware/validar-campos");
//const Usuario = require('../models/usuarios');

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, tieneRole], usuariosGet);
router.get("/:id", [validarJWT, esAdminRole], usuariosGetID);
router.get(
  "/busquedausuario/:busquedausuario",
  [validarJWT, esAdminRole],
  usuariosGetfiltro,
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
     check('apellidos','El apellido es obligatorio').not().isEmpty(),
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio/ min 8 letras").isLength({
      min: 8,
    }),
    check("rolId").custom(rolValido),
  ],
  usuariosUpdate,
);

router.post(
  "/",
  [
    check('apellidos','El apellido es obligatorio').not().isEmpty(),
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio/ min 8 letras").isLength({
      min: 8,
    }),
    check("rolId").custom(rolValido),
    validarCampos,
  ],
  usuariosPost,
);

router.delete("/:id", [validarJWT, esAdminRole], usuariosDelete);

//router.patch('/', usuariosPatch );

module.exports = router;
