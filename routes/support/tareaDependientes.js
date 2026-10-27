const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { tieneRole } = require("../../middleware/validar-roles");

const { validarCampos } = require("../../middleware/validar-campos");
const { check } = require("express-validator");
const {
  getTareaDependencia,
  getByIdTareaDependencia,
  createTareaDependencia,
  updateTareaDependencia,
  deleteTareaDependencia,
} = require("../../controllers/support/tareaDependientes");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTareaDependencia);
router.get("/:id", [validarJWT, tieneRole], getByIdTareaDependencia);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("dependeDeTareaId", "La dependencia es obligatorio").not().isEmpty(),   

    validarCampos,
  ],
  createTareaDependencia,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
   check("tareaId", "La tarea  es obligatorio").not().isEmpty(),
    check("dependeDeTareaId", "La dependencia es obligatorio").not().isEmpty(),   

    validarCampos,
  ],
  updateTareaDependencia,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTareaDependencia);

module.exports = router;
