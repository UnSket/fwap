import React, { useEffect, useRef, useState } from 'react';
import { EditableImageT } from '../../../../../model/types/Card';
import styles from './EditableImage.module.scss';
import { getUrlFromImgKey, useClasses } from '../../../../utils/utils';
import RotateIcon from '@material-ui/icons/Replay';

interface Props {
  setCardActive: (isActive: boolean) => void,
  updateImage: (image: EditableImageT) => void,
  editableImage: EditableImageT
}

type Point = {
  x: number,
  y: number
};

const initSize = 102;
const degreeToRadK = Math.PI / 180;

const EditableImage: React.FC<Props> = React.memo(({editableImage, setCardActive, updateImage}) => {
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(editableImage.scaleFactor / 102);
  const [angle, setAngle] = useState(editableImage.rotationAngle);
  const [position, setPosition] = useState<Point>({x: editableImage.positionX, y: editableImage.positionY});
  const [centerPoint, setCenter] = useState<Point>({x: 0, y: 0});
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperStyles = useClasses(styles.wrapper, active ? styles.active : '');

  useEffect(() => {
    setPosition({x: editableImage.positionX, y: editableImage.positionY});
    setAngle(editableImage.rotationAngle);
    setScale(editableImage.scaleFactor / 102);
  }, [editableImage]);

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
    updateImage({
      ...editableImage,
      positionX: position.x,
      positionY: position.y,
      rotationAngle: angle,
      scaleFactor: scale * 103
    })
  };

  const startResizing = (e: React.DragEvent) => {
    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);
    setStartPoint({x, y});
  };
  const resizing = (e: any) => {
    if ((e.clientY === 0 && e.clientX === 0) || (e.screenX === 0 && e.screenY === 0)) return;

    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);
    const changedY = startPoint.y - y;
    const newSize = Math.abs(initSize * scale + changedY);
    const newScale = newSize / initSize;

    setScale(newScale);
    const print: any = {};
    for (const key in e) {
      print[key] = e[key];
    }
    setStartPoint({x, y});

  };

  const startRotate = (e: React.DragEvent) => {
    if (wrapperRef && wrapperRef.current) {
      const boundingRect = wrapperRef.current.getBoundingClientRect();
      const centerX = boundingRect.left + boundingRect.width / 2;
      const centerY = boundingRect.top + boundingRect.height / 2;
      setCenter({x: centerX, y: centerY});
    }
  };
  const rotate = (e: React.DragEvent) => {
    if ((e.clientY === 0 && e.clientX === 0) || (e.screenX === 0 && e.screenY === 0)) return;
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
      style={{top: position.y, left: position.x, transform: `rotate(${angle}deg)`, height, width: height, backgroundImage: `url(${getUrlFromImgKey(editableImage.imageUrl)})`}}
      className={wrapperStyles}
      tabIndex={1}
      onFocus={focus}
      onBlur={blur}
      ref={wrapperRef}
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
    </div>
  )
});

export default EditableImage;
