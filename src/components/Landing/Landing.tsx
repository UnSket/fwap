import React from 'react';
import styles from './Landing.module.scss';
import {Typography} from '@material-ui/core';

const Landing: React.FC = () => {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant={'h1'}>FWAP</Typography>
          <Typography variant={'h3'}>IT'S COOL TOOL THAT YOU MUST HAVE</Typography>
        </div>
      </div>
  );
};

export default Landing;
