function Timeout({ time }) {
  return (
    <h1 className={time <= 30 ? 'timeout-red timeout' : 'timeout'}>{`${
      time / 60 < 10 ? '0' : ''
    }${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}</h1>
  );
}

export default Timeout;
