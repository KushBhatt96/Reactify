import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

//To reiterate, the Iprops interface is used to type check the incoming props from the parent react component
//If the parent tries to send a prop with the incorrect type, an error message will be shown
interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

//Again our component here just contains a whole bunch of semantic UI elements
//And again we've deconstructed props into activities and selectedActivity
export const ActivityList: React.FC<IProps> = ({activities, selectActivity, deleteActivity, submitting}) => {
    return (
        <Segment clearing>
        <Item.Group divided>
            {activities.map(activity => (
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
                        onClick = {() => selectActivity(activity.id)}   //when we click this button our selectedActivity is goning be passed in our state in our App component 
                        floated = "right" 
                        content = "view" 
                        color = "blue"
                        />
                        <Button
                        loading = {submitting}
                        onClick = {() => deleteActivity(activity.id)}   //when we click this button our selectedActivity is goning be passed in our state in our App component 
                        floated = "right" 
                        content = "delete" 
                        color = "red"
                        />
                      <Label basic content = "Category" color = "blue"/>
                  </Item.Extra>
                </Item.Content>
                </Item>
            ))}
      </Item.Group>
      </Segment>
    )
}
