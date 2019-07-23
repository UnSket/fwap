import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonGroup, DialogContentText } from '@material-ui/core';
import DropFile from '../FileManagment/FileDrop/FileDrop';
import styles from './ChangeFileDialog.module.scss';

type Props = {
  isOpen: boolean,
  close: () => void
}

const ChangeFileDialog: React.FC<Props> = ({isOpen, close}) => {
  return (
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle className={styles.title}>Change file</DialogTitle>
      <DialogContent>
        <DropFile/>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button color='secondary'>Delete</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeFileDialog;