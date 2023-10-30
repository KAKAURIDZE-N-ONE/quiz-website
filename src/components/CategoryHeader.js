function CategoryHeader({ children, score, length, status }) {
  return (
    <div
      className="category-header"
      style={status === 'finish' ? { marginBottom: '28rem' } : {}}
    >
      <h1>{children}</h1>
      {status === 'finish' && (
        <h2>
          Your result {score}/{length} ({Math.floor((score / length) * 100)}%)
        </h2>
      )}
    </div>
  );
}

export default CategoryHeader;
