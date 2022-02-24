// SERVICES
import GetQuizzesFromTagsService from '../../services/Quiz/GetQuizzesFromTags';

class QuizTagController {
  async index(req, res) {
    try {
      const { aimedTags } = req.body;

      const quizzes = await GetQuizzesFromTagsService.execute({ aimedTags });

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizTagController();
