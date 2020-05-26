import { TriviaStore, Question } from '../store/trivia-store'
const axios = require('axios');

jest.mock('axios');

describe("TriviaStore", () => {

  let store: TriviaStore;
  let stubQuestions: Question[] = [
    {
      category: "Fake Category 1",
      question: "Fake Question - True",
      correctAnswer: true,
    },
    {
      category: "Fake Category 2",
      question: "Fake Question - False",
      correctAnswer: false,
    }
  ];
  const stubAPIData: Object = {
    "response_code": 0,
    "results": [
      {
        "category": "Fake Category 1",
        "type": "boolean",
        "difficulty": "hard",
        "question": "Fake Question - False",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
      },
      {
        "category": "Fake Category 2",
        "type": "boolean",
        "difficulty": "hard",
        "question": "Fake Question - True",
        "correct_answer": "True",
        "incorrect_answers": [
          "False"
        ]
      }
    ]
  };

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
    expect(store.questions[0].userAnswer).toBe(false);
  });

  it("returns the number of questions answered correctly", () => {
    store.currentQuestionIndex = 0;
    store.answerQuestion(false);
    store.answerQuestion(false);
    expect(store.questionsCorrect).toBe(1);
  });

  it("stores fetched data from  the api", () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(stubAPIData));
    store.getQuestions();
    expect(store.questions).toEqual(stubQuestions);
  });

  it("resets the game", () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(stubAPIData));
    store.resetGame();
    expect(store.currentQuestionIndex).toBe(undefined);
    expect(store.questions).toEqual(stubQuestions);
  });

});
