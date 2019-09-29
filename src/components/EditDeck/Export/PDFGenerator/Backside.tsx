import React from 'react';
import { Page, Document, StyleSheet, Image} from '@react-pdf/renderer';
import { EditableImageT } from '../../../../model/types/Card';
import { getUrlFromImgKey } from '../../../utils/utils';
import times from 'lodash/times';

const PT_FACTOR = 0.75;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    marginTop: 15,
    marginBottom: 15,
    width: 336 * PT_FACTOR,
    height: 336 * PT_FACTOR,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    border: 1,
    position: 'relative',
  }
});

const getItemStyles = (item: EditableImageT) => StyleSheet.create({
  item: {
    position: 'absolute',
    left: item.positionX * PT_FACTOR,
    top: item.positionY * PT_FACTOR,
    transform: `rotate(${item.rotationAngle}deg)`,
    width: item.scaleFactor * PT_FACTOR,
    height: item.scaleFactor * PT_FACTOR,
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  },
});

type Props = {
  backside: string
};

const Backside:React.FC<Props> = ({backside}) => {

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {times(6, () => <Image src={getUrlFromImgKey(backside)} style={styles.card} />)}
      </Page>
    </Document>
  )
};

export default Backside;
