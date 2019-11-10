import React, { useEffect, useState } from 'react';
import { getDeckLegendsRequest } from '../../../modules/legends/actions'
import { deckLegends } from '../../../modules/legends/selectors'
import { Deck } from '../../../model/types/Deck';
import { State as LegendState } from '../../../modules/legends/types';
import { StoreState } from '../../../modules/types';
import { connect } from 'react-redux';
import CreateLegend from './CreteLegend/CreateLegend';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import styles from './Legends.module.scss';
import { Legend as LegendT } from '../../../model/types/Legend';
import { classes } from '../../utils/utils';
import AddIcon from '@material-ui/icons/Add';
import Legend from './EditLegend/Legend';
import max from 'lodash/max';

type Props = {
  deck: Deck,
  deckLegends: LegendState,
  getDeckLegendsRequest: (deckId: string) => void
}

const Legends: React.FC<Props> = ({deck, deckLegends, getDeckLegendsRequest}) => {
  const [isCreateLegendModalOpen, setIsCreateLegendModalOpen] = useState<boolean>(false);
  const close = () => setIsCreateLegendModalOpen(false);
  const open = () => setIsCreateLegendModalOpen(true);

  const [currentLegendId, setCurrentLegendId] = useState<string>('');
  const currentLegendSelectChange = (e: React.ChangeEvent<{name?: string, value: any}>) => {
    setCurrentLegendId(e.target.value);
  };

  useEffect(() => {
    getDeckLegendsRequest(deck.id)
  }, []);

  useEffect(() => {
    if (!currentLegendId) {
      selectLastLegend();
    }
  }, [deckLegends.legendsById]);

  const selectLastLegend = () => {
    const legendsIds = Object.keys(deckLegends.legendsById);
    setCurrentLegendId(max(legendsIds) || '');
  };

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

  const currentLegend = deckLegends.legendsById[currentLegendId];

  return (
    <>
      <Typography variant='h4' gutterBottom>Legends</Typography>
      {deckLegends.loading && <div className={styles.loading}><CircularProgress size={50} /></div>}
      <div className={styles.controls}>
        {legends.length ?
          <FormControl className={styles.select} >
            <InputLabel htmlFor="age-helper">Current legend</InputLabel>
            <Select
              value={currentLegendId}
              onChange={currentLegendSelectChange}
            >
              {legends.map((legend, index) => <MenuItem value={legend.id} key={index}>{legend.name}</MenuItem>)}
            </Select>
          </FormControl>
          :
        <span>You have not created legends.</span>
        }
        <Button color='primary' variant='contained' onClick={open}><AddIcon /></Button>
      </div>
      {currentLegend && <Legend legend={currentLegend} deck={deck} />}
      <CreateLegend loading={deckLegends.loading} selectLastLegend={selectLastLegend} isOpen={isCreateLegendModalOpen} deckId={deck.id} close={close} />
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
