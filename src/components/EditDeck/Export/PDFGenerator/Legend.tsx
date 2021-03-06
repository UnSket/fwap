import React from 'react';
import { Document, Image, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { formatCardNumber, getUrlFromImgKey } from '../../../utils/utils';
import { EditableLegendItemT, LegendSourceTypeEnum } from '../../../../model/types/Legend';

const PT_FACTOR = 0.75;
const IMAGE_FACTOR = 3;

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
    top: 295 * PT_FACTOR,
    width: 336 * PT_FACTOR,
  },
  cardNumber: {
    fontSize: 12,
  }
});

const getItemImageStyles = (item: EditableLegendItemT, fontSize: number) => StyleSheet.create({
  item: {
    position: 'absolute',
    left: item.positionX * PT_FACTOR,
    top: item.positionY * PT_FACTOR,
    width: fontSize * PT_FACTOR * IMAGE_FACTOR,
    height: fontSize * PT_FACTOR * IMAGE_FACTOR,
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  }
});

const getItemTextStyles = (item: EditableLegendItemT, fontSize: number) => StyleSheet.create({
  item: {
    position: 'absolute',
    left: item.positionX * PT_FACTOR,
    top: item.positionY * PT_FACTOR,
  },
  text: {
    fontSize: fontSize - 4,
    fontWeight: 'normal'
  },
});

type Props = {
  items: Array<Array<EditableLegendItemT>>,
  fontSize: number,
  rendered: () => void,
  isNumerated: boolean
};

const Cards:React.FC<Props> = ({items, fontSize, rendered, isNumerated}) => (
  <Document onRender={rendered}>
    <Page size="A4" style={styles.page} wrap>
      {items.map((card, index) => {
        const cardStyle = index % 2 > 0 ? [styles.card, styles.secondCardInRow] : styles.card;
        return (
          <View style={cardStyle} wrap={false} key={index}>
            {card.map((item, index) => {
              if (item.legendSourceType === LegendSourceTypeEnum.image) {
                const styles = getItemImageStyles(item, fontSize);
                return (
                  <View style={styles.item} key={index}>
                    <Image src={getUrlFromImgKey(item.source)} style={styles.image}/>
                  </View>
                )
              }
              const styles = getItemTextStyles(item, fontSize);
              return (
                <View style={styles.item} key={index}>
                  <Text style={styles.text}>{item.source}</Text>
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
