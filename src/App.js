import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import randomize from './randomize'
import Question from './Question'

class App extends Component {
  state = {
    questions: null,
    questionNumber: 0,
    correct: 0,
    incorrect: 0,
    gameOver: false
  }
  
  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/questions')
    .then(res => res.json())
    .then(questions => {
      this.setState({
        questions
      });
      this.setState({
        selectedQuestion: this.state.questions[this.state.questionNumber]
      })
    })
  }

  endGame = () => {
    console.log('Game over!')
    this.setState({
      gameOver: true
    })
  }

  updateScore = (answer) => {
    if (answer.correct) {
      this.setState({
        correct: this.state.correct + 1
      })
    }
    else {
      this.setState({
        incorrect: this.state.incorrect + 1
      })
      console.log(this.state.incorrect)
      if (this.state.incorrect === 2) {
        this.endGame()
      }
    }
  }

  getNextQuestion = () => {
    this.setState({
      questionNumber: this.state.questionNumber + 1,
    })
    this.setState({
      selectedQuestion: this.state.questions[this.state.questionNumber + 1]      
    })
  }

  resetGame = () => {
    fetch('http://localhost:3000/api/v1/questions')
    .then(res => res.json())
    .then(questions => {
      this.setState({
        questions,
        questionNumber: 0,
        correct: 0,
        incorrect: 0,
        gameOver: false
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <div>{this.state.correct} | {this.state.incorrect}</div>
          { this.state.selectedQuestion &&
          <Question question={this.state.selectedQuestion}
          getNextQuestion={this.getNextQuestion}
          gameOver={this.state.gameOver}
          updateScore={this.updateScore}
          resetGame={this.resetGame}/>
          }
          </div>
          
      </div>
    );
  }
}

export default App;
