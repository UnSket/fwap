import React, { useEffect, useState } from 'react';
import { Deck } from '../../../../model/types/Deck';
import styles from '../Export.module.scss';
import { Link as MatLink, CircularProgress, Typography } from '@material-ui/core';
import { getUrlFromImgKey, useFlag } from '../../../utils/utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { EditDeckPages, ROUTE_PATHS } from '../../../../model/constans/routePaths';
import BacksidePDF from '../PDFGenerator/Backside';
import generateBacksideCardImage from '../generateImages/backside';


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

  const getImage = async function() {
    const image = await generateBacksideCardImage(getUrlFromImgKey(deck.backsideKey!));
    const link = document.createElement('a');
    link.href = image;
    link.download = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const BacksideLink:React.FC = () => {
    if (!deck.backsideKey) {
      return <p className={styles.notification}>You should choose backside in tab{' '}
        <Link to={ROUTE_PATHS.editDeck.withID(deck.id, EditDeckPages.settings)}>"SETTINGS"</Link>
        {' '}to export backside!</p>
    }

    if (!backsideDocument) {
      return null;
    }
    return (
      <>
        <PDFViewer className={styles.pdf}>
          {backsideDocument}
        </PDFViewer>
        <div className={styles.links}>
          <PDFDownloadLink document={backsideDocument}>Download PDF</PDFDownloadLink>
          <a onClick={getImage}>Download image</a>
        </div>
      </>
    )
  };

  return (
    <div className={styles.container}>
      {backsideRendering && <div className={styles.spinner}><CircularProgress size={50} /></div>}
      <Typography variant='h4' gutterBottom>Backside</Typography>
      <BacksideLink />
    </div>
  );
};

export default Backside;
