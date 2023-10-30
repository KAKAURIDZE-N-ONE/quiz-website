import React from 'react';
import { useState } from 'react';
import { useEffect, useReducer } from 'react';
import './styles.css';
import Loading from './components/Loading';
import MainBox from './components/MainBox';
import Score from './components/Score';
import QuestinBox from './components/QuestinBox';
import Button from './components/Button';
import Header from './components/Header';
import Categories from './components/Categories';
import CategoryHeader from './components/CategoryHeader';
import ButtonBack from './components/ButtonBack';
import Answers from './components/Answers';
import Timeout from './components/Timeout';
import ProgressBar from './components/ProgressBar';
import ChooseNumsAndTypes from './components/ChooseNumsAndTypes';

const difficulty = ['easy', 'medium', 'hard'];

const SECS_PER_QUESTION = 15;

const fetchs = [
  {
    category: 'Book',
    num: 10,
  },
  {
    category: 'Film',
    num: 11,
  },
  {
    category: 'Music',
    num: 12,
  },
  {
    category: 'Geography',
    num: 22,
  },
  {
    category: 'History',
    num: 23,
  },
  {
    category: 'Politics',
    num: 24,
  },
];

const initialState = {
  status: 'choosing',
  questions: [],
  url: '',
  heading: '',
  score: 0,
  questionNum: 0,
  activeAnswer: null,
  answered: -1,
  attempt: 0,
  time: 0,
  startTimeout: false,
  difficultyofquestions: 'easy',
  numberofquestions: 10,
  categoryofquestions: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'getcategory':
      return {
        ...state,
        heading: action.heading,
        categoryofquestions: action.payload,
        status: 'ready',
      };
    case 'choosedifficulty':
      return {
        ...state,
        difficultyofquestions: action.payload,
      };
    case 'choosenum':
      return {
        ...state,
        numberofquestions: action.payload,
      };
    case 'fetching':
      return {
        ...state,
        status: 'started',
        questions: action.payload,
      };
    case 'loading':
      return {
        ...state,
        status: 'loading',
      };
    // case 'wehavedata':
    //   return { ...state, status: 'ready', questions: action.payload };
    case 'start':
      return {
        ...state,
        url: `https://opentdb.com/api.php?amount=${state.numberofquestions}&category=${state.categoryofquestions}&difficulty=${state.difficultyofquestions}&type=multiple`,
        startTimeout: !state.startTimeout,
      };

    case 'activation':
      return {
        ...state,
        activeAnswer: action.payload,
        score:
          action.payload - 1 === randNums[state.questionNum] &&
          !state.activeAnswer
            ? state.score + 1
            : state.score,
        answered:
          state.answered > state.questionNum
            ? state.answered
            : state.questionNum,
      };

    case 'nextquestion':
      return {
        ...state,
        questionNum: state.questionNum + 1,
        activeAnswer: null,
      };

    case 'finishing':
      return {
        ...state,
        status: 'finish',
      };
    case 'previousquestion':
      return {
        ...state,
        questionNum: state.questionNum - 1,
        activeAnswer: true,
      };
    case 'retry':
      return {
        ...initialState,
        attempt: state.attempt + 1,
      };
    case 'settimeout':
      if (state.time !== 0)
        return {
          ...state,
          time: state.time - 1,
        };
      else
        return {
          ...state,
          status: 'finish',
        };
    case 'settime':
      return {
        ...state,
        time: action.payload,
      };
    case 'returnchoosingpage':
      if (action.unda === true) {
        const confirmed = window.confirm('Do you want to exit the quiz?');
        if (confirmed) return { ...initialState };
        else return { ...state };
      } else return { ...initialState };
    default:
  }
}
let randNums = [];

export default function App() {
  const [
    {
      answered,
      activeAnswer,
      questionNum,
      heading,
      score,
      url,
      status,
      questions,
      attempt,
      time,
      startTimeout,
      difficultyofquestions,
      numberofquestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  /////////////////////////for screen width/////////////////////////////////////////
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(
    function () {
      randNums = [];
      for (let i = 0; i < numberofquestions; i++) {
        const randNum = Math.floor(Math.random() * 4);
        randNums.push(randNum);
      }
      dispatch({
        type: 'settime',
        payload: numberofquestions * SECS_PER_QUESTION,
      });
    },
    [attempt, numberofquestions]
  );

  useEffect(() => {
    async function getQuestions() {
      if (url !== '')
        try {
          dispatch({ type: 'loading' }); // Dispatch loading action before the fetch
          const res = await fetch(url);
          const data = await res.json();
          // Check if the component is still mounted before updating state
          dispatch({ type: 'fetching', payload: data });
        } catch (err) {
          // Handle errors by dispatching an error action or displaying an error message
          console.error(err);
        }
    }

    getQuestions();

    // Cleanup function: set isMounted to false when the component is unmounted
  }, [url, dispatch]);

  useEffect(
    function () {
      if (status !== 'started') return;
      const decline = setInterval(
        () =>
          dispatch({
            type: 'settimeout',
            payload: randNums.length * SECS_PER_QUESTION,
          }),
        1000
      );
      return () => {
        clearInterval(decline);
      };
    },

    [startTimeout, status]
  );
  return (
    <div className="app">
      {status === 'choosing' && (
        <MainBox>
          <Header />
          <QuestinBox status="choosing">Choose a category</QuestinBox>
          <Categories fetchs={fetchs} dispatch={dispatch} />
        </MainBox>
      )}
      {status === 'loading' && <Loading />}
      {status === 'ready' && (
        <MainBox>
          <Header>
            <ButtonBack dispatch={dispatch} />
          </Header>
          <ChooseNumsAndTypes
            numberOfQuestions={questionNum.length}
            difficulty={difficulty}
            dispatch={dispatch}
            difficultyofquestions={difficultyofquestions}
            numberofquestions={numberofquestions}
          />
          <CategoryHeader>{heading}</CategoryHeader>
          <QuestinBox status={status}>Do you want to start quiz?</QuestinBox>
          <Button className="btn-play" action={'start'} dispatch={dispatch}>
            Play
          </Button>
        </MainBox>
      )}
      {status === 'started' && (
        <MainBox questionNum={questionNum}>
          <ProgressBar index={questionNum} numQuestions={randNums.length} />
          <Header Style="progresbari">
            <ButtonBack dispatch={dispatch} exit={true} />
            <Score length={randNums.length}>{score}</Score>
            <Timeout time={time}></Timeout>
          </Header>
          <QuestinBox status="started">
            {questions.results[questionNum].question}
          </QuestinBox>
          <Answers
            windowWidth={windowWidth}
            correctAnswer={questions.results[questionNum].correct_answer}
            incorrectAnswers={questions.results[questionNum].incorrect_answers}
            activeAnswer={activeAnswer}
            dispatch={dispatch}
            randNum={randNums[questionNum]}
            answered={answered}
            questionNum={questionNum}
          />
          {questionNum && (
            <Button
              className={'btn-previous'}
              action={'previousquestion'}
              dispatch={dispatch}
            >
              PREVIOUS
            </Button>
          )}
          {(questionNum <= randNums.length - 2 && activeAnswer) ||
          answered >= questionNum ? (
            <Button
              className={'btn-next'}
              action={'nextquestion'}
              dispatch={dispatch}
              answered={answered}
              questionNum={questionNum}
            >
              NEXT
            </Button>
          ) : null}
          {questionNum === randNums.length - 1 && activeAnswer && (
            <Button
              className={'btn-next'}
              dispatch={dispatch}
              action={'finishing'}
            >
              FINISH
            </Button>
          )}
        </MainBox>
      )}
      {status === 'finish' && (
        <MainBox>
          <Header></Header>
          <CategoryHeader
            score={score}
            length={randNums.length}
            status={status}
          >
            Quiz Completed
          </CategoryHeader>
          <Button
            className={'btn-restart'}
            dispatch={dispatch}
            action={'retry'}
          >
            RESTART
          </Button>
        </MainBox>
      )}
    </div>
  );
}
