import styles from './HeaderFooter.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Banco Banestes. Todos os direitos reservados.</p>
    </footer>
  );
}
