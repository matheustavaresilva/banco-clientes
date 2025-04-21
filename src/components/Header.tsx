import styles from './HeaderFooter.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Banco Banestes</h1>
      <nav className={styles.navLinks}>
        <Link to="/">Clientes</Link>
      </nav>
    </header>
  );
}
