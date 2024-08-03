function QuestinBox({ children, status }) {
  const question = children
    ?.replaceAll("&quot;", '"')
    ?.replaceAll("&#039;", "'")
    ?.replaceAll("&amp;", "&")
    ?.replaceAll("&rdquo;", `"`);
  return (
    <div
      className="question-box"
      style={status === "ready" ? { marginBottom: "13.5rem" } : {}}
    >
      <h2>{question}</h2>
    </div>
  );
}

export default QuestinBox;
