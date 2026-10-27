const { Router } = require("express");

const { validarJWT } = require("../../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../../middleware/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../../middleware/validar-campos");
const { getTipoCaso, getByIdTipoCaso, createTipoCaso, updateTipoCaso, deleteTipoCaso } = require("../../controllers/support/tipoCaso");

const router = Router();

router.get("/", [validarJWT, tieneRole], getTipoCaso);
router.get("/:id", [validarJWT, tieneRole], getByIdTipoCaso);
router.post(
  "/",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  createTipoCaso,
);
router.put(
  "/:id",
  [
    validarJWT,
    tieneRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    //  check("rolId").custom(rolValido)
    validarCampos,
  ],
  updateTipoCaso,
);
router.delete("/:id", [validarJWT, tieneRole], deleteTipoCaso);

module.exports = router;
