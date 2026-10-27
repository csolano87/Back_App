const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getNotificacion,
  getIdNotificacion,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion,
} = require("../../controllers/notifications/notificaciones");

const router = Router();

router.get("/", [validarJWT, tieneRole], getNotificacion);
router.get("/:id", [validarJWT, tieneRole], getIdNotificacion);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("tareaId", "La tarea es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("mensaje", "El mensaje es obligatorio").not().isEmpty(),

    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createNotificacion,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("usuarioId", "El usuario es obligatorio").not().isEmpty(),
    check("casoId", "El caso es obligatorio").not().isEmpty(),
    check("tareaId", "La tarea es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("mensaje", "El mensaje es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  updateNotificacion,
);
router.delete("/:id", [validarJWT, tieneRole], deleteNotificacion);

module.exports = router;
