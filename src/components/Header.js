function Header({ children, Style }) {
  return (
    <header style={Style === 'progresbari' ? { paddingTop: '1rem' } : {}}>
      <h1>Quiz</h1>
      {children}
    </header>
  );
}

export default Header;
