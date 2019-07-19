import React, { MutableRefObject, useRef, useState } from 'react';
import { EditableImageT } from '../../../model/types/Card';
import styles from './EditableImage.module.scss';
import { useClasses } from '../../../modules/utils/tools';
import RotateIcon from '@material-ui/icons/CropRotate';

interface Props extends EditableImageT {
  image: string,
}

type Point = {
  x: number,
  y: number
};

const initSize = 100;
const degreeToRadK = Math.PI / 180;

const EditableImage: React.FC<Props> = ({image, angle: initAngle, scale: initScale}) => {
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(initScale);
  const [angle, setAngle] = useState(initAngle);
  const [centerPoint, setCenter] = useState<Point>({x: 0, y: 0});
  const [startPoint, setStartPoint] = useState<Point>({x: 0, y: 0});
  const object = useRef<HTMLDivElement>(null);
  const wrapperStyles = useClasses(styles.imageWrapper, active ? styles.active : '');

  const height = initSize * scale;

  const calculateXYWithRotate = (x: number, y: number) => {
    const sin = Math.sin((360 - angle) * degreeToRadK);
    const cos = Math.cos((360 - angle) * degreeToRadK);
    const xWithRotate = x * cos - y * sin;
    const yWithRotate = x * sin + y * cos;
    console.log(sin, cos, yWithRotate);
    return {x: xWithRotate, y: yWithRotate};
  };

  const focus = (e: React.FocusEvent) => {
    setActive(true);
  };

  const startResizing = (e: React.DragEvent) => {
    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);
    setStartPoint({x, y});
  };

  const resizing = (e: React.DragEvent) => {
    if (e.clientY === 0 && e.clientX === 0) return;
    /*let changedX, changedY;

    if ((angle > 45 && angle < 135) || (angle > 225 && angle < 315)) {
      changedX = -(startPoint.x - e.clientX) * sin;
      changedY = (startPoint.y - e.clientY) * sin;
    } else {
      changedX = -(startPoint.x - e.clientX) * cos;
      changedY = (startPoint.y - e.clientY) * cos;
    }
    const maxChanged = Math.abs(changedX) > Math.abs(changedY) ? changedX : changedY;*/

    const {x, y} = calculateXYWithRotate(e.clientX, e.clientY);

    const changedY = startPoint.y - y;

    const newSize = Math.abs(initSize * scale + changedY);
    const newScale = newSize / initSize;

    setScale(newScale);
    setStartPoint({x, y});

  };

  const startRotate = () => {
    if (object && object.current) {
      const objectX = object.current.offsetLeft;
      const objectY = object.current.offsetTop;
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
  return (
    <div className={styles.wrapper} tabIndex={1} onFocus={focus} onBlur={() => setActive(false)}>
      <div className={wrapperStyles} style={{transform: `rotate(${angle}deg)`, height}} ref={object}>
        <div className={styles.scale} onDragStart={startResizing} onDrag={resizing} draggable={true} />
        <div className={styles.rotate} onDragStart={startRotate} onDrag={rotate} draggable={true} >
          <RotateIcon />
        </div>
        <img src={image} alt=''/>
      </div>
    </div>
  )
};

export default EditableImage;