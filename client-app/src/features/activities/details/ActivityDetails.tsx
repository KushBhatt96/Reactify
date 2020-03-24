import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams {
  id: string
}


//Below we are loading a particular picture from the public/assets folder based on the selectedActivity activity
//The RouteComponentProps give us access to history, location, match, staticContext props passed from route component
//Having ReactComponentProps take type parameter DetailParams allows use to access match.params.id
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity, 
    loadActivity, 
    loadingInitial
  } = activityStore;   //simple destructing of array

  useEffect(() =>{
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id])  //only want to run useEffect once!!

  if(loadingInitial || !activity) return <LoadingComponent content="loading activity..."/>

    return (
      <Grid>
        <Grid.Column width = {10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity = {activity}/>
          <ActivityDetailedChat/>
        </Grid.Column>
        <Grid.Column width = {6}>
          <ActivityDetailedSidebar/>
        </Grid.Column>
      </Grid>
    )
};

export default observer(ActivityDetails);
