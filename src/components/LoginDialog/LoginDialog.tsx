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
import { CollisionLink} from '../utils/utils';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

type Props = {
  isOpen: boolean,
  close: () => void
}

const LoginDialog: React.FC<Props> = ({isOpen, close}) => {
  return (
      <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle className={styles.title}>Sign in</DialogTitle>
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
            id="password"
            label="Password"
            type="password"
            variant='outlined'
            fullWidth
          />
          <DialogContentText className={styles.text}>
            Don't have account? Visit{' '}
            <Link onClick={close} component={CollisionLink} to='/#buy'>
              make your own
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={close} color="primary" href={ROUTE_PATHS.myDecks}>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default LoginDialog;