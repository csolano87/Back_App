const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getTareaIntervencion,
  getByIdTareaIntervencion,
  createTareaIntervencion,
  updateTareaIntervencion,
  deleteTareaIntervencion,
} = require("../../controllers/support/tareaIntervencion");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTareaIntervencion);
router.get("/:id", [validarJWT, tieneRole], getByIdTareaIntervencion);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("tecnicoId", "El tecnico de soporte es obligatorio").not().isEmpty(),
    check("modalidadId", "la modalidad es obligatorio").not().isEmpty(),
    check("canalId", "El canal  es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion de soporte es obligatorio").not().isEmpty(),
    check("fechaInicio", "El fecha inicio es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createTareaIntervencion,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("tecnicoId", "El tecnico de soporte es obligatorio").not().isEmpty(),
    check("modalidadId", "la modalidad es obligatorio").not().isEmpty(),
    check("canalId", "El canal  es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion de soporte es obligatorio").not().isEmpty(),
    check("fechaInicio", "El fecha inicio es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateTareaIntervencion,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTareaIntervencion);

module.exports = router;
