import { EditableLegendItemT, LegendSourceTypeEnum } from '../../../../model/types/Legend';
import { getUrlFromImgKey } from '../../../utils/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { canvasToBlobAsync, containImageInBox, imageLoadAsync } from './utils';


async function generateLegendCardImage(items: Array<EditableLegendItemT>, fontSize: number) {
  const imageBoxSize = fontSize * 3;
  const canvas = document.createElement('canvas');
  canvas.width  = 336;
  canvas.height = 336;

  const ctx = canvas.getContext('2d')!;
  ctx.arc(168, 168, 168, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.clip();


  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.font = `${fontSize}px BlinkMacSystemFont`;
  for (const item of items) {
    if (item.legendSourceType === LegendSourceTypeEnum.text) {
      ctx.fillText(item.source, item.positionX, item.positionY + fontSize);
    } else {
      const image  = await imageLoadAsync(getUrlFromImgKey(item.source));
      const {dWidth, dHeight, verticalMargins = 0, horizontalMargins = 0} = containImageInBox(image, imageBoxSize);
      ctx.drawImage(image, item.positionX + horizontalMargins, item.positionY + verticalMargins, dWidth, dHeight);
    }
  }

  const blob = await canvasToBlobAsync(canvas) as Blob;
  return blob;
};

async function downloadLegendImages(cards: Array<Array<EditableLegendItemT>>, fontSize: number) {
  const imagesPromises: Array<Promise<Blob>> = [];

  // parallel resolving
  for (const items of cards) {
    const imagePromise = generateLegendCardImage(items, fontSize);
    imagesPromises.push(imagePromise);
  }
  const images = await Promise.all(imagesPromises);

  const zip = new JSZip();
  images.forEach((image: Blob, index: number) => {
    zip.file(`legend_${index+1}.png`, image, {base64: true});
  });
  const content = await zip.generateAsync({type:"blob"});
  saveAs(content, "legend.zip");
};

export default downloadLegendImages;
