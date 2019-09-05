import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import EditableImage from './EditableImage/EditableImage';
import { useClasses } from '../../../utils/utils';
import { Image } from '../../../../model/types/Image';
import { EditableImageT } from '../../../../model/types/Card';

interface Props {
  imagesById: {
    [key: string]: Image
  },
  editableImages: Array<EditableImageT>,
  updateImage: (image: EditableImageT, imageIndex: number) => void
}

const Card: React.FC<Props> = React.memo(({editableImages, imagesById, updateImage}) => {
  const [isActive, setActive] = useState<boolean>(false);
  useEffect(() => {
    console.log('recreated card');
  }, []);

  useEffect(() => {
    console.log('updated card');
  }, [editableImages]);

  const cardClasses = useClasses(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableImages.map((image, i) => (
          <EditableImage editableImage={image} image={imagesById[image.imageId].url} key={i} setCardActive={setActive} updateImage={(image) => updateImage(image, i)}/>
        ))}
      </div>
  )
});

export default Card;
