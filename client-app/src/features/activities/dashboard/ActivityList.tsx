import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'
import { Link } from 'react-router-dom';



//Again our component here just contains a whole bunch of semantic UI elements
//And again we've deconstructed props into activities and selectedActivity
const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate, selectActivity, deleteActivity, submitting, target} = activityStore;
    return (
        <Segment clearing>
        <Item.Group divided>
            {activitiesByDate.map(activity => (
                <Item key = {activity.id}>
                <Item.Content>
                  <Item.Header as='a'>{activity.title}</Item.Header>
                  <Item.Meta>{activity.date}</Item.Meta>
                  <Item.Description>
                      <div>{activity.description}</div>
                      <div>{activity.city}, {activity.venue}</div>
                  </Item.Description>
                  <Item.Extra>
                      <Button
                         as={Link} to={`/activities/${activity.id}`}
                        floated = "right" 
                        content = "view" 
                        color = "blue"
                        />
                        <Button
                        name = {activity.id}
                        loading = {target === activity.id && submitting}
                        onClick = {(e) => deleteActivity(e, activity.id)}   //when we click this button our selectedActivity is goning be passed in our state in our App component 
                        floated = "right" 
                        content = "delete" 
                        color = "red"
                        />
                      <Label basic content = {activity.category} color = "blue"/>
                  </Item.Extra>
                </Item.Content>
                </Item>
            ))}
      </Item.Group>
      </Segment>
    )
};

export default observer(ActivityList);
