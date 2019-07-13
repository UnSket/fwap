import React from 'react';
import { Container, Link } from '@material-ui/core';
import styles from './Footer.module.scss';
import { CollisionLink } from '../utils/utils';
import logo from './logo.svg';

const Footer: React.FC = () => (
  <footer className={styles.wrapper}>
    <Container className={styles.content}>
      <div className={styles.links}>
        <Link component={CollisionLink} to={'/#about'} className={styles.link}>About</Link>
        <Link component={CollisionLink} to={'/#decks'} className={styles.link}>Decks</Link>
        <Link component={CollisionLink} to={'/#buy'} className={styles.link}>Buy</Link>
      </div>
        <Link component={CollisionLink} to={'/#intro'} className={styles.logo}>
          <img src={logo}/>
        </Link>
    </Container>
  </footer>
);

export default Footer;