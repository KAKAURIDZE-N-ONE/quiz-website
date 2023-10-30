import Category from './Category';

function Categories({ fetchs, dispatch }) {
  return (
    <div className="categories">
      {fetchs.map(el => (
        <Category num={el.num} dispatch={dispatch} key={el.category}>
          {el.category}
        </Category>
      ))}
    </div>
  );
}

export default Categories;
