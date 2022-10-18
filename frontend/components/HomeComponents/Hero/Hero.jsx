import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles['hero hero-container']}>
      <h2 className={styles.hero__title}>Get smarter about what you read.</h2>
    </section>
  );
};

export default Hero;
