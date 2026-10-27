const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getPlantillaNotificacion,
  getIdPlantillaNotificacion,
  createPlantillaNotificacion,
  updatePlantillaNotificacion,
  deletePlantillaNotificacion,
} = require("../../controllers/notifications/plantillaNotificaciones");

const router = Router();

router.get("/", [validarJWT, tieneRole], getPlantillaNotificacion);
router.get("/:id", [validarJWT, tieneRole], getIdPlantillaNotificacion);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("canal", "El canal es obligatorio").not().isEmpty(),
    check("nombre", "La nombre es obligatorio").not().isEmpty(),
    check("contenido", "El contenido es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  createPlantillaNotificacion,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("codigo", "El codigo es obligatorio").not().isEmpty(),
    check("canal", "El canal es obligatorio").not().isEmpty(),
    check("nombre", "La nombre es obligatorio").not().isEmpty(),
    check("contenido", "El contenido es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updatePlantillaNotificacion,
);
router.delete("/:id", [validarJWT, tieneRole], deletePlantillaNotificacion);

module.exports = router;
