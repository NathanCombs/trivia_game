import { observable, computed } from 'mobx';
import axios from 'axios'
import decode from 'html-entities-decode';

export interface Question {
  category: string,
  question: string,
  correctAnswer: boolean,
  userAnswer?: boolean
}

export enum apiState {"idle", "pending", "done", "error"}

export class TriviaStore {

  @observable questions: Question[] = [];
  @observable currentQuestionIndex: number | undefined = undefined;
  @observable fetchState: apiState = apiState.idle;

  @computed get currentQuestion() {
    if(this.questions !== undefined && this.currentQuestionIndex !== undefined)
    return (
      this.questions[this.currentQuestionIndex]
    )
    else {
      return {} as Question
    }
  }

  @computed get questionsCorrect() {
    return (
      this.questions.filter((q: Question) => q.correctAnswer === q.userAnswer).length
    )
  }

  getQuestions = () => {
    this.fetchState = apiState.pending
    try {
      axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
        .then(response => {
          const apiData: Object[] = response.data?.results || []
          const formattedData = apiData.map((data: any) => {
            return {
              category: data.category,
              question: decode(data.question),
              correctAnswer: data.correct_answer === "True" ? true : false
            }
          });
          if (formattedData) {
            this.questions = formattedData;
            this.fetchState = apiState.done;
          }
          else {
            this.fetchState = apiState.error;
          }
        });

      }
      catch {
        this.fetchState = apiState.error;
      }
  }

  goToNextPage = () => {
    if (this.currentQuestionIndex === undefined) {
      this.currentQuestionIndex = 0;
    }
    else {
      this.currentQuestionIndex += 1;
    }
  }

  answerQuestion = (answer: boolean) => {
    if (this.currentQuestionIndex !== undefined && this.currentQuestionIndex >= 0) {
      let updatedQuestions: Question[] = this.questions
      updatedQuestions[this.currentQuestionIndex] = {
        ...updatedQuestions[this.currentQuestionIndex], userAnswer: answer
      }
      this.questions = updatedQuestions;

      this.goToNextPage();
    }
    else return;
  }

  resetGame =  () => {
    this.currentQuestionIndex = undefined;
    this.getQuestions();
  }

}



export const triviaStore = new TriviaStore();
