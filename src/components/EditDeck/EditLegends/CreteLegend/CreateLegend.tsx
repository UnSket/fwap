import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createLegendRequest } from '../../../../modules/legends/actions';
import { connect } from 'react-redux';
import styles from './CreateLegend.module.scss';
import { State as LegendState } from '../../../../modules/legends/types'

type Props = {
  isOpen: boolean,
  close: () => void,
  deckId: string,
  loading: boolean,
  selectLastLegend: () => void
  createLegendRequest: (deckId: string, name: string) => void
};

const CreateLegend: React.FC<Props> = ({isOpen, close, createLegendRequest, deckId, loading, selectLastLegend}) => {
  const [name, setName] = useState<any>({value: ''});
  const nameInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName({value: e.target.value});
  };

  useEffect(() => {
    if (!loading && isOpen) {
      close();
      selectLastLegend();
      setName({value: ''});
    }
  }, [loading]);

  const save = () => {
    if (!name) {
      setName({error: 'Field is required'});
      return;
    }

    createLegendRequest(deckId, name.value);
  };

  const enterPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      save();
    }
  };

  return  (
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>Create legend</DialogTitle>
      <DialogContent className={styles.wrapper}>
        <TextField
          autoFocus
          margin="dense"
          label={name.error || "Legend name"}
          error={!!name.error}
          type="text"
          variant='outlined'
          value={name.value}
          onChange={nameInputChanged}
          onKeyDown={enterPressed}
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={save}>Create</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  createLegendRequest
};

export default connect(null, mapDispatchToProps)(CreateLegend);
