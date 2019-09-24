import React, { useCallback, useEffect, useState } from 'react';
import { CreateUserForm, User } from '../../model/types/User';
import { Fab, CircularProgress, Container, Paper, TextField, Typography } from '@material-ui/core';
import styles from './UserManagement.module.scss';
import {users, loading, page, last} from '../../modules/users/selectors';
import {getUsersRequest, updateUserRequest, createUserRequest} from '../../modules/users/actions';
import { StoreState } from '../../modules/types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import throttle from "lodash/throttle";
import AddIcon from '@material-ui/icons/Add';
import CreateUser from './CreateUser/CreateUser';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

type Props = {
  users: Array<User>,
  loading: boolean,
  page: number,
  last: boolean,
  getUsersRequest: (page: number, search?: string, reset?: boolean) => void,
  updateUserRequest: (userId: string, active: boolean) => void,
  createUserRequest: (user: CreateUserForm) => void
};

const UserManagement: React.FC<Props> = ({users, getUsersRequest, loading, page, last, updateUserRequest, createUserRequest}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const openConfirmDialog = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);
  const closeConfirmDialog = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const blockUser = () => {
    if (selectedUser) {
      updateUserRequest(selectedUser.id, false);
      closeConfirmDialog();
    }
  };

  const unblockUser = (userId: string) => {
    updateUserRequest(userId, true);
  };

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

  const ConfirmDialog: React.FC = () => {
    const isOpen = !!selectedUser;
    return (
      <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={closeConfirmDialog} aria-labelledby="form-dialog-title">
        <DialogTitle>Block {selectedUser && selectedUser.username}</DialogTitle>
        <DialogContent>
          Are you sure you want to block the user? The user will not be able to access the site. You can always restore access.
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={blockUser}>Block</Button>
          <Button onClick={closeConfirmDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
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
            <div key={'loader'} className={styles.loader}>
              <CircularProgress size={30} />
            </div>
          }
        >
          <div className={styles.users}>
            {users.map(user => (
              <Paper key={user.id} className={styles.user}>
                <div>
                  <span>{user.username}</span>
                </div>
                <div>
                  {user.active && <Button variant='contained' color='secondary' onClick={() => openConfirmDialog(user)}>Block</Button>}
                  {!user.active && <Button variant='contained' color='primary' onClick={() => unblockUser(user.id)}>Unblock</Button>}
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
      <ConfirmDialog />
      <CreateUser isOpen={isCreateUserModalOpen} close={closeCreateUserModal} createUserRequest={createUserRequest}/>
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
  getUsersRequest,
  updateUserRequest,
  createUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
