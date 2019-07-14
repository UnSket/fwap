import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {DeckPreviewT} from '../../model/types/Deck';
import Carousel from './Carousel/Carousel';
import styles from './DeckPreview.module.scss';


const DeckPreview: React.FC<DeckPreviewT> = ({images, name, description}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <Card onMouseEnter={() => setFocused(true)} onMouseLeave={() => setFocused(false)}>
      <div className={styles.carouselWrapper}>
        <Carousel imgArray={images} isScrolling={isFocused} />
      </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button color="primary">
          Buy
        </Button>
        <Button color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
};

export default DeckPreview;