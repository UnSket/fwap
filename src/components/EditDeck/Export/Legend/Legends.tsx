import React, { useEffect, useState } from 'react';
import { getDeckLegendsRequest } from '../../../../modules/legends/actions'
import { deckLegends } from '../../../../modules/legends/selectors'
import { Deck } from '../../../../model/types/Deck';
import { State as LegendState } from '../../../../modules/legends/types';
import { StoreState } from '../../../../modules/types';
import { connect } from 'react-redux';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import styles from '../Export.module.scss';
import legendStyles from './Legends.module.scss';
import { classes } from '../../../utils/utils';
import Legend from './Legend';
import { EditDeckPages, ROUTE_PATHS } from '../../../../model/constans/routePaths';
import { Link } from 'react-router-dom';
import { LegendSourceTypeEnum } from '../../../../model/types/Legend';

type Props = {
  deck: Deck,
  deckLegends: LegendState,
  getDeckLegendsRequest: (deckId: string) => void
}

const Legends: React.FC<Props> = ({deck, deckLegends, getDeckLegendsRequest}) => {

  const [currentLegendId, setCurrentLegendId] = useState<string>('');
  const currentLegendSelectChange = (e: React.ChangeEvent<{name?: string, value: any}>) => {
    setCurrentLegendId(e.target.value);
  };

  useEffect(() => {
    getDeckLegendsRequest(deck.id)
  }, []);

  const legends = Object.values(deckLegends.legendsById);

  if (deck.imagesRequired) {
    return (
      <>
        <Typography variant='h4' gutterBottom>Legends</Typography>
        <p className={styles.notification}>You should upload {deck.imagesRequired} more files to create legend!</p>
      </>
    )
  }


  if (deckLegends.error) {
    return <p className={classes(styles.error, styles.notification)}>{deckLegends.error}</p>
  }


  const getSelectedLegend = () => {
    if (!legends.length) {
      return <p className={styles.notification}>You haven't created legends. Create it in
        <Link to={ROUTE_PATHS.editDeck.withID(deck.id, EditDeckPages.legend)}>"Editing -> Legend"</Link> section</p>
    }

    if (!currentLegendId) {
      return null;
    }

    const currentLegend = deckLegends.legendsById[currentLegendId];

    const legendImages = (currentLegend.cards || []).flatMap(items => items.filter(item => item.legendSourceType === LegendSourceTypeEnum.image));
    const leftImages = deck.images.filter(image => !legendImages.find(legendImage => legendImage.imageId === image.id));
    if (leftImages.length) {
      return (
        <p className={styles.notification}>You should name {leftImages.length} more images for this legend.
          Go to <Link to={ROUTE_PATHS.editDeck.withID(deck.id, EditDeckPages.legend)}>"Editing -> Legend"</Link>
          {' '}section and select <b>{currentLegend.name}</b> legend
        </p>
      )
    }

    return <Legend legend={currentLegend} />;
  };

  return (
    <>
      <Typography variant='h4' gutterBottom>Legends</Typography>
      {deckLegends.loading && <div className={styles.loading}><CircularProgress size={50} /></div>}
      {legends.length &&
        <div className={legendStyles.selectContainer}>
          <FormControl className={legendStyles.select} >
            <InputLabel htmlFor="age-helper">Select legend</InputLabel>
            <Select
              value={currentLegendId}
              onChange={currentLegendSelectChange}
            >
              {legends.map((legend, index) => <MenuItem value={legend.id} key={index}>{legend.name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      }
      {getSelectedLegend()}
    </>
  )
};

const mapStateToProps = (state: StoreState) => ({
  deckLegends: deckLegends(state),
});

const mapDispatchToProps = {
  getDeckLegendsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Legends);
