import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { User } from '../../../model/types/User';
import { MenuItem, Select, Checkbox } from '@material-ui/core';
import styles from './UserDetails.module.scss';
import { AUTHORITIES } from '../../../model/constans/userAuthorities';

type Props = {
  close: () => void,
  user: User | null
}

const UserDetails: React.FC<Props> = ({close, user}) => {
  const [authority, setAuthority] = useState<string>(AUTHORITIES.USER);
  const [isActive, setIsActive] = useState<boolean>(true);
  useEffect(() => {
    if (!user) return;
    const isAdmin = user.authorities.some(authority => authority.authority === AUTHORITIES.ADMIN);
    setAuthority(isAdmin ? AUTHORITIES.ADMIN : AUTHORITIES.USER);
    setIsActive(user.active);
  }, [user]);

   const isActiveCheckboxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };
  const authorityChanges = (e: React.ChangeEvent<{name?: string, value: any}>) => {
    setAuthority(e.target.value);
  };

  return (
    <Dialog maxWidth='sm' fullWidth open={!!user} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>User details</DialogTitle>
      <DialogContent>
        {user && (
          <>
            <div>Username: {user.username}</div>
            <div>
              <span>Role:</span>
              <Select
                value={authority}
                onChange={authorityChanges}
                className={styles.select}
              >
                <MenuItem value={AUTHORITIES.USER}>User</MenuItem>
                <MenuItem value={AUTHORITIES.ADMIN}>Admin</MenuItem>
              </Select>
            </div>
            <div>
              <span>Active </span>
              <Checkbox
                checked={isActive}
                onChange={isActiveCheckboxChanged}
                color="primary"
              />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='primary'>Save</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
