import React from 'react';
import styles from './Landing.module.scss';
import {Typography, Container, Button} from '@material-ui/core';
import gearsImg from './gears.png';
import DeckPreview from '../DeckPreview/DeckPreview';
import {mockDecks} from '../../model/Deck';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import BuildIcon from '@material-ui/icons/Build';
import Download from '@material-ui/icons/SaveAlt';

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
      <section className={styles.whatIsIt} id='about'>
        <img className={styles.gears} src={gearsImg} />
        <div className={styles.content}>
          <Container className={styles.container}>
            <Typography variant={'h2'}>How it works?</Typography>
            <Typography variant={'h4'} component={'p'}>
              Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.
              Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная)
            </Typography>
            <div className={styles.actionWrapper}>
              <Button variant="contained" color='primary' className={styles.action}>
                Some action
              </Button>
            </div>
          </Container>
        </div>
      </section>
      <section className={styles.readyDecks} id='decks'>
        <Container>
          <Typography variant={'h2'} component={'h3'}>Decks</Typography>
          <div className={styles.cardsWrapper}>
            {mockDecks.map(deck => <DeckPreview key={deck.id} {...deck} />)}

{/*
            <Carousel imgArray={[gearsImg, studyImg, 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce7d2c19-50bd-4b62-8a7a-edbce0d143fa/d9wxh6c-37c09d73-ad60-4031-a831-0e680dde7837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlN2QyYzE5LTUwYmQtNGI2Mi04YTdhLWVkYmNlMGQxNDNmYVwvZDl3eGg2Yy0zN2MwOWQ3My1hZDYwLTQwMzEtYTgzMS0wZTY4MGRkZTc4MzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gHEOIm4gJ3t_kxP7oelxtoMphZyjDGjzxWjzY2wqElQ']} />
*/}
          </div>
        </Container>
      </section>
      <section className={styles.account} id='buy'>
        <div className={styles.wrapper} >
        <Container>
          <Typography variant={'h2'} component={'h3'}>Make your own</Typography>
          <div className={styles.content}>
            <div className={styles.item}>
              <div className={styles.iconWrapper}>
                <MoneyIcon color='primary' className={styles.icon} />
              </div>
              <Typography variant={'h4'} component={'p'}>
                Buy account
              </Typography>
            </div>
            <div className={styles.item}>
              <div className={styles.iconWrapper}>
                <BuildIcon color='primary' className={styles.icon} />
              </div>
              <Typography variant={'h4'} component={'p'}>
                Create your own decks with 5, 6 or 8 images on the card
              </Typography>
            </div>
            <div className={styles.item}>
              <div className={styles.iconWrapper}>
                <Download color='primary' className={styles.icon} />
              </div>
              <Typography variant={'h4'} component={'p'}>
                Print deck or download as PDF
              </Typography>
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="contained" color='primary' className={styles.action}>
              Buy account
            </Button>
            <Button variant="contained" color='primary' className={styles.action}>
              Sign in
            </Button>
          </div>
        </Container>
        </div>
      </section>
    </div>
  );
};

export default Landing;
