import React from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {               //Type checking for the props that we receive!
    activities: IActivity[];
    selectActivity: (id: string) => void;        //selectActivity is a function passed from the parent, it takes in an id of type string, and returns void
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void      //setEditMode function expected as a prop from the parent
    setSelectedActivity: (activity: IActivity | null) => void
}

//instead of {activities, selectActivity,... below, we could have just said "props", but when using typescript its common to destructure the props as shown below
export const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity}) => {
    return (      //essentially all of the stuff below are semantic ui react elements   //width in semantic UI is 16 as opposed to 12 in bootstrap
        <Grid>
            <Grid.Column width = {10}>
                <ActivityList activities = {activities} selectActivity = {selectActivity}/>
            </Grid.Column>
            <GridColumn width = {6}>
                {selectedActivity && !editMode && 
                (<ActivityDetails 
                    activity={selectedActivity}
                    setEditMode={setEditMode}
                    setSelectedActivity = {setSelectedActivity}
                 />)}
                {editMode && <ActivityForm setEditMode = {setEditMode} activity={selectedActivity!}/>}
            </GridColumn>
        </Grid>
    )
}
