import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Deck} from '../../model/types/Deck';
import Carousel from './Carousel/Carousel';
import styles from './DeckPreview.module.scss';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import { getUrlFromImgKey } from '../utils/utils';
import { Link } from 'react-router-dom';

interface Props extends Deck {
  own?: boolean
}

const DeckPreview: React.FC<Props> = ({images, name, description, own, id}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <Card onMouseEnter={() => setFocused(true)} onMouseLeave={() => setFocused(false)}>
      <div className={styles.carouselWrapper}>
        <Carousel imgArray={images.map(img => getUrlFromImgKey(img.url))} isScrolling={isFocused} />
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
        <Button color="primary" disabled>
          {own ? 'Print' : 'Buy'}
        </Button>
        <Button color="primary">
          <Link to={ROUTE_PATHS.editDeck.withID(id)} className={styles.link}>
            Edit
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
};

export default DeckPreview;
