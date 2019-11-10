import { EditableLegendItemT } from '../../model/types/Legend';
import cloneDeep from 'lodash/cloneDeep';

const DECK_DIAMETER = 336;
const DECK_RADIUS = 336 / 2;
const MIN_OFFSET = 15;
const TEXT_TOP_OFFSET = 10;
const TEXT_SIZE_FACTOR = 7;


const recalculate = (fontSize: number, items: Array<EditableLegendItemT>): Array<Array<EditableLegendItemT>> => {
  const sourceItems = cloneDeep(items);
  let finalItems: Array<Array<EditableLegendItemT>> = [];

  const imageSize = fontSize * 3;
  const offset = imageSize / 2;

  const height = (DECK_DIAMETER - offset * 2);
  const pairHeight = imageSize + TEXT_TOP_OFFSET + fontSize;
  const linesCount =  Math.floor(height / (pairHeight + MIN_OFFSET));
  const verticalOffset = (height - (pairHeight * linesCount)) / (linesCount + 1);

  const linePositioning = (sourceItems: Array<EditableLegendItemT>, lineNumber: number, cardNumber: number) => {
    const positionY = offset + verticalOffset + (lineNumber * (pairHeight + verticalOffset));
    const bottomY = positionY + pairHeight;
    let itemsCount = 0;
    let totalItemsWidth = 0;

    let topOffset;
    if (Math.abs(DECK_RADIUS - positionY) > Math.abs(DECK_RADIUS - bottomY)) {
      topOffset = positionY;
    } else {
      topOffset = positionY + pairHeight;
    }

    const totalWidth = Math.sqrt(topOffset * (DECK_DIAMETER - topOffset)) * 2 - 2 * MIN_OFFSET;
    const itemsParams = [];

    for (let textIndex = 1; sourceItems.length > itemsCount * 2; textIndex = textIndex + 2) {
      const textWidth = sourceItems[textIndex]!.source.length * TEXT_SIZE_FACTOR;
      const itemWidth = Math.max(textWidth, imageSize) + MIN_OFFSET;
      let textOffset = 0;
      let imageOffset = 0;
      if (textWidth > imageSize) {
        imageOffset = (textWidth - imageSize) / 2;
      } else {
        textOffset = (imageSize - textWidth) / 2;
      }
      if (totalItemsWidth + itemWidth > totalWidth) {
        break;
      }
      totalItemsWidth += itemWidth;
      itemsCount++;
      itemsParams.push({itemWidth, textOffset, imageOffset});
    }

    let horizontalOffset = itemsCount > 1 ? Math.floor((totalWidth - totalItemsWidth) / (itemsCount - 1)) : 0;
    if (itemsCount < 3 && horizontalOffset && horizontalOffset > itemsParams[0].itemWidth) {
      horizontalOffset = MIN_OFFSET;
    }
    const offsetLeft = (DECK_DIAMETER - totalWidth) / 2;
    const lineItems: Array<EditableLegendItemT> = [];
    for (let itemIndex = 0; itemIndex < itemsCount * 2; itemIndex = itemIndex + 2) {
      const {imageOffset, textOffset} = itemsParams[itemIndex / 2];
      const prevItems = itemsParams.slice(0, itemIndex / 2);
      const prevItemsWidth = prevItems.length && prevItems.reduce((a, b) => (a + b.itemWidth), 0);
      const positionX = offsetLeft + (prevItemsWidth + horizontalOffset * (itemIndex / 2));
      const itemImage = sourceItems[itemIndex];
      lineItems.push({...itemImage, positionY, positionX: positionX + imageOffset, cardNumber});
      const itemText = sourceItems[itemIndex + 1];
      lineItems.push({...itemText, positionY: positionY + imageSize + TEXT_TOP_OFFSET, positionX: positionX + textOffset, cardNumber});
    }
    return lineItems;
  };

  for (let cardNumber = 0; finalItems.flat().length < sourceItems.length; cardNumber++) {
    finalItems[cardNumber] = [];
    for (let lineNumber = 0; lineNumber < linesCount; lineNumber++) {
      const source = sourceItems.slice(finalItems.flat().length);
      if (!source.length) {
        break;
      }
      const lineItems = linePositioning(source, lineNumber, cardNumber);
      finalItems[cardNumber] = [...finalItems[cardNumber], ...lineItems];
    }
  }

  return finalItems;
};

export default recalculate;
