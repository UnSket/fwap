import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import { EditableImageT } from '../../../../model/types/Card';
import { formatCardNumber, getUrlFromImgKey } from '../../../utils/utils';

const PT_FACTOR = 0.75;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
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
    textOverflow: 'hidden',
    marginLeft: 30,
    marginRight: 15
  },
  secondCardInRow: {
    marginLeft: 15,
    marginRight: 30
  },
  cardNumberWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 156 * PT_FACTOR,
    width: 336 * PT_FACTOR,
  },
  cardNumber: {
    fontSize: 12,
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
  items: Array<Array<EditableImageT>>;
  rendered: () => void;
  isNumerated: boolean
};

const Cards:React.FC<Props> = ({items, rendered, isNumerated}) => (
  <Document onRender={rendered}>
    <Page size="A4" style={styles.page} wrap>
      {items.map((card, index) => {
        const cardStyle = index % 2 > 0 ? [styles.card, styles.secondCardInRow] : styles.card;
        return (
          <View style={cardStyle} wrap={false} key={index}>
            {card.map((item, index) => {
              const styles = getItemStyles(item);
              return (
                <View style={styles.item} key={index}>
                  <Image src={getUrlFromImgKey(item.imageUrl)} style={styles.image} />
                </View>
              )
            })}
            {isNumerated && (
              <View style={styles.cardNumberWrapper}>
                <Text style={styles.cardNumber}>{formatCardNumber(index + 1)}</Text>
              </View>
            )}
          </View>
      )})}
    </Page>
  </Document>
);

export default Cards;
