import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore'

//instead of {activities, selectActivity,... below, we could have just said "props", but when using typescript its common to destructure the props as shown below
const ActivityDashboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);

    useEffect(() => {      //Think of the useEffect Hook as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods
      activityStore.loadActivities();
    }, [activityStore]); //activityStore as a dependecy when using stores//this empty array here is preventing the useEffect from running again and again after our component has mounted 
  
  
    if (activityStore.loadingInitial) return <LoadingComponent content = 'Loading activities...'/>

    
    return (      //essentially all of the stuff below are semantic ui react elements   //width in semantic UI is 16 as opposed to 12 in bootstrap
        <Grid>
            <Grid.Column width = {10}>
                <ActivityList />
            </Grid.Column>
            <GridColumn width = {6}>
                <h2>Activity filters</h2>
            </GridColumn>
        </Grid>
    )
};

export default observer(ActivityDashboard);
