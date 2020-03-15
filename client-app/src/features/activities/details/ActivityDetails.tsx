import React, { useContext, useEffect } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

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
    openEditForm, 
    cancelSelectedActivity, 
    loadActivity, 
    loadingInitial
  } = activityStore;   //simple destructing of array

  useEffect(() =>{
    loadActivity(match.params.id)
  }, [loadActivity])  //only want to run useEffect once!!

  if(loadingInitial || !activity) return <LoadingComponent content="loading activity..."/>

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
                <Button onClick={()=>openEditForm(activity!.id)} basic color="blue" content = "Edit"/>
                <Button onClick={cancelSelectedActivity} basic color="grey" content = "Cancel"/>
            </Button.Group>
        </Card.Content>
      </Card>
    )
};

export default observer(ActivityDetails);
