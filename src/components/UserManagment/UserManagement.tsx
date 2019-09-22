import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../model/types/User';
import { Fab, CircularProgress, Container, Paper, TextField, Typography } from '@material-ui/core';
import styles from './UserManagement.module.scss';
import SettingIcon from '@material-ui/icons/Settings';
import UserDetails from './UserDetails/UserDetails';
import {users, loading, page, last} from '../../modules/users/selectors';
import {getUsersRequest} from '../../modules/users/actions';
import { StoreState } from '../../modules/types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import throttle from "lodash/throttle";
import AddIcon from '@material-ui/icons/Add';
import CreateUser from './CreateUser/CreateUser';

type Props = {
  users: Array<User>,
  loading: boolean,
  page: number,
  last: boolean,
  getUsersRequest: (page: number, search?: string, reset?: boolean) => void
};

const UserManagement: React.FC<Props> = ({users, getUsersRequest, loading, page, last }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const openUserDetailsModal = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);
  const closeUserDetailsModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);
  const openCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };
  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  useEffect(() => {
    if (!users.length && !loading) {
      getUsersRequest(page + 1);
    }
  }, []);

  const throttledSearch = useCallback(throttle(search => getUsersRequest(0, search, true), 1000, {trailing: true, leading: false}), []);

  const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledSearch(e.target.value);
    setSearch(e.target.value);
  };
  const enterPressed = (e: React.KeyboardEvent) =>{
    if (e.key === 'Enter') {
      getUsersRequest(0, search, true);
    }
  };

  const getNextPage = () => {
    if (!loading) {
      getUsersRequest(page + 1);
    }
  };

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant='h3' gutterBottom>User management</Typography>
          <div className={styles.search}>
            <TextField
              autoFocus
              margin="dense"
              label={"Search"}
              variant='outlined'
              value={search}
              onChange={searchInputChanged}
              onKeyPress={enterPressed}
            />
          </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextPage}
          hasMore={!last}
          loader={
            <div className={styles.loader}>
              <CircularProgress size={30} />
            </div>
          }
        >
          <div className={styles.users}>
            {users.map(user => (
              <Paper key={user.id} className={styles.user} onClick={() => openUserDetailsModal(user)}>
                <div>
                  <span>{user.username}</span>
                </div>
                <div>
                  <SettingIcon />
                </div>
              </Paper>
            ))}
          </div>
        </InfiniteScroll>
        {!users.length && !loading && (
          <div className={styles.empty}>
            No data
          </div>
        )}
        <Fab className={styles.add} color='primary' onClick={openCreateUserModal}>
          <AddIcon />
        </Fab>
      </Paper>
      <UserDetails close={closeUserDetailsModal} user={selectedUser}/>
      <CreateUser isOpen={isCreateUserModalOpen} close={closeCreateUserModal}/>
    </Container>
  )
};

const mapStateToProps = (state: StoreState) => ({
  users: users(state),
  loading: loading(state),
  page: page(state),
  last: last(state)
});

const mapDispatchToProps = {
  getUsersRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
