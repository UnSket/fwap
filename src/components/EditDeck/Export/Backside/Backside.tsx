import React, { useEffect, useState } from 'react';
import { Deck } from '../../../../model/types/Deck';
import styles from './Backside.module.scss';
import { CircularProgress, Typography } from '@material-ui/core';
import { useFlag } from '../../../utils/utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { EditDeckPages, ROUTE_PATHS } from '../../../../model/constans/routePaths';
import BacksidePDF from '../PDFGenerator/Backside';


type Props = {
  deck: Deck,
}

const Backside: React.FC<Props> = ({deck}) => {
  // hack to show loader
  const [backsideDocument, setBacksideDocument] = useState<any>(null);
  const [backsideRendering, backsideRendered, startBacksideRendering] = useFlag();

  useEffect(() => {
    if (!backsideRendering && !backsideDocument && deck.backsideKey) {
      startBacksideRendering();
      const document = <BacksidePDF backside={deck.backsideKey} rendered={backsideRendered}/>;
      setBacksideDocument(document);
    }
  }, [deck.backsideKey]);

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

  return (
    <div className={styles.container}>
      {backsideRendering && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      <div className={styles.block}>
        <Typography variant='h4' gutterBottom>Backside</Typography>
        <BacksideLink />
      </div>
    </div>
  );
};

export default Backside;
