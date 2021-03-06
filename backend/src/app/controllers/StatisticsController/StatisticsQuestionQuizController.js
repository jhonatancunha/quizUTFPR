// MODELS
import Quiz from '../../models/QuizModel';
import Answer from '../../models/AnswerModel';
import Student from '../../models/StudentModel';

import StudentQuiz from '../../models/StudentQuiz';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quiz_id } = req.body;

      const quiz = await Quiz.findByPk(quiz_id, {
        attributes: ['id', 'title', 'pin'],
      });

      if (!quiz)
        return res.status(404).json({
          error: 'Quiz não encontrado!',
        });

      const questions = await quiz.getQuestions({
        joinTableAttributes: [],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'is_correct'],
          },
        ],
        attributes: [
          'id',
          'title',
          'index',
          'timer',
          'score',
          'difficulty_level',
          'type',
        ],
        order: [
          ['index', 'ASC'],
          [
            {
              model: Answer,
              as: 'answer',
            },
            'id',
            'ASC',
          ],
        ],
      });

      if (!questions)
        return res.status(404).json({
          error: 'Quiz não possui questões cadastradas!',
        });

      //  GETTING ALL THE STUDENT THAT ANSWERED THE QUIZ
      const studentQuizAttempt = await quiz.getQuiz_student({
        where: {
          is_finished: true,
        },
        attributes: ['student_id', 'quiz_id'],
        group: ['student_id'],
      });

      // GETTING THE ATTEMPT FROM EACH STUDENT CONSIDERING THE HIGHEST SCORE
      // AND RETURN AN ARRAY OF ID ABOUT THE BEST ATTEMPT
      const ArrayOfIDAboutBestScoreAttemptQuiz = await Promise.all(
        studentQuizAttempt.map(async (choice) => {
          const student = await choice.getStudent({
            include: [
              {
                model: StudentQuiz,
                as: 'student_quiz',
                where: {
                  quiz_id,
                  is_finished: true,
                },
                attributes: ['id', 'score'],
              },
            ],
            order: [
              [
                {
                  model: StudentQuiz,
                  as: 'student_quiz',
                },
                'score',
                'DESC',
              ],
            ],
          });

          return student.student_quiz[0].id;
        })
      );

      let percentageOfQuizHit = 0; // % OF CORRECT ANSWERS CHOICES OF THE STUDENT

      // INCLUDING IN THE QUESTION ALL THE CHOICES OF THE STUDENT
      // WE ONLY CONSIDER THE CHOICE ABOUT THE BEST SCORE
      const returnedQuestions = await Promise.all(
        questions.map(async (question) => {
          const question_choice = await question.getQuestion_choice({
            where: {
              student_quiz_id: ArrayOfIDAboutBestScoreAttemptQuiz,
            },
            attributes: [
              'student_quiz_id',
              'student_id',
              'time_left',
              'checked1',
              'checked2',
              'checked3',
              'checked4',
            ],
            include: [
              {
                model: Student,
                as: 'student',
                attributes: ['name', 'email'],
              },
            ],
          });

          let sumOfTimeSpentToAnswer = 0; // AVG OF TIME THAT WAS SPENT TO ANSWER THE QUESTION
          // eslint-disable-next-line array-callback-return
          question_choice.map((questionChoice) => {
            sumOfTimeSpentToAnswer += question.timer - questionChoice.time_left;
          });
          const avgOfTimeSpentToAnswer =
            sumOfTimeSpentToAnswer / question_choice.length;

          // CALCULATING HOW MANY TIMES EACH ANSWER HAD BEEN CHOOSED
          const { answer } = question;
          if (answer[0]) answer[0].dataValues.numberOfChoices = 0;
          if (answer[1]) answer[1].dataValues.numberOfChoices = 0;
          if (answer[2]) answer[2].dataValues.numberOfChoices = 0;
          if (answer[3]) answer[3].dataValues.numberOfChoices = 0;

          let hitAmount = 0; // SUM OF HIT (CORRECT ANSWER)
          // eslint-disable-next-line array-callback-return
          question_choice.map((choice) => {
            const { checked1, checked2, checked3, checked4 } = choice;
            let hasWrongChoice = false;
            let hitAmountChoice = 0;

            if (checked1) {
              answer[0].dataValues.numberOfChoices += 1;
              if (
                checked1 &&
                answer[0].dataValues.is_correct &&
                !hasWrongChoice
              )
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked2) {
              answer[1].dataValues.numberOfChoices += 1;
              if (
                checked2 &&
                answer[1].dataValues.is_correct &&
                !hasWrongChoice
              )
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked3) {
              answer[2].dataValues.numberOfChoices += 1;
              if (
                checked3 &&
                answer[2].dataValues.is_correct &&
                !hasWrongChoice
              )
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked4) {
              answer[3].dataValues.numberOfChoices += 1;
              if (
                checked4 &&
                answer[3].dataValues.is_correct &&
                !hasWrongChoice
              )
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }

            if (!hasWrongChoice) hitAmount += hitAmountChoice;
          });

          const percentageOfHit = (hitAmount * 100) / question_choice.length;
          percentageOfQuizHit += percentageOfHit;
          return {
            avgOfTimeSpentToAnswer: avgOfTimeSpentToAnswer.toFixed(2),
            percentageOfHit: percentageOfHit.toFixed(2),
            ...question.dataValues,
            answer,
            question_choice,
          };
        })
      );

      percentageOfQuizHit /= questions.length;

      return res.status(200).json({
        quiz,
        percentageOfQuizHit,
        questions: returnedQuestions,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();
