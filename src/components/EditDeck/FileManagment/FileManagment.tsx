import React, { useCallback, useContext } from 'react';
import DropFile from '../FileDrop/FileDrop';
import styles from './FileManagment.module.scss';
import { Divider, Typography } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import { OpenChangeFileModalContext } from '../EditDeck';
import CreateFromText from '../CreateFromText/CreateFromText';
import { Image } from '../../../model/types/Image';
import { getUrlFromImgKey } from '../../utils/utils';
import { saveFileRequest, updateImageRequest } from '../../../modules/decks/files/actions';
import { ImageWithPreview } from '../../../model/types/ImageWithPreview';
import { connect } from 'react-redux';


type Props = {
  images: Array<Image> | null,
  deckId: string,
  saveFileRequest: (images: Array<ImageWithPreview>, deckId: string) => void
  updateImageRequest: (image: Image, file: File, deckId: string) => void
};

const FileManagment: React.FC<Props> = ({images, deckId, updateImageRequest, saveFileRequest}) => {
  const openModal = useContext(OpenChangeFileModalContext);

  const saveHandler = useCallback((images: Array<ImageWithPreview>) => {
    saveFileRequest(images, deckId);
  }, [deckId]);

  const getUpdateHandler = useCallback((image: Image) => {
   return (images: Array<ImageWithPreview>) => {
      if (deckId && image && images.length > 0) {
        updateImageRequest(image, images[0].file, deckId);
      }
    };
  }, [deckId]);

  return (
    <div className={styles.wrapper} >
      <div className={styles.add}>
        <div>
          <Typography variant={'h4'} gutterBottom>Upload images</Typography>
          <DropFile multiple saveHandler={saveHandler} />
        </div>
        <div className={styles.fromText}>
          <Typography variant={'h4'} gutterBottom>Create from text</Typography>
          <CreateFromText className={styles.fromText} />
        </div>
      </div>
      <Divider variant="middle" />
      {images && !!images.length && (
        <div className={styles.uploaded}>
          <Typography variant='h4' gutterBottom>Uploaded images</Typography>
          <div className={styles.imageWrapper}>
            {images.map((image, i) => (
              <div className={styles.image} key={i} onClick={() => openModal(getUpdateHandler(image))}>
                <div className={styles.settings}>
                  <SettingIcon className={styles.settingIcon} />
                </div>
                <img src={getUrlFromImgKey(image.url)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  )
};

const mapDispatchToProps = {
  saveFileRequest,
  updateImageRequest
};

export default connect(null, mapDispatchToProps)(FileManagment);
