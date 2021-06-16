// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StudentQuestionChoiceController from "../../app/controllers/StudentQuiz/StudentQuestionChoiceController";
import StudentQuizFinishedAttemptController from "../../app/controllers/StudentQuiz/StudentQuizFinishedAttemptController";

router.post("/createChoice", StudentQuestionChoiceController.store);
router.post("/saveAttemptResult", StudentQuizFinishedAttemptController.store);

export default router;