import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {DeckPreviewT} from '../../model/types/Deck';
import Carousel from './Carousel/Carousel';
import styles from './DeckPreview.module.scss';

interface Props extends DeckPreviewT {
  own?: boolean
}

const DeckPreview: React.FC<Props> = ({images, name, description, own}) => {
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
          {own ? 'Print' : 'Buy'}
        </Button>
        <Button color="primary">
          {own ? 'Edit' : 'Learn More'}
        </Button>
      </CardActions>
    </Card>
  )
};

export default DeckPreview;