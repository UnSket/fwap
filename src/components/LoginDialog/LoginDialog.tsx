import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './LoginDialog.module.scss';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from '@material-ui/core';

type Props = {
  isOpen: boolean,
  close: () => void
}

const LoginDialog: React.FC<Props> = ({isOpen, close}) => {
  return (
      <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle className={styles.title}>Log in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            variant='outlined'
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            variant='outlined'
            fullWidth
          />
          <DialogContentText className={styles.text}>
            Don't have account? You could <Link>buy it</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={close} color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default LoginDialog;