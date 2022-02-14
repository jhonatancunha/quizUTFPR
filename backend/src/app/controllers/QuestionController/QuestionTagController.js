// SERVICES
import QuestionsByTagsService from '../../services/Question/QuestionsByTags';

class QuestionTagController {
  // Lista todas as questões de acordo com as tags informadas
  async index(req, res) {
    try {
      const { aimedTagQuestions } = req.params;
      const questions = await QuestionsByTagsService.index({
        aimedTagQuestions,
      });

      return res.status(200).json(questions);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionTagController();
