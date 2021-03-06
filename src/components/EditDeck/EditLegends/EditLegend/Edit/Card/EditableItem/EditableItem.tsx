import React, { useEffect, useState } from 'react';
import styles from './EditableItem.module.scss';
import { getUrlFromImgKey, classes } from '../../../../../../utils/utils';
import { EditableLegendItemT, LegendSourceTypeEnum } from '../../../../../../../model/types/Legend';
import EditIcon from '@material-ui/icons/Edit';
import { Image } from '../../../../../../../model/types/Image';

interface Props {
  setCardActive: (isActive: boolean) => void,
  updateItem: (image: EditableLegendItemT) => void,
  editableItem: EditableLegendItemT,
  textSize: number;
  editImage: (imageId: number) => void
}

type Point = {
  x: number,
  y: number
};

const imageFactor = 3;

const EditableItem: React.FC<Props> = React.memo(({editableItem, setCardActive, updateItem, textSize, editImage}) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<Point>({x: editableItem.positionX, y: editableItem.positionY});
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const wrapperStyles = classes(styles.wrapper, active ? styles.active : '');
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});

  const getComponent = () => {
    if (editableItem.legendSourceType === LegendSourceTypeEnum.image) {
      const size = imageFactor * textSize;
      return <div style={{backgroundImage: `url(${getUrlFromImgKey(editableItem.source)})`, width: size, height: size}} className={styles.image} draggable={false}/>;
    }
    return (
      <>
        <div className={styles.edit} onClick={() => editImage(editableItem.imageId)}>
          <EditIcon className={styles.icon} />
        </div>
        <span style={{fontSize: textSize, whiteSpace: 'nowrap'}}>{editableItem.source}</span>
      </>
    );
  };


  useEffect(() => {
    setPosition({x: editableItem.positionX, y: editableItem.positionY});
  }, [editableItem]);

  const focus = (e: React.FocusEvent) => {
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
      onMouseLeave={stopMoving}>

      {getComponent()}
    </div>
  )
});

export default EditableItem;
