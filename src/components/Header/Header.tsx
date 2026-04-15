import Container from '../Container/Container';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h1 className={styles.title}>Todo List</h1>
      </Container>
    </header>
  );
};

export default Header;
