const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, esAdminRole]);
router.get("/:id", [validarJWT, esAdminRole]);
router.post("/", [validarJWT, esAdminRole]);
router.put("/:id", [validarJWT, esAdminRole]);
router.delete("/:id", [validarJWT, esAdminRole]);

module.exports = router;
