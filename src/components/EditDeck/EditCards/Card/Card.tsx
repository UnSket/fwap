import React, { useState } from 'react';
import styles from './Card.module.scss';
import EditableImage from './EditableImage/EditableImage';
import { classes, formatCardNumber } from '../../../utils/utils';
import { EditableImageT } from '../../../../model/types/Card';

interface Props {
  editableImages: Array<EditableImageT>,
  updateImage: (image: EditableImageT, imageIndex: number) => void,
  isNumerated: boolean,
  cardNumber: number
}

const Card: React.FC<Props> = React.memo(({editableImages, updateImage, isNumerated, cardNumber}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const cardClasses = classes(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableImages.map((image, i) => (
          <EditableImage editableImage={image} key={i} setCardActive={setActive} updateImage={(image) => updateImage(image, i)}/>
        ))}
        {isNumerated && <span className={styles.cardNumber}>{formatCardNumber(cardNumber)}</span>}
      </div>
  )
});

export default Card;
