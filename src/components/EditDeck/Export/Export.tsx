import React, { useEffect } from 'react';
import { Deck } from '../../../model/types/Deck';
import styles from './Export.module.scss';
import { CircularProgress, Typography } from '@material-ui/core';
import {cardsState, legendState} from '../../../modules/userDecks/selectors';
import {getDeckCardsRequest, getDeckLegendRequest} from '../../../modules/userDecks/actions';
import { StoreState } from '../../../modules/types';
import { connect } from 'react-redux';
import { classes } from '../../utils/utils';
import Cards from './PDFGenerator/Cards';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Legend from './PDFGenerator/Legend';


type Props = {
  deck: Deck,
  cardsState: {
    loading: boolean,
    error?: string | null
  }
  legendState: {
    loading: boolean,
    error?: string | null
  },
  getDeckCardsRequest: (deckId: string) => void,
  getDeckLegendRequest: (deckId: string) => void
}

const Export: React.FC<Props> = ({deck, cardsState, legendState, getDeckCardsRequest, getDeckLegendRequest}) => {
  useEffect(() => {
    if (!deck.cards && !cardsState.loading && !cardsState.error) {
      getDeckCardsRequest(deck.id);
    }
    if (!deck.legend && !legendState.error && !legendState.loading) {
      getDeckLegendRequest(deck.id);
    }
  });

  const CardsLink:React.FC = () => {
    if (deck.imagesRequired) {
      return <p className={styles.notification}>You should upload {deck.imagesRequired} more files to see upload cards!</p>
    }
    if (cardsState.error) {
      return <p className={classes(styles.notification, styles.error)}>{cardsState.error}</p>;
    }
    if (cardsState.loading || !deck.cards) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <>
        <PDFDownloadLink document={<Cards items={deck.cards} />}>Download PDF</PDFDownloadLink>
        <PDFViewer className={styles.pdf}>
          <Cards items={deck.cards}/>
        </PDFViewer>
      </>
    )
  };

  const LegendLink:React.FC = () => {
    if (deck.imagesRequired) {
      return <p className={styles.notification}>You should upload {deck.imagesRequired} more files to make legend!</p>
    }

    const needToMakeLegend = deck.images.some(image => !image.text);
    if (needToMakeLegend) {
      return <p className={styles.notification}>You need to make legend in tab "LEGEND"</p>
    }
    if (legendState.error) {
      return <p className={classes(styles.notification, styles.error)}>{legendState.error}</p>;
    }
    if (legendState.loading || !deck.legend) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <>
        <PDFDownloadLink document={<Legend items={deck.legend.cards} fontSize={deck.legend.textSize} />}>Download PDF</PDFDownloadLink>
        <PDFViewer className={styles.pdf}>
          <Legend items={deck.legend.cards} fontSize={deck.legend.textSize} />
        </PDFViewer>
      </>
    )
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <Typography variant='h5' gutterBottom>Cards</Typography>
        <CardsLink />
      </div>
      <div className={styles.block}>
        <Typography variant='h5' gutterBottom>Legend</Typography>
        <LegendLink />
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  cardsState: cardsState(state),
  legendState: legendState(state)
});

const mapDispatchToProps = {
  getDeckLegendRequest,
  getDeckCardsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Export);
