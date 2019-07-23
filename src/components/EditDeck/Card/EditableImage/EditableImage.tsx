import React, { useRef, useState } from 'react';
import { EditableImageT } from '../../../../model/types/Card';
import styles from './EditableImage.module.scss';
import { useClasses } from '../../../../modules/utils/tools';
import RotateIcon from '@material-ui/icons/Replay';

interface Props extends EditableImageT {
  image: string,
  setCardActive: (isActive: boolean) => void
}

type Point = {
  x: number,
  y: number
};

const initSize = 60;
const degreeToRadK = Math.PI / 180;

const EditableImage: React.FC<Props> = ({image, angle: initAngle, scale: initScale, positionX: startX, positionY: startY, setCardActive}) => {
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(initScale);
  const [angle, setAngle] = useState(initAngle);
  const [position, setPosition] = useState<Point>({x: startX, y: startY});
  const [centerPoint, setCenter] = useState<Point>({x: 0, y: 0});
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const object = useRef<HTMLDivElement>(null);
  const wrapperStyles = useClasses(styles.wrapper, active ? styles.active : '');

  const height = initSize * scale;

  const calculateXYWithRotate = (x: number, y: number) => {
    const sin = Math.sin((360 - angle) * degreeToRadK);
    const cos = Math.cos((360 - angle) * degreeToRadK);
    const xWithRotate = x * cos - y * sin;
    const yWithRotate = x * sin + y * cos;
    return {x: xWithRotate, y: yWithRotate};
  };

  const focus = (e: React.FocusEvent) => {
    setActive(true);
    setCardActive(true);
  };
  const blur = () => {
    setActive(false);
    setCardActive(false);

  };

  const startResizing = (e: React.DragEvent) => {
    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);
    setStartPoint({x, y});
  };
  const resizing = (e: React.DragEvent) => {
    if (e.clientY === 0 && e.clientX === 0) return;

    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);
    const changedY = startPoint.y - y;
    const newSize = Math.abs(initSize * scale + changedY);
    const newScale = newSize / initSize;

    setScale(newScale);
    setStartPoint({x, y});

  };

  const startRotate = (e: React.DragEvent) => {
    if (object && object.current && object.current.parentElement) {
      const objectX = object.current.parentElement.offsetLeft + position.x;
      const objectY = object.current.parentElement.offsetTop + position.y;
      const width = object.current.offsetWidth;
      const height = object.current.offsetHeight;
      setCenter({x: objectX + width / 2, y: objectY + height / 2});
    }
  };
  const rotate = (e: React.DragEvent) => {
    if (e.clientY === 0 && e.clientX === 0) return;
    const changedX = -(centerPoint.x - e.clientX);
    const changedY = (centerPoint.y - e.clientY);
    const newAngle = Math.atan2(changedX, changedY) / degreeToRadK;
    setAngle(newAngle);
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
      style={{top: position.y, left: position.x, transform: `rotate(${angle}deg)`, height}}
      className={wrapperStyles}
      tabIndex={1}
      onFocus={focus}
      onBlur={blur}
      ref={object}
      onMouseDown={startMoving}
      onMouseMove={move}
      onMouseUp={stopMoving}
      onMouseLeave={stopMoving}>
        <div
          className={styles.scale}
          onDragStart={startResizing}
          onDrag={resizing}
          onMouseDown={e => e.stopPropagation()}
          draggable={true} />
        <div
          className={styles.rotate}
          onDragStart={startRotate}
          onDrag={rotate}
          draggable={true}
          onMouseDown={e => e.stopPropagation()}>
          <RotateIcon />
        </div>
        <img src={image} alt='' draggable={false}/>
    </div>
  )
};

export default EditableImage;