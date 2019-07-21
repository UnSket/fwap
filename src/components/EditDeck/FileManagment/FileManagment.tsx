import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DropFile from './FileDrop/FileDrop';

type Props = {
  onDrop: any,
  onFileDrop: any
};
class FileManagment extends React.Component {

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <DropFile />
      </DndProvider>
    )
  }
};

export default FileManagment;