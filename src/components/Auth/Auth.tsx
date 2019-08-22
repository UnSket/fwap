import React, { useEffect } from 'react';
import styles from './Auth.module.scss';
import { CircularProgress } from '@material-ui/core';
import { user } from '../../modules/user/selectors';
import { getCurrentUserRequest } from '../../modules/user/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../modules/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import { State as UserT } from '../../modules/user/types'

interface Props extends RouteComponentProps {
  children?: any
  user: UserT,
  getCurrentUserRequest: () => void
}

const Auth: React.FC<Props> = ({children, user, history, getCurrentUserRequest}) => {
  useEffect(() => {
    if (user.error) {
      history.push(ROUTE_PATHS.login);
    }
  }, [user]);

  useEffect(() => {
    if (!user.loading) {
      getCurrentUserRequest();
    }
  }, []);

  if (!user) {
    return (
      <div className={styles.container}>
        <CircularProgress size={80}/>
      </div>
    )
  }
  return children;
};

const mapStateToProps = (state: StoreState) => ({
  user: user(state)
});

const mapDispatchToProps = {
  getCurrentUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
