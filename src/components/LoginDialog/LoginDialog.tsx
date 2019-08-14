import React, { useState } from 'react';
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
import { loginRequest } from '../../modules/user/actions';
import { connect } from 'react-redux';

type Props = {
  isOpen: boolean,
  close: () => void,
  loginRequest: (username: string, password: string) => void
}

const LoginDialog: React.FC<Props> = ({isOpen, close, loginRequest}) => {
  const [username, setUsername] = useState<string>('');
  const usernameInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const [password, setPassword] = useState<string>('');
  const passwordInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const login = () => {
    loginRequest(username, password);
  };

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
            value={username}
            onChange={usernameInputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            variant='outlined'
            value={password}
            onChange={passwordInputChanged}
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
          <Button color="primary" onClick={login}>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
  );
}

const mapDispatchToProps = {
  loginRequest
};

export default connect(null, mapDispatchToProps)(LoginDialog);
