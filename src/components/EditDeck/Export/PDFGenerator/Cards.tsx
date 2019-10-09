import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import { EditableImageT } from '../../../../model/types/Card';
import { getUrlFromImgKey } from '../../../utils/utils';

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
    border: 1,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    position: 'relative',
    textOverflow: 'hidden'
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
  items: Array<Array<EditableImageT>>
  rendered: () => void
};

const Cards:React.FC<Props> = ({items, rendered}) => (
  <Document onRender={rendered}>
    <Page size="A4" style={styles.page} wrap>
      {items.map((card, index) => (
      <View style={styles.card} wrap={false} key={index}>
        {card.map((item, index) => {
          const styles = getItemStyles(item);
          return (
            <View style={styles.item} key={index}>
              <Image src={getUrlFromImgKey(item.imageUrl)} style={styles.image} />
            </View>
          )
        })}
      </View>))}
    </Page>
  </Document>
);

export default Cards;
