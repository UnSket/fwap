import React, { useState } from 'react';
import styles from './Card.module.scss';
import logo from '../../Header/logo.svg';
import EditableImage from './EditableImage/EditableImage';
import { useClasses } from '../../../modules/utils/tools';

const mockCard = [
  {
    image: logo,
    scale: 1,
    angle: 0,
    positionX: 30,
    positionY: 30
  },
  {
    image: logo,
    scale: 0.7,
    angle: 30,
    positionX: 170,
    positionY: 20
  },
  {
    image: logo,
    scale: 1.2,
    angle: 200,
    positionX: 30,
    positionY: 170
  },
];

const Card: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const cardClasses = useClasses(styles.card, isActive ? styles.active : '');
  return (
    <div className={cardClasses}>
      {mockCard.map((card, i) => (
        <EditableImage {...card} key={i} setCardActive={setActive}/>
      ))}
    </div>
  )
};

export default Card;