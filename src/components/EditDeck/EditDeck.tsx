import React, { useState } from 'react';
import { Container, Paper, Tabs, Typography, Tab } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const EditDeck: React.FC<Props> = ({match}) => {
  const [currentTab, changeTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
  };

  const CurrentTabComponent: React.FC = () => {
    switch (currentTab) {
      case 0: return <FileManagment />;
      case 1: return <div>edit history</div>;
      default: return <div>settings</div>;
    }
  };

  return (
    <Container className={styles.wrapper}>
      <Paper className={styles.paper}>
        <Typography variant={'h3'} gutterBottom>Edit deck {match.params.id}</Typography>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
            <Tab label="Edit cards" />
            <Tab label="Edit history" />
            <Tab label="Settings" />
          </Tabs>
          <CurrentTabComponent />
      </Paper>
    </Container>
  )
};

export default EditDeck;