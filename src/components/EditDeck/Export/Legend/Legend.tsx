import React, { useEffect, useState } from 'react';
import styles from '../Export.module.scss';
import { CircularProgress } from '@material-ui/core';
import { useFlag } from '../../../utils/utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LegendPDF from '../PDFGenerator/Legend';
import downloadLegendImages from '../generateImages/legend';
import { Legend as LegendT } from '../../../../model/types/Legend';


type Props = {
  legend: LegendT
}

const Legend: React.FC<Props> = ({legend}) => {
  // hack to show loader
  const [legendDocument, setLegendDocument] = useState<any>(null);
  const [legendRendering, legendRendered, startLegendRendering] = useFlag();

  useEffect(() => {
      startLegendRendering();
      const document = <LegendPDF items={legend.cards} fontSize={legend.textSize} rendered={legendRendered} />;
      setLegendDocument(document);
  }, [legend]);

  async function downloadImages() {
    await downloadLegendImages(legend.cards, legend!.textSize);
  };

  const LegendLink:React.FC = () => {
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
      <LegendLink />
    </div>
  );
};

export default Legend;
