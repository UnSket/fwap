import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { useClasses } from '../../../../utils/utils';
import { EditableLegendItemT } from '../../../../../model/types/Legend';
import EditableItem from './EditableItem/EditableItem';

interface Props {
  editableImages: Array<EditableLegendItemT>,
  updateItem: (item: EditableLegendItemT, imageIndex: number) => void,
  tagSize: number
}

const Card: React.FC<Props> = React.memo(({editableImages, updateItem, tagSize}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const cardClasses = useClasses(styles.card, isActive ? styles.active : '');
  return (
      <div className={cardClasses}>
        {editableImages.map((item, i) => (
          <EditableItem setCardActive={setActive} updateItem={(image) => updateItem(image, i)} editableItem={item} tagSize={tagSize}/>
        ))}
      </div>
  )
});

export default Card;
