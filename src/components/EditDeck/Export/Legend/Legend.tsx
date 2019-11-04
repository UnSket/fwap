import React, { useEffect, useState } from 'react';
import { Deck } from '../../../../model/types/Deck';
import styles from '../Export.module.scss';
import { CircularProgress, Typography } from '@material-ui/core';
import {legendState} from '../../../../modules/userDecks/selectors';
import {getDeckLegendRequest} from '../../../../modules/userDecks/actions';
import { StoreState } from '../../../../modules/types';
import { connect } from 'react-redux';
import { classes, useFlag } from '../../../utils/utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LegendPDF from '../PDFGenerator/Legend';
import { Link } from 'react-router-dom';
import { EditDeckPages, ROUTE_PATHS } from '../../../../model/constans/routePaths';
import downloadLegendImages from '../generateImages/legend';


type Props = {
  deck: Deck,
  legendState: {
    loading: boolean,
    error?: string | null
  },
  getDeckLegendRequest: (deckId: string) => void
}

const Legend: React.FC<Props> = ({deck, legendState, getDeckLegendRequest}) => {
  // hack to show loader
  const [legendDocument, setLegendDocument] = useState<any>(null);
  const [legendRendering, legendRendered, startLegendRendering] = useFlag();

  useEffect(() => {
    if (!legendRendering && !legendDocument && deck.legend) {
      startLegendRendering();
      const document = <LegendPDF items={deck.legend.cards} fontSize={deck.legend.textSize} rendered={legendRendered} />;
      setLegendDocument(document);
    }
  }, [deck.legend]);

  useEffect(() => {
    const needToMakeLegend = deck.images.some(image => !image.text);
    if (!deck.legend && !legendState.error && !legendState.loading && !needToMakeLegend && !deck.imagesRequired) {
      getDeckLegendRequest(deck.id);
    }
  });

  async function downloadImages() {
    await downloadLegendImages(deck.legend!.cards, deck.legend!.textSize);
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
        <PDFViewer className={styles.pdf}>
          {legendDocument}
        </PDFViewer>
        <div className={styles.links}>
          <PDFDownloadLink document={legendDocument}>Download PDF</PDFDownloadLink>
          <a onClick={downloadImages}>Download images</a>
        </div>
      </>
    )
  };

  return (
    <div className={styles.container}>
      {legendRendering && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      <Typography variant='h4' gutterBottom>Legend</Typography>
      <LegendLink />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  legendState: legendState(state)
});

const mapDispatchToProps = {
  getDeckLegendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Legend);
