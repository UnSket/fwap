import React from 'react';
import { Deck } from '../../../model/types/Deck';
import styles from './Export.module.scss';
import { Typography } from '@material-ui/core';


type Props = {
  deck: Deck,
  loading: boolean
}

const Export: React.FC<Props> = ({deck}) => {

  return (
    <div>
      <Typography variant='h4' gutterBottom>Cards</Typography>
    </div>
  );
};

export default Export;
