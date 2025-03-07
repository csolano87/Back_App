const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");
const {
  getAll,
  GetById,
  post,
  update,
  deleteById,
} = require("../controllers/categoriaTecnico");

const router = Router();

router.get("/", [validarJWT, esAdminRole], getAll);
router.get("/:id", [validarJWT, esAdminRole], GetById);
router.post("/", [validarJWT, esAdminRole], post);
router.put("/:id", [validarJWT, esAdminRole], update);
router.delete("/:id", [validarJWT, esAdminRole], deleteById);

module.exports = router;

