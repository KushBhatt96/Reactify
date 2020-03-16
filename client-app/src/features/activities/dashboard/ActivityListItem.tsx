import React, { useContext } from 'react'
import { Item, Button, Label, Segment  } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ActivityStore from '../../../app/stores/activityStore'
import { IActivity } from '../../../app/models/activity';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
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
                        content = "View" 
                        color = "blue"
                        />
                      <Label basic content = {activity.category} color = "blue"/>
                  </Item.Extra>
                </Item.Content>
                </Item>
    )
}

export default ActivityListItem;
