const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const {
  getCasoSeguimiento,
  getByIdCasoSeguimiento,
  createCasoSeguimiento,
  updateCasoSeguimiento,
  deleteCasoSeguimiento,
} = require("../../controllers/support/casoSeguimiento");
const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validarJWT, tieneRole], getCasoSeguimiento);
router.get("/:id", [validarJWT, tieneRole], getByIdCasoSeguimiento);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
    //check("nombre", "El nombre es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  createCasoSeguimiento,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
    //check("nombre", "El nombre es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  updateCasoSeguimiento,
);
router.delete("/:id", [validarJWT, tieneRole], deleteCasoSeguimiento);

module.exports = router;
