function MainBox({ children, questionNum }) {
  return (
    <div className="quiz" style={questionNum === 0 ? { height: '80%' } : {}}>
      {children}
    </div>
  );
}

export default MainBox;
