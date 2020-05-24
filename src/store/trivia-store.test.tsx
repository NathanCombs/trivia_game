import { TriviaStore, Question } from './trivia-store'

describe("TriviaStore", () => {

  let store: TriviaStore;
  let stubQuestions: Question[] = [
    {
      category: "Test Category 1",
      question: "Test Answer - True",
      correctAnswer: true,
    },
    {
      category: "Test Category 2",
      question: "Test Answer - False",
      correctAnswer: false,
    }
  ];

  beforeEach(() => {
    store = new TriviaStore();
    store.questions = stubQuestions;
  });

  it("fetches current question", () => {
    store.currentQuestionIndex = 0;
    expect(store.currentQuestion).toEqual(stubQuestions[0]);
  });

  it("answers the current question", () => {
    store.questions = stubQuestions;
    store.currentQuestionIndex = 0;
    store.answerQuestion(false);
    expect(store.questions[0].userAnser).toBe(false);
  });

  it("returns the number of questions answered correctly", () => {
    store.currentQuestionIndex = 0;
    store.answerQuestion(false);
    store.answerQuestion(false);
    expect(store.questionsCorrect).toBe(1);
  })

});
