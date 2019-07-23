import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DropFile from './FileDrop/FileDrop';
import styles from './FileManagment.module.scss';

type Props = {
  onDrop: any,
  onFileDrop: any
};
class FileManagment extends React.Component {

  render() {
    return (
      <div className={styles.wrapper} >
        <DndProvider backend={HTML5Backend}>
          <DropFile />
        </DndProvider>
      </div>
    )
  }
};

export default FileManagment;