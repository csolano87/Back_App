const { Router } = require("express");

const { consultaroles, createroles, usuariosUpdate, usuariosDelete ,usuariosGetID} = require("../controllers/roles");
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, esAdminRole], consultaroles);
router.get("/:id", [validarJWT, esAdminRole], usuariosGetID);
router.post("/", [validarJWT, esAdminRole], createroles);

router.put("/:id", [validarJWT, esAdminRole], usuariosUpdate);

router.delete("/:id", [validarJWT, esAdminRole], usuariosDelete);

module.exports = router;
