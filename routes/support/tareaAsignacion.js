const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getTareaAsignada,
  getByIdTareaAsignada,
  createTareaAsignada,
  updateTareaAsignada,
  deleteTareaAsignada,
} = require("../../controllers/support/tareaAsignacion");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTareaAsignada);
router.get("/:id", [validarJWT, tieneRole], getByIdTareaAsignada);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("tecnicoOrigenId", "El tecnico origen de soporte es obligatorio").not().isEmpty(),
     check("tecnicoDestinoId", "El tecnico de soporte es obligatorio").not().isEmpty(),
    check("usuarioAsignadorId", "El usuario es obligatorio").not().isEmpty(),
    check("motivo", "El motivo es obligatorio").not().isEmpty(),
     check("fechaAsignacion", "La fecha asignacion es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createTareaAsignada,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("tecnicoOrigenId", "El tecnico origen de soporte es obligatorio").not().isEmpty(),
     check("tecnicoDestinoId", "El tecnico de soporte es obligatorio").not().isEmpty(),
    check("usuarioAsignadorId", "El usuario es obligatorio").not().isEmpty(),
    check("motivo", "El motivo es obligatorio").not().isEmpty(),
     check("fechaAsignacion", "La fecha asignacion es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateTareaAsignada,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTareaAsignada);

module.exports = router;
