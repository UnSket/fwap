import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import EditableImage from './EditableImage/EditableImage';
import { classes } from '../../../utils/utils';
import { Image } from '../../../../model/types/Image';
import { EditableImageT } from '../../../../model/types/Card';

interface Props {
  editableImages: Array<EditableImageT>,
  updateImage: (image: EditableImageT, imageIndex: number) => void
}

const Card: React.FC<Props> = React.memo(({editableImages, updateImage}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const cardClasses = classes(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableImages.map((image, i) => (
          <EditableImage editableImage={image} key={i} setCardActive={setActive} updateImage={(image) => updateImage(image, i)}/>
        ))}
      </div>
  )
});

export default Card;
