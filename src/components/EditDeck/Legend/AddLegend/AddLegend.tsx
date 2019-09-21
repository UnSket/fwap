import React, { useState } from 'react';
import styles from './AddLegend.module.scss';
import { Image } from '../../../../model/types/Image';
import { getUrlFromImgKey } from '../../../utils/utils';
import { Button, TextField } from '@material-ui/core';
import { saveLegendRequest } from '../../../../modules/userDecks/actions';
import { connect } from 'react-redux';

type Props = {
  image: Image,
  deckId: string,
  saveLegendRequest: (image: Image, deckId: string) => void
};

const AddLegend: React.FC<Props> = ({deckId, image: {id, url}, saveLegendRequest}) => {
  const [legend, changeLegend] = useState<any>({value: ''});

  const legendInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLegend({value: e.target.value});
  };

  const saveLegend = () => {
    if (legend.value) {
      saveLegendRequest({id, url, text: legend.value}, deckId);
    } else {
      changeLegend({...legend, error: 'Field is required'})
    }
  };
  return (
    <div className={styles.container}>
      <img src={getUrlFromImgKey(url)} alt='' className={styles.image} />
      <TextField
        label={legend.error || "Legend"}
        margin="normal"
        value={legend.value}
        onChange={legendInputChange}
        error={!!legend.error}
      />
      <Button variant="contained" color='primary' className={styles.submit} onClick={saveLegend}>
        Save
      </Button>
    </div>
  );
};

const mapDispatchToProps = {
  saveLegendRequest
};

export default connect(null, mapDispatchToProps)(AddLegend);
