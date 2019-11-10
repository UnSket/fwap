import React, { useCallback, useContext, useState } from 'react';
import { Deck } from '../../../model/types/Deck';
import styles from './Settings.module.scss';
import {
  Button, Checkbox, FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import {decksError} from '../../../modules/userDecks/selectors';
import { connect } from 'react-redux';
import { StoreState } from '../../../modules/types';
import { updateDeckRequest } from '../../../modules/userDecks/actions';
import { getUrlFromImgKey } from '../../utils/utils';
import SettingIcon from '@material-ui/icons/Settings';
import { updateBacksideRequest } from '../../../modules/userDecks/files/actions';
import { OpenChangeFileModalContext } from '../EditDeck';


type Props = {
  deck: Deck,
  error?: string | null,
  updateDeckRequest: (deckId: string, name: string, description: string, isNumerated: boolean) => void
  updateBacksideRequest: (image: File | Blob, deckId: string, bgCleanUpFlags?: boolean) => void
}

const Settings: React.FC<Props> = ({deck, error, updateDeckRequest, updateBacksideRequest}) => {
  const [name, changeName] = useState<any>({value: deck.name});
  const [description, changeDescription] = useState<any>({value: deck.description});
  const [isNumerated, setIsNumerated] = useState<any>(deck.isNumerated);
  const openModal = useContext(OpenChangeFileModalContext);

  const updateBacksideHandler = useCallback((images: Array<File | Blob>, bgCleanUpFlags?: boolean) => {
    if (images.length > 0) {
      updateBacksideRequest(images[0], deck.id, bgCleanUpFlags);
    }
  }, []);

  const saveDeck = () => {
    if (!name.value) changeName({value: name.value, error: 'Field is required'});
    if (!description.value) changeDescription({value: description.value, error: 'Field is required'});

    if (name.value && description.value) {
      updateDeckRequest(deck.id, name.value, description.value, isNumerated);
    }
  };

  const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeName({value: e.target.value});
  };

  const descriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDescription({value: e.target.value});
  };

  const isNumeratedCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNumerated(event.target.checked);
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isNumerated}
              onChange={isNumeratedCheckboxHandler}
              color="primary"
            />
          }
          label="Numerate cards"
        />
        <div className={styles.backside}>
          <p>Backside image:</p>
          <div className={styles.backsideWrapper} onClick={() => openModal(updateBacksideHandler)}>
            <div className={styles.settings}>
              <SettingIcon className={styles.settingIcon} />
            </div>
            {deck.backsideKey ?
              <img src={getUrlFromImgKey(deck.backsideKey)} alt='backside image' />
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
