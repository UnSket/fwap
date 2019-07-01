import React from 'react';
import styles from './Landing.module.scss';
import {Typography, Container} from '@material-ui/core';
import gearsImg from './gears.png';

const Landing: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <section className={styles.intro}>
        <div className={styles.content}>
          <Container className={styles.container}>
            <Typography variant={'h1'}>FWAP</Typography>
            <Typography variant={'h3'}>THIS IS TOOL WHICH WILL HELP YOU TO LEARN LANGUAGES FUN</Typography>
          </Container>
        </div>
      </section>
      <section className={styles.whatIsIt}>
        <img className={styles.gears} src={gearsImg} />
        <div className={styles.content}>
          <Container className={styles.container}>
            <Typography variant={'h2'}>How it works?</Typography>
            <Typography variant={'h4'} component={'p'}>
              Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.
              Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная)
            </Typography>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Landing;
