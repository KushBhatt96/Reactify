import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

//instead of {activities, selectActivity,... below, we could have just said "props", but when using typescript its common to destructure the props as shown below
const ActivityDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {loadActivities, loadingInitial} = rootStore.activityStore;

    useEffect(() => {      //Think of the useEffect Hook as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods
      loadActivities();
    }, [loadActivities]); //activityStore as a dependecy when using stores//this empty array here is preventing the useEffect from running again and again after our component has mounted 
  
  
    if (loadingInitial) return <LoadingComponent content = 'Loading activities...'/>

    
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
