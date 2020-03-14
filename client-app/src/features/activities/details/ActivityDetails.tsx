import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

interface Iprops {
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}


//Below we are loading a particular picture from the public/assets folder based on the selectedActivity activity
const ActivityDetails: React.FC<Iprops> = ({setEditMode, setSelectedActivity}) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity} = activityStore;   //simple destructing of array
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity!.description}
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
};

export default observer(ActivityDetails);
