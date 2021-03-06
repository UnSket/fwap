import React from 'react';
import styles from './Carousel.module.scss';

type Props = {
  imgArray: Array<string>,
  isScrolling?: boolean
};
type State = {
  currentImg: number,
  nextImg: number,
  prevImg: number,
  updateIntervalID?: any
}

class Carousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentImg:  0,
      nextImg: 1,
      prevImg: props.imgArray.length - 1
    };
  }

  forceUpdateImage = () => {
    if (this.state.updateIntervalID) {
      clearInterval(this.state.updateIntervalID);
    }
    const intervalID = setInterval(() => {
      this.updateImages();
    }, 2000);
    this.setState(() => ({ ...this.state, updateIntervalID: intervalID }));
    this.updateImages();
  };

  updateImages = () => {
    const {nextImg, currentImg} = this.state;
    const nextIndex = nextImg + 1 === this.props.imgArray.length ? 0 : nextImg + 1;

    this.setState(() => ({
      currentImg: nextImg,
      nextImg: nextIndex,
      prevImg: currentImg
    }));

  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isScrolling && !this.props.isScrolling) {
      clearInterval(this.state.updateIntervalID);
    }
    if (!prevProps.isScrolling && this.props.isScrolling) {
      const intervalID = setInterval(() => {
        this.updateImages();
      }, 2000);
      this.setState(() => ({ ...this.state, updateIntervalID: intervalID }));
      this.updateImages();
    }
  };

  componentWillUnmount(): void {
    if (this.state.updateIntervalID) {
      clearInterval(this.state.updateIntervalID);
    }
  }

  render() {
    const {currentImg, nextImg, prevImg} = this.state;
    const {imgArray} = this.props;
    if (imgArray.length < 3) {
      return (
        <div className={styles.noImageWrapper}>
          <span>Not enough images for preview</span>
        </div>
      );
    }
    return (
      <div className={styles.container} onClick={this.forceUpdateImage}>
        <img key={prevImg} className={styles.prevImg} src={imgArray[prevImg]} alt='' />
        <img key={currentImg} className={styles.currentImg} src={imgArray[currentImg]} alt='' />
        <img key={nextImg} className={styles.nextImg} src={imgArray[nextImg]} alt='' />
      </div>
  )}
}

export default Carousel;
