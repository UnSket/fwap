import React, { useState } from 'react';
import styles from './EditLegendText.module.scss';
import { Image } from '../../../../../model/types/Image';
import { getUrlFromImgKey } from '../../../../utils/utils';
import { Button, TextField } from '@material-ui/core';
import { setLegendImageTextRequest } from '../../../../../modules/legends/actions';
import { connect } from 'react-redux';

type Props = {
  image: Image,
  legendId: string,
  setLegendImageTextRequest: (legendId: string, imageId: number, text: string) => void,
  onSave?: () => void
};

const EditLegendText: React.FC<Props> = ({legendId, image: {id, url, text}, setLegendImageTextRequest, onSave}) => {
  const [legend, changeLegend] = useState<any>({value: text || ''});

  const legendInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLegend({value: e.target.value});
  };

  const saveLegend = () => {
    if (legend.value) {
      setLegendImageTextRequest(legendId, id, legend.value);
      changeLegend({value: text || ''});
      onSave && onSave();
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
  setLegendImageTextRequest
};

export default connect(null, mapDispatchToProps)(EditLegendText);
