import React, { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { Button, CircularProgress, Fab, Typography } from '@material-ui/core';
import styles from './FileDrop.module.scss';
import { useClasses } from '../../utils/utils';
import AddImageIcon from '@material-ui/icons/AddPhotoAlternate'
import RemoveIcon from '@material-ui/icons/Close';
import { saveFileRequest } from '../../../modules/decks/files/actions';
import { connect } from 'react-redux';
import { ImageWithPreview } from '../../../model/types/ImageWithPreview';

type Props = {
  multiple?: boolean,
  saveFileRequest: (image: Array<ImageWithPreview>, deckId: string) => void
}

function collect(monitor: DropTargetMonitor) {
  return {
    isOver: monitor.isOver(),
    itemType: monitor.getItemType(),
    canDrop: monitor.canDrop(),
  };
}

const loadPromise = (reader: FileReader, file: File) => {
  return new Promise<ImageWithPreview>(resolve => {
    reader.onload = (loaded: any) => resolve({url: loaded.target.result, file});
  })
};

const Progress:React.FC = () => (
  <div className={styles.progressWrapper}>
    <CircularProgress className={styles.progress} size={70} />
  </div>
);

const DropFile:React.FC<Props> = ({multiple, saveFileRequest}) => {
  const [images, setImages] = useState<Array<ImageWithPreview>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onDrop = (item: any) => {
    if (item.files) {
      loadFiles(item.files);
    }
  };

  const onInputChange = (e: any) => {
    const files = Object.values(e.currentTarget.files);
    loadFiles(files);
  };

  const loadFiles = (files: any) => {
    setLoading(true);
    const imageFiles = files.filter((file: File) => file.type.startsWith('image'));
    const imageFilesToLoad = multiple ? imageFiles : imageFiles.slice(-1);
    console.log(imageFilesToLoad);
    const loadPromises = imageFilesToLoad.map((file: File) => {
      const reader = new FileReader();
      const promise = loadPromise(reader, file);
      reader.readAsDataURL(file);
      return promise;
    });
    Promise.all(loadPromises).then((newImages: Array<any>) => {
      setImages(images.concat(newImages));
      setLoading(false);
    })
  };

  const loadPressed = () => {
    saveFileRequest(images, '1');
  };

  const removeImage = (imageIndex: number) => {
    const imageCopy = images.slice();
    imageCopy.splice(imageIndex, 1);
    setImages(imageCopy);
  };

  const [collectedProps, drop] = useDrop({
    accept: ['__NATIVE_FILE__'],
    drop: onDrop,
    collect
  });
  const containerClasses = useClasses(styles.wrapper, collectedProps.isOver ? '' : styles.hovered);
  const inputId = `file-input-${Math.round(Math.random() * 100000)}`;

  const isLoadable = multiple || !images.length;
  const imagePreviewWrapperClasses = useClasses(styles.imagePreviewWrapper, multiple ? '' : styles.single);
  return (
    <div className={styles.container}>
      {isLoading && <Progress />}
      {isLoadable && <label ref={drop} className={containerClasses} htmlFor={inputId}>
        <AddImageIcon className={styles.icon}/>
        <span className={styles.dropLabel}>Drop images here or press to choose</span>
        <input type='file' hidden accept='image/*' id={inputId} onChange={onInputChange} multiple={multiple}/>
      </label>}
      {images.length > 0 &&
        <div className={imagePreviewWrapperClasses}>
          <Typography variant='h5' className={styles.previewTitle}>Image preview</Typography>
          <div className={styles.imagePreview}>
            {images.map((image, i) => (
              <div className={styles.item} key={i}>
                <Fab size="small" color="secondary" aria-label="Add" className={styles.remove} onClick={() => removeImage(i)}>
                  <RemoveIcon className={styles.icon}/>
                </Fab>
                <img src={image.url} alt='' />
                <span>{image.file.name}</span>
              </div>
            ))}
          </div>
          <Button variant='contained' color='primary' className={styles.submit} onClick={loadPressed}>Upload</Button>
        </div>}
    </div>
  );
};

const mapDispatchToProps = {
  saveFileRequest
};

export default connect(null, mapDispatchToProps)(DropFile);
