import React, { useCallback, useContext, useState } from 'react';
import { Deck } from '../../../model/types/Deck';
import styles from './Settings.module.scss';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import {decksError} from '../../../modules/decks/selectors';
import { connect } from 'react-redux';
import { StoreState } from '../../../modules/types';
import { updateDeckRequest } from '../../../modules/decks/actions';
import { getUrlFromImgKey } from '../../utils/utils';
import SettingIcon from '@material-ui/icons/Settings';
import { updateBacksideRequest } from '../../../modules/decks/files/actions';
import { OpenChangeFileModalContext } from '../EditDeck';
import { ImageWithPreview } from '../../../model/types/ImageWithPreview';


type Props = {
  deck: Deck,
  error?: string | null,
  updateDeckRequest: (deckId: string, name: string, description: string) => void
  updateBacksideRequest: (image: File, deckId: string) => void
}

const Settings: React.FC<Props> = ({deck, error, updateDeckRequest, updateBacksideRequest}) => {
  const [name, changeName] = useState<any>({value: deck.name});
  const [description, changeDescription] = useState<any>({value: deck.description});
  const openModal = useContext(OpenChangeFileModalContext);

  const updateBacksideHandler = useCallback((images: Array<ImageWithPreview>) => {
    if (images.length > 0) {
      updateBacksideRequest(images[0].file, deck.id);
    }
  }, []);

  const saveDeck = () => {
    if (!name.value) changeName({value: name.value, error: 'Field is required'});
    if (!description.value) changeDescription({value: description.value, error: 'Field is required'});

    if (name.value && description.value) {
      updateDeckRequest(deck.id, name.value, description.value);
    }
  };

  const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeName({value: e.target.value});
  };

  const descriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDescription({value: e.target.value});
  };

  return (
      <form noValidate autoComplete="off" className={styles.wrapper}>
        <Typography variant={'h4'} gutterBottom className={styles.header}>Deck settings</Typography>
        <TextField
          label={name.error || "Name"}
          margin="normal"
          value={name.value}
          onChange={nameInputChange}
          error={!!name.error}
        />
        <TextField
          label={description.error || "Description"}
          margin="dense"
          multiline
          rowsMax="4"
          value={description.value}
          error={!!description.error}
          onChange={descriptionInputChange}
        />
        <div className={styles.backside}>
          <p>Backside image:</p>
          <div className={styles.backsideWrapper} onClick={() => openModal(updateBacksideHandler)}>
            <div className={styles.settings}>
              <SettingIcon className={styles.settingIcon} />
            </div>
            {deck.backside ?
              <img src={getUrlFromImgKey(deck.backside.url)} alt='backside image' />
            :
              <p className={styles.warning}>Deck have not backside</p>}
          </div>
        </div>

        <Button variant="contained" color='primary' className={styles.submit} onClick={saveDeck}>
          Save
        </Button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
  )
};

const mapStateToProps = (state: StoreState) => ({
  error: decksError(state)
});

const mapDispatchToProps = {
  updateDeckRequest,
  updateBacksideRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
