function ButtonBack({ dispatch, exit }) {
  return (
    <div
      className="button-back"
      onClick={() => dispatch({ type: 'returnchoosingpage', unda: exit })}
      style={exit ? { top: '6.2rem' } : {}}
    >
      {exit ? (
        <ion-icon
          name="exit-outline"
          size="large"
          className="arrow-back"
        ></ion-icon>
      ) : (
        <ion-icon
          ClassName="arrow-back"
          size="large"
          name="arrow-back-outline"
        ></ion-icon>
      )}
    </div>
  );
}

export default ButtonBack;
