import React from 'react';
import { User } from '../../model/types/User';
import { Container, Paper, Typography } from '@material-ui/core';
import styles from './UserManagement.module.scss';

type Props = {
  users: Array<User>
};

const UserManagement: React.FC<Props> = ({users}) => {

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant='h3' gutterBottom>User management</Typography>
        <div className={styles.users}>

        </div>
      </Paper>
    </Container>
  )
};

export default UserManagement;
