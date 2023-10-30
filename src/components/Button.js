function Button({ children, className, dispatch, action }) {
  return (
    <>
      <div
        className={`btn ${className}`}
        onClick={() => dispatch({ type: action })}
      >
        <h2>{children}</h2>
      </div>
    </>
  );
}

export default Button;
