const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getTareaSoporte,
  getByIdTareaSoporte,
  createTareaSoporte,
  updateTareaSoporte,
  deleteTareaSoporte,
} = require("../../controllers/support/tareaSoporte");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTareaSoporte);
router.get("/:id", [validarJWT, tieneRole], getByIdTareaSoporte);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso  es obligatorio").not().isEmpty(),
    check("areaSoporteId", "El area de soporte es obligatorio").not().isEmpty(),
    check("tecnicoId", "El tecnico es obligatorio").not().isEmpty(),
    check("tipoSoporteId", "El tipo de soporte es obligatorio").not().isEmpty(),
    check("modalidadId", "La modalidad  es obligatorio").not().isEmpty(),
    check("estadoTareaId", "La modalidad es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "El descripcion es obligatorio").not().isEmpty(),
    check("fechaInicioReal", "La fecha es obligatoria es obligatorio").not().isEmpty(),
    check("tipocasoId", "El tipo de caso es obligatoria es obligatorio").not().isEmpty(),
    check("responsableActualId", "El responsable es obligatoria es obligatorio").not().isEmpty(),
    check("estadoCasoId", "El estado  es obligatoria es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  createTareaSoporte,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("casoId", "El caso  es obligatorio").not().isEmpty(),
    check("areaSoporteId", "El area de soporte es obligatorio").not().isEmpty(),
    check("tecnicoId", "El tecnico es obligatorio").not().isEmpty(),
    check("tipoSoporteId", "El tipo de soporte es obligatorio").not().isEmpty(),
    check("modalidadId", "La modalidad  es obligatorio").not().isEmpty(),
    check("estadoTareaId", "La modalidad es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "El descripcion es obligatorio").not().isEmpty(),
    check("fechaInicioReal", "La fecha es obligatoria es obligatorio").not().isEmpty(),
    check("tipocasoId", "El tipo de caso es obligatoria es obligatorio").not().isEmpty(),
    check("responsableActualId", "El responsable es obligatoria es obligatorio").not().isEmpty(),
    check("estadoCasoId", "El estado  es obligatoria es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateTareaSoporte,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTareaSoporte);

module.exports = router;
