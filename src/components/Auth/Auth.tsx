import React, { useEffect } from 'react';
import styles from './Auth.module.scss';
import { CircularProgress } from '@material-ui/core';
import { user } from '../../modules/user/selectors';
import { connect } from 'react-redux';
import { StoreState } from '../../modules/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

interface Props extends RouteComponentProps {
  children?: any
  user: any
}

const Auth: React.FC<Props> = ({children, user, history}) => {
  useEffect(() => {
    if (!user.user) history.push(ROUTE_PATHS.login);
  }, [user]);
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

export default connect(mapStateToProps)(withRouter(Auth));
