import React, { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import {CircularProgress} from '@material-ui/core';
import styles from './FileDrop.module.scss';
import { useClasses } from '../../../../modules/utils/tools';
import AddImageIcon from '@material-ui/icons/AddPhotoAlternate'

type ImageData = {
  url: string,
  name: string
}

function collect(monitor: DropTargetMonitor) {
  return {
    isOver: monitor.isOver(),
    itemType: monitor.getItemType(),
    canDrop: monitor.canDrop(),
  };
}

const loadPromise = (reader: FileReader, name: string) => {
  return new Promise<ImageData>(resolve => {
    reader.onload = (loaded: any) => resolve({url: loaded.target.result, name});
  })
};

const Progress:React.FC = () => (
  <div className={styles.progressWrapper}>
    <CircularProgress className={styles.progress} size={70} />
  </div>
);

const DropFile:React.FC<any> = () => {
  const [images, setImages] = useState<Array<ImageData>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onDrop = (item: any) => {
    setLoading(true);
    if (item.files) {
      loadFiles(item.files);
    }
  };

  const onInputChange = (e: any) => {
    console.log(e.currentTarget.files);
    loadFiles(Object.values(e.currentTarget.files));
  };

  const loadFiles = (files: any) => {
    const loadPromises = files.map((file: File) => {
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        const promise = loadPromise(reader, file.name);
        reader.readAsDataURL(file);
        return promise;
      }
    });
    Promise.all(loadPromises).then((newImages: Array<any>) => {
      setImages(images.concat(newImages));
      setLoading(false);
    })
  };
  const [collectedProps, drop] = useDrop({
    accept: ['__NATIVE_FILE__'],
    drop: onDrop,
    collect
  });
  const containerClasses = useClasses(styles.wrapper, collectedProps.isOver ? '' : styles.hovered);
  const inputId = `file-input-${Math.round(Math.random() * 100000)}`;
  console.log(images);
  return (
    <div className={styles.container}>
      {isLoading && <Progress />}
      <label ref={drop} className={containerClasses} htmlFor={inputId}>
        <AddImageIcon className={styles.icon}/>
        <span className={styles.dropLabel}>Drop images here or press to choose</span>
        <input type='file' hidden accept='image/*' id={inputId} onChange={onInputChange} multiple={true}/>
      </label>
      <div className={styles.imagePreview}>
        {images.map((image, i) => (
          <div className={styles.item} key={i}>
            <img src={image.url} alt='' />
            <span>{image.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropFile;