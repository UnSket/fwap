import React, { useEffect, useState } from 'react';
import styles from './EditableItem.module.scss';
import { getUrlFromImgKey, useClasses } from '../../../../../utils/utils';
import { EditableLegendItemT, TYPES } from '../../../../../../model/types/Legend';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  setCardActive: (isActive: boolean) => void,
  updateItem: (image: EditableLegendItemT) => void,
  editableItem: EditableLegendItemT,
  textSize: number;
}

type Point = {
  x: number,
  y: number
};

const imageC = 3;

const EditableItem: React.FC<Props> = React.memo(({editableItem, setCardActive, updateItem, textSize}) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<Point>({x: editableItem.positionX, y: editableItem.positionY});
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const wrapperStyles = useClasses(styles.wrapper, active ? styles.active : '');
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});

  const getComponent = () => {
    if (editableItem.legendSourceType === TYPES.image) {
      const size = imageC * textSize;
      return <div style={{backgroundImage: `url(${getUrlFromImgKey(editableItem.source)})`, width: size, height: size}} className={styles.image} draggable={false}/>;
    }
    return (
      <>
        <div className={styles.edit}>
          <EditIcon />
        </div>
        <span style={{fontSize: textSize, whiteSpace: 'nowrap'}}>{editableItem.source}</span>
      </>
    );
  };


  useEffect(() => {
    setPosition({x: editableItem.positionX, y: editableItem.positionY});
  }, [editableItem]);

  const focus = (e: React.FocusEvent) => {
    console.log('activate');
    setActive(true);
    setCardActive(true);
  };
  const blur = () => {
    setActive(false);
    setCardActive(false);
    updateItem({
      ...editableItem,
      positionX: position.x,
      positionY: position.y,
    })
  };


  const startMoving = (e: React.MouseEvent) => {
    setStartPoint({x: e.clientX, y: e.clientY});
    setIsMoving(true);
  };
  const move = (e: React.MouseEvent) => {
    if (!isMoving) {
      return;
    }
    const newX = position.x + (e.clientX - startPoint.x);
    const newY = position.y + (e.clientY - startPoint.y);
    setPosition({x: newX, y: newY});
    setStartPoint({x: e.clientX, y: e.clientY});
  };
  const stopMoving = (e: React.MouseEvent) => {
    setIsMoving(false);
  };

  return (
    <div
      style={{top: position.y, left: position.x}}
      className={wrapperStyles}
      tabIndex={1}
      onFocus={focus}
      onBlur={blur}
      onMouseDown={startMoving}
      onMouseMove={move}
      onMouseUp={stopMoving}
      onMouseLeave={stopMoving}
      onClick={() => console.log(editableItem)}>

      {getComponent()}
    </div>
  )
});

export default EditableItem;
