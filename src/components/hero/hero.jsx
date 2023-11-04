// import { Heading } from '@chakra-ui/react';
import css from './hero.module.css';

const Hero = () => {
  return (
    // <Heading className={css.heroText}>Hi, welcome to PHONEBOOK APP</Heading>

    <div className={css.hero}>
      <h1 className={css.heroTitle}>Welcome to phonebook app</h1>
      <p className={css.heroDescription}>Find and manage your contacts</p>
    </div>
  );
};
export default Hero;
