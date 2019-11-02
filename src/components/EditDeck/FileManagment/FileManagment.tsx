import React, { useCallback, useContext } from 'react';
import DropFile from '../FileDrop/FileDrop';
import styles from './FileManagment.module.scss';
import { CircularProgress, Divider, Typography } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import { OpenChangeFileModalContext } from '../EditDeck';
import CreateFromText from '../CreateFromText/CreateFromText';
import { Image } from '../../../model/types/Image';
import { getUrlFromImgKey } from '../../utils/utils';
import { saveFileRequest, updateImageRequest } from '../../../modules/userDecks/files/actions';
import { ImageWithPreview } from '../../../model/types/ImageWithPreview';
import { connect } from 'react-redux';
import { StoreState } from '../../../modules/types';
import { filesState } from '../../../modules/userDecks/selectors';


type Props = {
  images: Array<Image> | null,
  deckId: string,
  imagesRequired: number,
  saveFileRequest: (images: Array<File | Blob>, deckId: string, bgCleanUpFlags?: boolean) => void,
  updateImageRequest: (image: Image, file: File | Blob, deckId: string, bgCleanUpFlags?: boolean) => void,
  loading: boolean,
  error?: string | null
};

const FileManagment: React.FC<Props> = ({images, deckId, updateImageRequest, saveFileRequest, imagesRequired, loading}) => {
  const openModal = useContext(OpenChangeFileModalContext);

  const saveHandler = useCallback((images: Array<File | Blob>, bgCleanUpFlags?: boolean) => {
    saveFileRequest(images, deckId, bgCleanUpFlags);
  }, [deckId]);

  const getUpdateHandler = useCallback((image: Image) => {
   return (images: Array<File | Blob>, bgCleanUpFlags?: boolean) => {
      if (deckId && image && images.length > 0) {
        updateImageRequest(image, images[0], deckId, bgCleanUpFlags);
      }
    };
  }, [deckId]);

  return (
    <div className={styles.wrapper} >
      {loading && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      {!!imagesRequired &&
      <>
        <div className={styles.add}>
          <div>
            <Typography variant={'h4'} gutterBottom>Upload images ({imagesRequired} left)</Typography>
            <DropFile multiple saveHandler={saveHandler} max={imagesRequired}/>
          </div>
          <div className={styles.fromText}>
            <Typography variant={'h4'} gutterBottom>Create from text</Typography>
            <CreateFromText className={styles.fromText} saveHandler={saveHandler}/>
          </div>
        </div>
        <Divider variant="middle" className={styles.divider}/>
      </>
      }
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

const mapStateToProps = (state: StoreState) => ({
  ...filesState(state)
});

const mapDispatchToProps = {
  saveFileRequest,
  updateImageRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(FileManagment);
