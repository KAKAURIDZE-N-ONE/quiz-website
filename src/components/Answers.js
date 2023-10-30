function Answers({
  correctAnswer,
  incorrectAnswers,
  activeAnswer,
  dispatch,
  randNum,
  answered,
  questionNum,
  windowWidth,
}) {
  const allAnswerbugs = [...incorrectAnswers];
  allAnswerbugs.splice(randNum, 0, correctAnswer);

  const allAnswer = allAnswerbugs.map(el =>
    el
      .replaceAll('&quot;', '"')
      .replaceAll('&#039;', "'")
      .replaceAll('&amp;', '&')
      .replaceAll('&rdquo;', `"`)
      .replaceAll('&eacute;', 'é')
  );

  let stili = {};
  if (questionNum === 0) stili.marginBottom = '8.8rem';
  if (windowWidth < 980) stili.marginBottom = '24rem';
  return (
    <div className="answers-box" style={stili}>
      <div
        className={
          activeAnswer || activeAnswer === 0 || answered >= questionNum
            ? 0 === randNum
              ? 'correct'
              : 'incorrect'
            : 'answer'
        }
        onClick={() => dispatch({ type: 'activation', payload: 1 })}
      >
        <div className="answ-num">1</div>
        {allAnswer[0]}
      </div>
      <div
        className={
          activeAnswer || activeAnswer === 0 || answered >= questionNum
            ? 1 === randNum
              ? 'correct '
              : 'incorrect'
            : 'answer'
        }
        onClick={() => dispatch({ type: 'activation', payload: 2 })}
      >
        <div className="answ-num">2</div>
        {allAnswer[1]}
      </div>
      <div
        className={
          activeAnswer || activeAnswer === 0 || answered >= questionNum
            ? 2 === randNum
              ? 'correct '
              : 'incorrect'
            : 'answer'
        }
        onClick={() => dispatch({ type: 'activation', payload: 3 })}
      >
        <div className="answ-num">3</div>
        {allAnswer[2]}
      </div>
      <div
        className={
          activeAnswer || activeAnswer === 0 || answered >= questionNum
            ? 3 === randNum
              ? 'correct '
              : 'incorrect'
            : 'answer'
        }
        onClick={() => dispatch({ type: 'activation', payload: 4 })}
      >
        <div className="answ-num">4</div>
        {allAnswer[3]}
      </div>
    </div>
  );
}

export default Answers;
