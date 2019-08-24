import React, { useContext } from 'react';
import DropFile from '../FileDrop/FileDrop';
import styles from './FileManagment.module.scss';
import { Divider, Typography } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import { OpenChangeFileModalContext } from '../EditDeck';
import CreateFromText from '../CreateFromText/CreateFromText';
import { Image } from '../../../model/types/Image';
import { getUrlFromImgKey } from '../../utils/utils';
type Props = {
  images: Array<Image> | null
};

const FileManagment: React.FC<Props> = ({images}) => {
  const openModal = useContext(OpenChangeFileModalContext);

  return (
    <div className={styles.wrapper} >
      <div className={styles.add}>
        <div>
          <Typography variant={'h4'} gutterBottom>Upload images</Typography>
          <DropFile multiple />
        </div>
        <div>
          <Typography variant={'h4'} gutterBottom>Create from text</Typography>
          <CreateFromText />
        </div>
      </div>
      <Divider variant="middle" />
      {images && !!images.length && (
        <div className={styles.uploaded}>
          <Typography variant='h4' gutterBottom>Uploaded images</Typography>
          <div className={styles.imageWrapper} onClick={openModal}>
            {images.map((image, i) => (
              <div className={styles.image} key={i}>
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

export default FileManagment;
