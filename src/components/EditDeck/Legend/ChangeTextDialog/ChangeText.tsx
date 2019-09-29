import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import AddLegend from '../AddLegend/AddLegend';
import { Image } from '../../../../model/types/Image';

type Props = {
  close: () => void,
  image: Image | null,
  deckId: string
};

const ChangeTextDialog:React.FC<Props> = ({close, image, deckId}) => {
  return (
    <Dialog maxWidth='sm' fullWidth open={!!image} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle>Change image</DialogTitle>

      <DialogContent>
        {image && <AddLegend image={image} deckId={deckId} />}
      </DialogContent>
      <DialogActions>
        {/*<Button color='primary'>Save</Button>*/}
        <Button onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeTextDialog;
