import React, { useEffect, useState } from 'react';
import { Deck } from '../../../../model/types/Deck';
import styles from '../Export.module.scss';
import { CircularProgress, Typography } from '@material-ui/core';
import {cardsState} from '../../../../modules/userDecks/selectors';
import {getDeckCardsRequest} from '../../../../modules/userDecks/actions';
import { StoreState } from '../../../../modules/types';
import { connect } from 'react-redux';
import { classes, useFlag } from '../../../utils/utils';
import CardsPDF from '../PDFGenerator/Cards';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import downloadCardImages from '../generateImages/cards';


type Props = {
  deck: Deck,
  cardsState: {
    loading: boolean,
    error?: string | null
  }
  getDeckCardsRequest: (deckId: string) => void,
}

const Cards: React.FC<Props> = ({deck, cardsState, getDeckCardsRequest}) => {
  // hack to show loader
  const [cardsDocument, setCardsDocument] = useState<any>(null);
  const [cardsRendering, cardsRendered, startCardsRendering] = useFlag();

  useEffect(() => {
    if (!cardsRendering && !cardsDocument && deck.cards) {
      startCardsRendering();
      const document = <CardsPDF items={deck.cards} rendered={cardsRendered} isNumerated={deck.isNumerated}/>;
      setCardsDocument(document);
    }
  }, [deck.cards]);


  useEffect(() => {
    if (!deck.cards && !cardsState.loading && !cardsState.error && !deck.imagesRequired) {
      getDeckCardsRequest(deck.id);
    }
  });

  async function downloadImages() {
    await downloadCardImages(deck.cards!, deck.name, deck.isNumerated);
  }

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
    if (!cardsDocument) {
      return null;
    }

    return (
      <>
        <PDFViewer className={styles.pdf}>
          {cardsDocument}
        </PDFViewer>
        <div className={styles.links}>
          <PDFDownloadLink document={cardsDocument}>Download PDF</PDFDownloadLink>
          <a onClick={downloadImages}>Download images</a>
        </div>
        </>
    )
  };

  return (
    <div className={styles.container}>
      {cardsRendering && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      <Typography variant='h4' gutterBottom>Cards</Typography>
      <CardsLink />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  cardsState: cardsState(state),
});

const mapDispatchToProps = {
  getDeckCardsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
