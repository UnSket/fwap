
export const imageLoadAsync = (imageUrl: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>(resolve => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      resolve(image);
    }
  })
};

export const canvasToBlobAsync = (canvas: HTMLCanvasElement) => {
  return new Promise(resolve => {
    canvas.toBlob((blob) => resolve(blob!));
  })
};

export const containImageInBox = (image: HTMLImageElement, boxSize: number) => {
  const {width, height} = image;

  if (width > height) {
    const scaleFactor = boxSize / width;
    const dHeight = height * scaleFactor;

    const verticalMargins = (boxSize - dHeight) / 2;

    return {
      dWidth: boxSize,
      dHeight,
      verticalMargins
    }
  } else {
    const scaleFactor = boxSize / height;
    const dWidth = width * scaleFactor;

    const horizontalMargins = (boxSize - dWidth) / 2;

    return {
      dWidth,
      dHeight: boxSize,
      horizontalMargins
    }
  }
};
