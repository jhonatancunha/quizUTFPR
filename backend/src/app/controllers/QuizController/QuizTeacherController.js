// SERVICES
import QuizTeacherService from '../../services/Quiz/QuizTeacher';

class QuizTeacherController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const idTeacher = req.userId;

      const quizzes = await QuizTeacherService.execute(idTeacher);

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizTeacherController();
