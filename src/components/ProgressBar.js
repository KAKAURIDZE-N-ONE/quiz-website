function ProgressBar({ numQuestions, index }) {
  return (
    <progress className="progressbar" max={numQuestions} value={index + 1} />
  );
}

export default ProgressBar;
