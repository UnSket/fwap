import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { useClasses } from '../../../../utils/utils';
import { EditableLegendItemT } from '../../../../../model/types/Legend';
import EditableItem from './EditableItem/EditableItem';

interface Props {
  editableImages: Array<EditableLegendItemT>,
  updateItem: (item: EditableLegendItemT, imageIndex: number) => void,
  textSize: number
}

const Card: React.FC<Props> = React.memo(({editableImages, updateItem, textSize}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const cardClasses = useClasses(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableImages.map((item, i) => (
          <EditableItem key={i} setCardActive={setActive} updateItem={(image) => updateItem(image, i)} editableItem={item} textSize={textSize}/>
        ))}
      </div>
  )
});

export default Card;
