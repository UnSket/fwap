import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { Link, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { CollisionLink } from '../utils/utils';
import Button from '@material-ui/core/Button';
import logo from './logo.png';
import { loginRequest } from '../../modules/user/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../modules/types';
import { userState } from '../../modules/user/selectors';
import { State as UserStateT } from '../../modules/user/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

interface Props extends RouteComponentProps {
  loginRequest: (username: string, password: string) => void,
  userState: UserStateT
};

const Login: React.FC<Props> = ({loginRequest, history, userState}) => {
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


  useEffect(() => {
    if (userState.user) {
      history.push(ROUTE_PATHS.myDecks)
    }
  }, [userState.user]);

  const enterPressed = (e: React.KeyboardEvent) =>{
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt='FWAP' />
          <Typography variant='h3' component='h1'>FWAP</Typography>
        </div>
      <Paper className={styles.paperContainer}>
        <Typography variant='h4' gutterBottom className={styles.title}>Sign in</Typography>
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
          onKeyDown={enterPressed}
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
          onKeyDown={enterPressed}
        />
        {/*<div className={styles.text}>
          Don't have account? Visit{' '}
          <Link component={CollisionLink} to='/#buy'>
            owr site
          </Link>
        </div>*/}
        <div className={styles.submit}>
          <Button color="primary" variant='contained' onClick={login}>
            Sign in
          </Button>
        </div>
        {userState.error && <span className={styles.error}>{userState.error}</span>}
      </Paper>
      </div>
    </div>
  )
};

const mapStateToProps = (state: StoreState) => ({
  userState: userState(state)
});

const mapDispatchToProps = {
  loginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
