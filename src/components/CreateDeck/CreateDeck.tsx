import React from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import styles from './CreateDeck.module.scss';

const CreateDeck: React.FC = () => {

  return (
    <Container className={styles.wrapper}>
      <Paper className={styles.paper}>
        <form noValidate autoComplete="off" className={styles.form}>
          <Typography variant={'h4'} gutterBottom className={styles.header}>Create new Deck</Typography>
          <TextField
            label="Name"
            className={styles.textField}
            margin="normal"
          />
          <TextField
            label="Description"
            className={styles.textField}
            margin="dense"
            multiline
            rowsMax="4"
          />
          <FormControl className={styles.select}>
            <InputLabel htmlFor="age-helper">Image count per card</InputLabel>
            <Select
              value={5}
              inputProps={{
                name: 'Images',
                id: 'age-simple',
              }}
            >
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color='primary' className={styles.submit}>
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  )
};

export default CreateDeck;