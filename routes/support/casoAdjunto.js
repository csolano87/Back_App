const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const {
  getCasoAdjunto,
  getByIdCasoAdjunto,
  createCasoAdjunto,
  updateCasoAdjunto,
  deleteCasoAdjunto,
} = require("../../controllers/support/casoAdjunto");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validarJWT, tieneRole], getCasoAdjunto);
router.get("/:id", [validarJWT, tieneRole], getByIdCasoAdjunto);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("nombreOriginal", "El nombre orginal es obligatorio").not().isEmpty(),
    check("rutaArchivo", "La ruta del archivo es obligatorio").not().isEmpty(),
    check("mimeType", "El miem tipo es obligatorio").not().isEmpty(),
    check("tamanioBytes", "El tamano byte es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createCasoAdjunto,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("nombreOriginal", "El nombre orginal es obligatorio").not().isEmpty(),
    check("rutaArchivo", "La ruta del archivo es obligatorio").not().isEmpty(),
    check("mimeType", "El miem tipo es obligatorio").not().isEmpty(),
    check("tamanioBytes", "El tamano byte es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  updateCasoAdjunto,
);
router.delete("/:id", [validarJWT, tieneRole], deleteCasoAdjunto);

module.exports = router;
