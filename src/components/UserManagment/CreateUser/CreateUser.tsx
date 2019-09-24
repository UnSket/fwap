import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import styles from './CreateUser.module.scss';
import { CreateUserForm } from '../../../model/types/User';

type Props = {
  isOpen: boolean,
  close: () => void,
  createUserRequest: (user: CreateUserForm) => void
};

const CreateUser: React.FC<Props> = ({isOpen, close, createUserRequest}) => {
  const [username, changeName] = useState<any>({value: ''});
  const [password, changePassword] = useState<any>({value: ''});
  const [active, changeActive] = useState<boolean>(true);

  const nameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeName({value: e.target.value});
  };

  const descriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword({value: e.target.value});
  };

  const activeCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeActive(e.target.checked);
  };

  const createUser = () => {
    if (!username.value) changeName({value: username.value, error: 'Field is required'});
    if (!password.value) changePassword({value: password.value, error: 'Field is required'});

    if (username.value && password.value) {
      createUserRequest({username: username.value, active, password: password.value});
    }
  };
  return (
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <div className={styles.form}>
          <TextField
            label={username.error || "Username"}
            className={styles.textField}
            margin="normal"
            value={username.name}
            onChange={nameInputChange}
            error={!!username.error}
          />
          <TextField
            label={password.error || "Password"}
            className={styles.textField}
            margin="dense"
            multiline
            rowsMax="4"
            value={password.name}
            error={!!password.error}
            onChange={descriptionInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox checked={active} onChange={activeCheckboxChange} />
            }
            label="Active"
            className={styles.checkbox}
          />
          <Button variant="contained" color='primary' className={styles.submit} onClick={createUser}>
            Create
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={() => {}}>Save</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default CreateUser;
