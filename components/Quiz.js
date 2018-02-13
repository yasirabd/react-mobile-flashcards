import * as _ from 'lodash'
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PercentageCircle from 'react-native-percentage-circle'
import { connect } from 'react-redux'
import { primary, secondary, lightSecondary, white, green, red } from '../utils/colors'
import type { Question } from '../utils/definition'
import { getScoreFeedback } from '../utils/quiz'

type Props = {
  questions: Question[],
  navigation: any,
}

class Quiz extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Quiz',
  })
  state = {
    qIndex: 0,
    correctCount: 0,
    showQuestion: true,
    showResult: false,
  }
  getNewQuestionIndex = qIndex => {
    const { questions } = this.props
    return Math.min(qIndex + 1, questions.length)
  }
  shouldDisplayResult = qIndex => {
    const { questions } = this.props
    return qIndex === questions.length
  }
  correct = () => {
    this.setState(state => {
      const { qIndex } = state
      const nextQuestionIndex = this.getNewQuestionIndex(qIndex)
      return {
        qIndex: nextQuestionIndex,
        correctCount: state.correctCount + 1,
        showResult: this.shouldDisplayResult(nextQuestionIndex),
      }
    })
  }
  incorrect = () => {
    this.setState(state => {
      const { qIndex } = state
      const nextQuestionIndex = this.getNewQuestionIndex(qIndex)

      return {
        qIndex: nextQuestionIndex,
        showResult: this.shouldDisplayResult(nextQuestionIndex),
      }
    })
  }
  flipCard = () => {
    this.setState(({ showQuestion }) => ({
      showQuestion: !showQuestion,
    }))
  }
  restartQuiz = () => {
    this.setState({
      qIndex: 0,
      correctCount: 0,
      showQuestion: true,
      showResult: false,
    })
  }
  render() {
    const { questions } = this.props
    const totalQuestion = questions.length
    const { qIndex, showQuestion, showResult, correctCount } = this.state
    const questionNo = qIndex + 1

    if (showResult) {
      const scorePercentage = _.round(correctCount / totalQuestion * 100, 2)
      const scoreFeedback = getScoreFeedback(scorePercentage)
      return (
        <View style={styles.container}>
          <View style={styles.scoreResult}>
            <Text style={styles.question}>Quiz Score</Text>
          </View>
          <View style={styles.scorePercentage}>
            <Text style={styles.scoreCorrect}>
              {`${correctCount} out of ${totalQuestion} questions are correct`}
            </Text>
            <PercentageCircle
              radius={100}
              percent={scorePercentage}
              color={primary}
              borderWidth={5}
              textStyle={{ fontSize: 24, color: primary }}
            />
            <Text style={styles.scoreFeedback}>{scoreFeedback}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={this.restartQuiz}
              style={[styles.button, { backgroundColor: secondary }]}
            >
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[{ marginTop: 10, backgroundColor: primary }, styles.button]}
            >
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.questionNo}>
            {`${questionNo} / ${totalQuestion}`}
          </Text>
        </View>
        {showQuestion ? (
          <View>
            <Text style={styles.question}>
              {questions[qIndex].question}
            </Text>
            <TouchableOpacity
              onPress={this.flipCard}
            >
              <Text style={{ color: lightSecondary, textAlign: 'center' }}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.question}>
              {questions[qIndex].answer}
            </Text>
            <TouchableOpacity
              onPress={this.flipCard}
            >
              <Text style={{ color: lightSecondary, textAlign: 'center' }}>Show Question</Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity
            onPress={this.correct}
            style={[styles.button, { backgroundColor: green }]}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.incorrect}
            style={[{ marginTop: 10, backgroundColor: red }, styles.button]}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    paddingBottom: 25,
  },
  scoreResult: {
    alignItems: 'center',
  },
  scorePercentage: {
    alignItems: 'center',
  },
  scoreFeedback: {
    marginTop: 15,
    textAlign: 'center',
  },
  scoreCorrect: {
    marginBottom: 15,
  },
  questionNo: {
    fontSize: 15,
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: white,
  },
  button: {
    borderRadius: 2,
    padding: 10,
  }
})


const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params
  const { questions } = decks[deckId]
  return {
    questions,
  }
}

export default connect(mapStateToProps)(Quiz)
