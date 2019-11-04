import React from 'react';
import { Page, Document, StyleSheet, Image, View } from '@react-pdf/renderer';
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
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  },
});

type Props = {
  backside: string,
  rendered: () => void
};

const Backside:React.FC<Props> = ({backside, rendered}) => {

  return (
    <Document onRender={rendered}>
      <Page size="A4" style={styles.page} wrap>
        {times(6, () => (
          <View style={styles.card}>
            <Image src={getUrlFromImgKey(backside)} style={styles.image} />
          </View>
        ))}
      </Page>
    </Document>
  )
};

export default Backside;
