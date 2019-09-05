import React, { useEffect } from 'react';
import styles from './Auth.module.scss';
import { CircularProgress } from '@material-ui/core';
import { userState } from '../../modules/user/selectors';
import { getCurrentUserRequest } from '../../modules/user/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../modules/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import { State as UserT } from '../../modules/user/types'

interface Props extends RouteComponentProps {
  children?: any
  userState: UserT,
  getCurrentUserRequest: () => void
}

const Auth: React.FC<Props> = ({children, userState, history, getCurrentUserRequest}) => {
  useEffect(() => {
    if (userState.error) {
      history.push(ROUTE_PATHS.login);
    }
  }, [userState]);

  useEffect(() => {
    if (!userState.loading) {
      getCurrentUserRequest();
    }
  }, []);

  if (!userState) {
    return (
      <div className={styles.container}>
        <CircularProgress size={80}/>
      </div>
    )
  }
  return children;
};

const mapStateToProps = (state: StoreState) => ({
  userState: userState(state)
});

const mapDispatchToProps = {
  getCurrentUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
