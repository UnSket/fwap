import React from 'react';
import styles from './Landing.module.scss';
import {Typography, Container, Button} from '@material-ui/core';
import gearsImg from './gears.png';
import studyImg from './study.png';
import Carousel from '../DeckPreview/Carousel/Carousel';

const Landing: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <section className={styles.intro}>
        <div className={styles.content}>
          <Container className={styles.container}>
            <Typography variant={'h1'}>FWAP</Typography>
            <Typography variant={'h3'}>Fun Words And Progress - make study easy</Typography>
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
            <div className={styles.actionWrapper}>
              <Button variant="contained" className={styles.action}>
                Some action
              </Button>
            </div>
          </Container>
        </div>
      </section>
      <section className={styles.readyDecks}>
        <Container>
          <Typography variant={'h2'} component={'h3'}>Decks</Typography>
          <div style={{width: 300, height: 300}}>
            <Carousel imgArray={[gearsImg, studyImg, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce7d2c19-50bd-4b62-8a7a-edbce0d143fa/d9wxh6c-37c09d73-ad60-4031-a831-0e680dde7837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlN2QyYzE5LTUwYmQtNGI2Mi04YTdhLWVkYmNlMGQxNDNmYVwvZDl3eGg2Yy0zN2MwOWQ3My1hZDYwLTQwMzEtYTgzMS0wZTY4MGRkZTc4MzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gHEOIm4gJ3t_kxP7oelxtoMphZyjDGjzxWjzY2wqElQ']} />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Landing;
