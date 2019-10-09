import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DropFile from '../FileDrop/FileDrop';
import { Tab, Tabs } from '@material-ui/core';
import CreateFromText from '../CreateFromText/CreateFromText';
import { ImageWithPreview } from '../../../model/types/ImageWithPreview';

type Props = {
  isOpen: boolean,
  close: () => void,
  saveHandler: (images: Array<File | Blob>, bgCleanUpFlags?: boolean) => void,
};

const ChangeFileDialog: React.FC<Props> = ({isOpen, close, saveHandler}) => {
  const [currentTab, changeTab] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
  };

  const saveAndExit = useCallback((images: Array<File | Blob>, bgCleanUpFlags?: boolean) => {
    saveHandler(images, bgCleanUpFlags);
    close();
  }, [saveHandler, close]);
  const Content: React.FC = () => {
    switch (currentTab) {
      case 0: return <DropFile saveHandler={saveAndExit} />;
      default: return <CreateFromText saveHandler={saveAndExit} />;
    }
  };
  return (
    <Dialog maxWidth='sm' fullWidth open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>Change image</DialogTitle>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth">
        <Tab label="Upload image" />
        <Tab label="Create from text" />
      </Tabs>
      <DialogContent>
        <Content />
      </DialogContent>
      <DialogActions>
        <Button color='secondary'>Delete</Button>
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeFileDialog;
