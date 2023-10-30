function Category({ children, dispatch, num }) {
  return (
    <button
      className="category"
      onClick={() =>
        dispatch({ type: 'getcategory', payload: num, heading: children })
      }
    >
      {children}
    </button>
  );
}

export default Category;
