import React from 'react';
import './App.css';
import {PageContainer, PageContainerProps} from './page-container';
import {triviaStore, Question} from './store/trivia-store';
import {observer} from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

interface AppProps {
  store?: any
}

@observer
class App extends React.Component<AppProps> {

  componentDidMount() {
    this.props.store.getQuestions();
  }

  getResults = () => {
    return (
      this.props.store.questions.map((q: Question) => {
        return (
          <div>
            <FontAwesomeIcon icon={q.correctAnswer === q.userAnser ? faCheckCircle : faTimes} />
            <p>{q.question}</p>
          </div>
        )
      })
    )
  }

  getContent = () => {
    let contentProps: PageContainerProps;
    if (this.props.store.currentQuestionIndex === undefined) {
      contentProps = {
        header: "Welcome to the Trivia Challenge!",
        body: "You will be presented with 10 true or false questions - Can you score 100%?",
        primaryButton: {id: "begin", label: "Begin", action: this.props.store.goToNextPage},
      }
    } else if (this.props.store.currentQuestionIndex >= this.props.store.questions.length) {
      contentProps = {
        header: `You scored ${this.props.store.questionsCorrect} / ${this.props.store.questions.length}`,
        body: this.getResults(),
        primaryButton: {id: "restart", label: "Play Again?", action: this.props.store.resetGame}
      }
    } else {
      contentProps = {
        header: this.props.store.currentQuestion.category,
        body: this.props.store.currentQuestion.question,
        primaryButton: {id: "true", label: "True", action: () => this.props.store.answerQuestion(true)},
        secondaryButton: {id: "false", label: "False", action: () => this.props.store.answerQuestion(false)}
      }
    }

    return (
      <PageContainer
        {...contentProps}
        store= {triviaStore}
      />
    )
  }

  render() {
    return (
      <div>
        {this.getContent()}
      </div>
    )
  }
}

export default App;
