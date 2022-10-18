import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__copyright}>
      <p>Copyright © 2020 BloggingCoder.com</p>
      <p className={styles['footer__text-and-author']}>
        All rights reserved. Made with ❤ in London, UK, by{' '}
        <a
          className={styles.footer__author}
          target='_blank'
          href='https://alexticovschi.netlify.app/'
        >
          Alex Ticovschi
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
