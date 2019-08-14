import React, { useState } from 'react';
import styles from './CreateFromText.module.scss';
import TextField from '@material-ui/core/TextField';
import { ColorResult, GithubPicker } from 'react-color';
import { Button, Typography } from '@material-ui/core';
import { number } from 'prop-types';

// TODO: 12 - 150
const CreateFromText: React.FC = () => {
  const [color, setColor] = useState<string>('#000');
  const [word, setWord] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(18);
  //const [isColor]
  const colorChanged = (e: ColorResult) => {
    setColor(e.hex);
  };

  const wordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const fontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(+e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input} >
        <TextField
          margin="dense"
          id="word"
          label="Word to add"
          type="text"
          variant='outlined'
          onChange={wordChange}
        />
        <TextField
          margin="dense"
          id="fontSize"
          label="Font size"
          type="number"
          variant='outlined'
          value={fontSize}
          onChange={fontSizeChange}
        />
        <div>
          <Typography variant='subtitle1' gutterBottom>Pick color:</Typography>
          <GithubPicker onChange={colorChanged} triangle='hide' />
        </div>
      </div>
      {word &&
        <div className={styles.preview}>
          <Typography variant={'h5'} gutterBottom>Preview</Typography>
          <div className={styles.wordWrapper}>
            <span style={{color, fontSize}}>{word}</span>
          </div>
          <Button className={styles.submit} variant='contained' color='primary'>Save</Button>
        </div>
      }
    </div>
  )
}

export default CreateFromText;
