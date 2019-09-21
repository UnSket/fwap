import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import styles from './CreateDeck.module.scss';
import { createDeckRequest } from '../../modules/userDecks/actions';
import { connect } from 'react-redux';
import { decksError, createdDeck } from '../../modules/userDecks/selectors';
import { StoreState } from '../../modules/types';
import { RouteComponentProps } from 'react-router';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

interface State extends RouteComponentProps {
  createDeckRequest: (deck: any) => void,
  error: string | null | undefined,
  createdDeck: any
}

const CreateDeck: React.FC<State> = ({createDeckRequest, error, createdDeck, history}) => {
  const [name, changeName] = useState<any>({value: ''});
  const [description, changeDescription] = useState<any>({value: ''});
  const [imagesOnCard, changeImagePerCard] = useState(5);

  useEffect(() => {
    if (createdDeck) {
      history.push(ROUTE_PATHS.editDeck.withID(createdDeck.id));
    }
  }, [createdDeck]);

  const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeName({value: e.target.value});
  };

  const descriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDescription({value: e.target.value});
  };

  const imagePerCardSelectChange = (e: React.ChangeEvent<{name?: string, value: any}>) => {
    changeImagePerCard(+e.target.value);
  };

  const createDeck = () => {
    if (!name.value) changeName({value: name.value, error: 'Field is required'});
    if (!description.value) changeDescription({value: description.value, error: 'Field is required'});

    if (name.value && description.value) {
      createDeckRequest({name: name.value, description: description.value, imagesOnCard});
    }
  };

  return (
    <Container className={styles.wrapper}>
      <Paper className={styles.paper}>
        <form noValidate autoComplete="off" className={styles.form}>
          <Typography variant={'h4'} gutterBottom className={styles.header}>Create new Deck</Typography>
          <TextField
            label={name.error || "Name"}
            className={styles.textField}
            margin="normal"
            value={name.name}
            onChange={nameInputChange}
            error={!!name.error}
          />
          <TextField
            label={description.error || "Description"}
            className={styles.textField}
            margin="dense"
            multiline
            rowsMax="4"
            value={description.name}
            error={!!description.error}
            onChange={descriptionInputChange}
          />
          <FormControl className={styles.select}>
            <InputLabel htmlFor="age-helper">Image count per card</InputLabel>
            <Select
              value={imagesOnCard}
              onChange={imagePerCardSelectChange}
            >
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color='primary' className={styles.submit} onClick={createDeck}>
            Create
          </Button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </Paper>
    </Container>
  )
};

const mapStateToProps = (state: StoreState) => ({
  error: decksError(state),
  createdDeck: createdDeck(state)
});

const mapDispatchToProps = {
  createDeckRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
