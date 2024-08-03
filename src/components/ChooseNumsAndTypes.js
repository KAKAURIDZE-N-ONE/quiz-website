function ChooseNumsAndTypes({
  category,
  dispatch,
  difficultyofquestions,
  numberofquestions,
}) {
  const difficulty1 = ["easy", "medium", "hard"];
  const difficulty2 = ["medium", "hard"];
  const difficulty3 = ["easy", "medium"];
  const difficulty4 = ["easy", "hard"];

  let difficulty;
  // console.log(category);
  // if (category === "Geography") difficulty = difficulty2;
  // else if (category === "Film") difficulty = difficulty2;
  // else if (category === "Music") difficulty = difficulty4;
  // else
  difficulty = difficulty1;

  return (
    <div className="choose-nums-and-types">
      <div className="choose">
        <h1>Choose your difficulty</h1>
        <select
          onChange={(e) => {
            return dispatch({
              type: "choosedifficulty",
              payload: e.target.value,
            });
          }}
          value={difficultyofquestions}
        >
          {difficulty.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className="choose">
        <h1>Number of questions</h1>
        <select
          onChange={(e) =>
            dispatch({
              type: "choosenum",
              payload: parseInt(e.target.value, 10),
            })
          }
          value={numberofquestions}
        >
          {Array.from({ length: 20 }, (z, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ChooseNumsAndTypes;
