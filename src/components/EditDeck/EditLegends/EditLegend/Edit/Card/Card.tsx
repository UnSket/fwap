import React, { useState } from 'react';
import styles from './Card.module.scss';
import { classes, formatCardNumber } from '../../../../../utils/utils';
import { EditableLegendItemT } from '../../../../../../model/types/Legend';
import EditableItem from './EditableItem/EditableItem';

interface Props {
  editableItems: Array<EditableLegendItemT>,
  updateItem: (item: EditableLegendItemT, imageIndex: number) => void,
  textSize: number,
  editImage: (imageId: number) => void,
  isNumerated: boolean,
  cardNumber: number
}

const Card: React.FC<Props> = React.memo(({editableItems, updateItem, textSize, editImage, isNumerated, cardNumber}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const cardClasses = classes(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableItems.map((item, i) => (
          <EditableItem
            key={i}
            setCardActive={setActive}
            updateItem={(image) => updateItem(image, i)}
            editableItem={item}
            textSize={textSize}
            editImage={editImage}
          />
        ))}
        {isNumerated && <span className={styles.cardNumber}>{formatCardNumber(cardNumber)}</span>}
      </div>
  )
});

export default Card;
