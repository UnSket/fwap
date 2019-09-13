import React, { useEffect, useRef, useState } from 'react';
import { EditableImageT } from '../../../../../../model/types/Card';
import styles from './EditableItem.module.scss';
import { getUrlFromImgKey, useClasses } from '../../../../../utils/utils';
import RotateIcon from '@material-ui/icons/Replay';
import { EditableLegendItemT, TYPES } from '../../../../../../model/types/Legend';

interface Props {
  setCardActive: (isActive: boolean) => void,
  updateItem: (image: EditableLegendItemT) => void,
  editableItem: EditableLegendItemT,
  tagSize: number;
}

type Point = {
  x: number,
  y: number
};

const initSize = 102;

const EditableItem: React.FC<Props> = React.memo(({editableItem, setCardActive, updateItem, tagSize}) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<Point>({x: editableItem.positionX, y: editableItem.positionY});
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const wrapperStyles = useClasses(styles.wrapper, active ? styles.active : '');
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});

  const Content:React.FC = () => {
    if (editableItem.type === TYPES.image) {
      return <img src={getUrlFromImgKey(editableItem.source)} alt='' draggable={false}/>;
    }
    return <span>{editableItem.source}</span>
  };


    useEffect(() => {
    setPosition({x: editableItem.positionX, y: editableItem.positionY});
  }, [editableItem]);

  const height = initSize * tagSize;

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
      style={{top: position.y, left: position.x, height}}
      className={wrapperStyles}
      tabIndex={1}
      onFocus={focus}
      onBlur={blur}
      onMouseDown={startMoving}
      onMouseMove={move}
      onMouseUp={stopMoving}
      onMouseLeave={stopMoving}>
        <div
          className={styles.scale}
          onMouseDown={e => e.stopPropagation()}
          draggable={true} />
        <div
          className={styles.rotate}
          draggable={true}
          onMouseDown={e => e.stopPropagation()}>
          <RotateIcon />
        </div>
        <Content />
    </div>
  )
});

export default EditableItem;
