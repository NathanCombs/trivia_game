import { observable, computed } from 'mobx';
import axios from 'axios'

export interface Question {
  category: string,
  question: string,
  correctAnswer: boolean,
  userAnser?: boolean
}

enum apiState {"idle", "pending", "done", "error"}

class TriviaStore {

  @observable questions: Question[] = [];
  @observable currentQuestionIndex: number | undefined = undefined;
  @observable fetchState: apiState = apiState.idle;

  @computed get currentQuestion() {
    if(this.questions !== undefined && this.currentQuestionIndex !== undefined)
    return (
      this.questions[this.currentQuestionIndex]
    )
  }

  @computed get questionsCorrect() {
    return (
      this.questions.filter((q: Question) => q.correctAnswer === q.userAnser).length
    )
  }

  getQuestions = () => {
    this.fetchState = apiState.pending
    try {
      axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
        .then(response => {
          //TODO: validate api data
          const apiData: Object[] = response.data.results
          const formattedData = apiData.map((data: any) => {
            return {
              category: data.category,
              question: data.question,
              correctAnswer: Boolean(data.correct_answer)
            }
          })
          this.questions = formattedData;
        })
        this.fetchState = apiState.done;
      }
      catch {
        this.fetchState = apiState.error;
      }
  }

  goToNextPage = () => {
    //TODO: implement api error, option to restart (using restart method from end of game)
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
        ...updatedQuestions[this.currentQuestionIndex], userAnser: answer
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
