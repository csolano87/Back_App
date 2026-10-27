const { Router } = require("express");

const {
  createEstadoContrato,
  getEstadoContrato,
  getIdEstadoContrato,
  updateEstadoContrato,
  deleteEstadoContrato,
} = require("../../controllers/inventory/equipos_contratos");
const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { rolValido } = require("../../helpers/db-validators");
const { validarCampos } = require("../../middleware/validar-campos");

const router = Router();

router.get("/", [validarJWT, tieneRole], getEstadoContrato);
router.get("/:id", [validarJWT, tieneRole], getIdEstadoContrato);
router.post(
  "/",
  [validarJWT, tieneRole, 
check("numeroContrato", "El # contrato es obligatorio").not().isEmpty(), 
    check("fechaInicio", "La fecha inicio es obligatorio").not().isEmpty(), 
    check("fechaFin", "La fecha fin es obligatorio").not().isEmpty(), 
    check("fechaTransferencia", "La fecha transferencia es obligatorio").not().isEmpty(), 
    validarCampos,
    //check("rolId").custom(rolValido)],
  createEstadoContrato,]
);

router.put(
  "/:id",
  [validarJWT, tieneRole, 
    check("numeroContrato", "El # contrato es obligatorio").not().isEmpty(), 
    check("fechaInicio", "La fecha inicio es obligatorio").not().isEmpty(), 
    check("fechaFin", "La fecha fin es obligatorio").not().isEmpty(), 
    check("fechaTransferencia", "La fecha transferencia es obligatorio").not().isEmpty(), 
    
   // check("rolId").custom(rolValido)
  validarCampos],
  updateEstadoContrato,
);

router.delete("/:id", [validarJWT, tieneRole], deleteEstadoContrato);

module.exports = router;
