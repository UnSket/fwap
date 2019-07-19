import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import EditableImage from './EditableImage/EditableImage';
import logo from '../Header/logo.svg';

const EditDeck: React.FC = () => {
  return (
    <Container className={styles.wrapper}>
      <Paper className={styles.paper}>
        <Typography variant={'h3'}>Edit deck</Typography>
        <EditableImage angle={45} image={logo} scale={1.2} positionX={0} positionY={0} />
      </Paper>
    </Container>
  )
};

export default EditDeck;