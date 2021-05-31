// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizController from "../app/controllers/QuizController";
import QuizTeacherController from '../app/controllers/QuizTeacherController'

router.get("/", QuizTeacherController.index);
router.post("/create", QuizController.store);
router.put("/update", QuizController.update);
router.delete("/delete", QuizController.delete);
router.get("/:tag", QuizController.show);

export default router;
