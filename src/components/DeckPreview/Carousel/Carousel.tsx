import React from 'react';
import styles from './Carousel.module.scss';

type Props = {
  imgArray: Array<string>
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

  updateImages = () => {
    const {nextImg, currentImg} = this.state;
    const nextIndex = nextImg + 1 === this.props.imgArray.length ? 0 : nextImg + 1;

    this.setState(() => ({
      currentImg: nextImg,
      nextImg: nextIndex,
      prevImg: currentImg
    }));

  };

  componentDidMount() {
    const intervalID = setInterval(() => {
      this.updateImages();
    }, 2000);
    this.setState({...this.state, updateIntervalID: intervalID});
  };

  render() {
    const {currentImg, nextImg, prevImg} = this.state;
    const {imgArray} = this.props;
    return (
      <div className={styles.container}>
        <img key={prevImg} className={styles.prevImg} src={imgArray[prevImg]} />
        <img key={currentImg} className={styles.currentImg} src={imgArray[currentImg]} />
        <img key={nextImg} className={styles.nextImg} src={imgArray[nextImg]} />
      </div>
  )}
}

export default Carousel;