import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import styles from './CreateUser.module.scss';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

type Props = {
  isOpen: boolean,
  close: () => void
};

const CreateUser: React.FC<Props> = ({isOpen, close}) => {
  return (
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>

      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={() => {}}>Save</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUser;
