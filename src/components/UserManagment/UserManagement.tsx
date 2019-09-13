import React, { useCallback, useEffect, useState } from 'react';
import { User, usersMock } from '../../model/types/User';
import { Container, Paper, TextField, Typography } from '@material-ui/core';
import styles from './UserManagement.module.scss';
import SettingIcon from '@material-ui/icons/Settings';
import UserDetails from './UserDetails/UserDetails';
import {users, isLoading} from '../../modules/users/selectors';
import {getUsersRequest} from '../../modules/users/actions';
import { StoreState } from '../../modules/types';
import { connect } from 'react-redux';

type Props = {
  users: Array<User>,
  loading: boolean,
  getUsersRequest: () => void
};

const UserManagement: React.FC<Props> = ({users, getUsersRequest, loading }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const openModal = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);
  const closeModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  useEffect(() => {
    if (!users.length) {
      getUsersRequest();
    }
  }, []);

  const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (!users) return null;

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant='h3' gutterBottom>User management</Typography>
        <div className={styles.users}>
          <div className={styles.search}>
            <TextField
              label={"Search"}
              margin="normal"
              value={search}
              onChange={searchInputChanged}
            />
          </div>
          {users.map(user => (
            <Paper key={user.id} className={styles.user} onClick={() => openModal(user)}>
              <div>
                <span>{user.username}</span>
                <span>{` ${user.firstName} ${user.lastName}`}</span>
              </div>
              <div>
                <SettingIcon />
              </div>
            </Paper>
          ))}
        </div>
      </Paper>
      <UserDetails close={closeModal} user={selectedUser}/>
    </Container>
  )
};

const mapStateToProps = (state: StoreState) => ({
  users: users(state),
  loading: isLoading(state)
});

const mapDispatchToProps = {
  getUsersRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
