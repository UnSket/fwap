import React from 'react';
import { Container, Link } from '@material-ui/core';
import styles from './Footer.module.scss';
import { CollisionLink } from '../utils/utils';
import logo from './logo.svg';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

const Footer: React.FC = () => (
  <footer className={styles.wrapper}>
    <Container className={styles.content}>
      <div className={styles.links}>
        {/*<Link component={CollisionLink} className={styles.link}>About</Link>*/}
        <Link component={CollisionLink} to={ROUTE_PATHS.myDecks} className={styles.link}>My Decks</Link>
        <Link component={CollisionLink} to={ROUTE_PATHS.allDecks} className={styles.link}>All decks</Link>
      </div>
        <Link component={CollisionLink} to={ROUTE_PATHS.myDecks} className={styles.logo}>
          <img src={logo} alt='FWAP logo' />
        </Link>
    </Container>
  </footer>
);

export default Footer;
