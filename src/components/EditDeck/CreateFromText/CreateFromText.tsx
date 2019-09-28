import React, { useEffect, useRef, useState } from 'react';
import styles from './CreateFromText.module.scss';
import TextField from '@material-ui/core/TextField';
import { ColorResult, GithubPicker } from 'react-color';
import { Button, Typography } from '@material-ui/core';
import { classes } from '../../utils/utils';

// TODO: 12 - 150

type Props = {
  className?: string,
  saveHandler: (images: Array<File | Blob>) => void,
}

const CreateFromText: React.FC<Props> = ({className = '', saveHandler}) => {
  const [color, setColor] = useState<string>('#000');
  const [word, setWord] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(40);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const saveWord = () => {
    canvasRef.current!.toBlob(blob => {
      if (blob) {
        saveHandler([blob]);
      }
    });
  };

  useEffect(() => {
    if (word && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const {width, height} = canvasRef.current;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = color;
        ctx.font = `${fontSize}pt Roboto`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText(word, width/2, height/2);
      }
    }
  }, [word, color, fontSize]);

  return (
    <div className={classes(styles.wrapper, className)}>
      <div className={styles.inputWrapper} >
        <div className={styles.input}>
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
        </div>
        <div className={styles.pickColor}>
          <Typography variant='subtitle1' gutterBottom>Pick color:</Typography>
          <GithubPicker onChange={colorChanged} triangle='hide' />
        </div>
      </div>
      {word &&
        <div className={styles.preview}>
          <Typography variant={'h5'} gutterBottom>Preview</Typography>
          <canvas className={styles.wordWrapper} height={200} width={200} ref={canvasRef} />
          <Button className={styles.submit} variant='contained' color='primary' onClick={saveWord}>Save</Button>
        </div>
      }
    </div>
  )
}

export default CreateFromText;
