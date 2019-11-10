import React from 'react';
import styles from './Legend.module.scss';
import { Typography } from '@material-ui/core';
import AddLegend from './EditLegendText/EditLegendText';
import { Deck } from '../../../../model/types/Deck';
import EditLegend from './Edit/EditLegend';
import { Legend as LegendT, LegendSourceTypeEnum } from '../../../../model/types/Legend';

type Props = {
  deck: Deck,
  legend: LegendT
};

const Legend: React.FC<Props> = ({deck, legend}) => {
  const legendImages = (legend.cards || []).flatMap(items => items.filter(item => item.legendSourceType === LegendSourceTypeEnum.image));
  const leftImages = deck.images.filter(image => !legendImages.find(legendImage => legendImage.imageId === image.id));

  if (leftImages.length) {
    return (
      <div className={styles.container}>
        <Typography variant='h5' gutterBottom>Add legend to every image(left {leftImages.length})</Typography>
        <AddLegend image={leftImages[0]} legendId={legend.id} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h5' gutterBottom>Edit legend {legend.name}</Typography>
      <EditLegend legend={legend} images={deck.images}/>
    </div>
  );

  return null;
};

export default Legend;
