import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface Iprops {
    activity: IActivity
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}


//Below we are loading a particular picture from the public/assets folder based on the selectedActivity activity
export const ActivityDetails: React.FC<Iprops> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
          {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths = {2}>
                <Button onClick={()=>setEditMode(true)} basic color="blue" content = "Edit"/>
                <Button onClick={()=>setSelectedActivity(null)} basic color="grey" content = "Cancel"/>
            </Button.Group>
        </Card.Content>
      </Card>
    )
}
