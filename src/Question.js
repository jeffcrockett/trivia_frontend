import React from 'react'
import { Button } from 'semantic-ui-react'
class Question extends React.Component {
    state = {
        answerClicked: false
    }
    constructor(props) {
        super(props)
    }

    showAnswers = (answer) => {
        this.setState({
            answerClicked: true
        })
        this.props.updateScore(answer)
    }

    render() {
        return (
            <div>{this.props.question.content}
                {this.props.question.answers.map(answer => 
                        <Button 
                        style={this.state.answerClicked && answer.correct ? {background: 'green', color:'white'} : this.state.answerClicked && !answer.correct ? {background: 'red', color:'white'} : {}}
                        onClick={() => {
                            console.log(answer.correct);
                            this.showAnswers(answer)
                        }} 
                        disabled={!!this.props.gameOver}>{answer.content}
                        </Button>)}
                        {this.state.answerClicked && !this.props.gameOver && <Button onClick={() => {
                            this.props.getNextQuestion();
                            this.setState({
                                answerClicked: false
                            })
                            }}>Next</Button>}
                            {this.props.gameOver && <Button onClick={() => {
                                this.setState({
                                    answerClicked: false
                                })
                                this.props.resetGame()}}>Restart</Button>}
            </div>

        )
    }
}

export default Question;