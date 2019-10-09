import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { EditDeckPages, ROUTE_PATHS } from '../../../model/constans/routePaths';
import Backside from './PDFGenerator/Backside';


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

const useFlag = (): [boolean, () => void, () => void] => {
  const [flag, setFlag] = useState<boolean>(false);

  const setTrue = () => setFlag(true);
  const setFalse = () => {
    setTimeout(() => setFlag(false), 1000);
  };
  return [flag, setFalse, setTrue];
};

const Export: React.FC<Props> = ({deck, cardsState, legendState, getDeckCardsRequest, getDeckLegendRequest}) => {
  // hack to show loader
  const [cardsDocument, setCardsDocument] = useState<any>(null);
  const [legendDocument, setLegendDocument] = useState<any>(null);
  const [backsideDocument, setBacksideDocument] = useState<any>(null);
  const [cardsRendering, cardsRendered, startCardsRendering] = useFlag();
  const [legendRendering, legendRendered, startLegendRendering] = useFlag();
  const [backsideRendering, backsideRendered, startBacksideRendering] = useFlag();

  useEffect(() => {
    if (!cardsRendering && !cardsDocument && deck.cards) {
      startCardsRendering();
      const document = <Cards items={deck.cards} rendered={cardsRendered}/>;
      setCardsDocument(document);
    }
  }, [deck.cards]);

  useEffect(() => {
    if (!legendRendering && !legendDocument && deck.legend) {
      startLegendRendering();
      const document = <Legend items={deck.legend.cards} fontSize={deck.legend.textSize} rendered={legendRendered} />;
      setLegendDocument(document);
    }
  }, [deck.legend]);

  useEffect(() => {
    if (!backsideRendering && !backsideDocument && deck.backsideKey) {
      startBacksideRendering();
      const document = <Backside backside={deck.backsideKey} rendered={backsideRendered}/>;
      setBacksideDocument(document);
    }
  }, [deck.backsideKey]);

  useEffect(() => {
    if (!deck.cards && !cardsState.loading && !cardsState.error && !deck.imagesRequired) {
      getDeckCardsRequest(deck.id);
    }
    const needToMakeLegend = deck.images.some(image => !image.text);
    if (!deck.legend && !legendState.error && !legendState.loading && !needToMakeLegend && !deck.imagesRequired) {
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
    if (!cardsDocument) {
      return null;
    }

    return (
      <>
        <PDFDownloadLink document={cardsDocument}>Download PDF</PDFDownloadLink>
        <PDFViewer className={styles.pdf}>
          {cardsDocument}
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
      return <p className={styles.notification}>Make legend in tab
        <Link to={ROUTE_PATHS.editDeck.withID(deck.id, EditDeckPages.legend)}> "LEGEND" </Link>
      </p>
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
    if (!legendDocument) {
      return null;
    }
    return (
      <>
        <PDFDownloadLink document={legendDocument}>Download PDF</PDFDownloadLink>
        <PDFViewer className={styles.pdf}>
          {legendDocument}
        </PDFViewer>
      </>
    )
  };

  const BacksideLink:React.FC = () => {
    if (!deck.backsideKey) {
      return <p className={styles.notification}>You should choose backside in tab
        <Link to={ROUTE_PATHS.editDeck.withID(deck.id, EditDeckPages.settings)}> "SETTINGS" </Link>
        to export backside!</p>
    }

    if (!backsideDocument) {
      return null;
    }
    return (
      <>
        <PDFDownloadLink document={backsideDocument}>Download PDF</PDFDownloadLink>
        <PDFViewer className={styles.pdf}>
          {backsideDocument}
        </PDFViewer>
      </>
    )
  };

  const isLoading = cardsRendering || legendRendering || backsideRendering;

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      <div className={styles.block}>
        <Typography variant='h5' gutterBottom>Cards</Typography>
        <CardsLink />
      </div>
      <div className={styles.block}>
        <Typography variant='h5' gutterBottom>Legend</Typography>
        <LegendLink />
      </div>
      <div className={styles.block}>
        <Typography variant='h5' gutterBottom>Backside</Typography>
        <BacksideLink />
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
