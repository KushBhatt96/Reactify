import React, { useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore'



//instead of {activities, selectActivity,... below, we could have just said "props", but when using typescript its common to destructure the props as shown below
const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore)
    const {editMode, activity} = activityStore;    //now editMode and selectedActivity are no longer props but are coming from our store!
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
