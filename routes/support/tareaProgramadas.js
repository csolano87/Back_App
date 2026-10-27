const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getTareaProgramada,
  getByIdTareaProgramada,
  createTareaProgramada,
  updateTareaProgramada,
  deleteTareaProgramada,
} = require("../../controllers/support/tareaProgramada");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTareaProgramada);
router.get("/:id", [validarJWT, tieneRole], getByIdTareaProgramada);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("fechaInicio", "La fecha de soporte es obligatorio").not().isEmpty(),
    check("usuarioProgramadorId", "El usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createTareaProgramada,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("fechaInicio", "La fecha de soporte es obligatorio").not().isEmpty(),
    check("usuarioProgramadorId", "El usuario es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateTareaProgramada,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTareaProgramada);

module.exports = router;
