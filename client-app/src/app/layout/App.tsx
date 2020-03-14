import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';



const App = () => {
  //below are all state properties, that each have their own setState function --> we are using hooks to create them
  const [activities, setActivities] = useState<IActivity[]>([]) //we are setting the default state of our activities as an empty array and ensuring type safety by making it an IActivity
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);  //the selectedActivity can be of type IActivity OR null, then we can pass null as the initial state
  const [editMode, setEditMode] = useState(false);   //eidtMode state property is initially false
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');


  //this is a handler that takes an id as a parameter and then we can select the activity from our list of activites based on the passed id parameter
  const handleSelectActivity = (id: String) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0])    //[0] to get the 0th (and only) element of the resulting array from filter
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{      //then only occurs once the create method has completed to store the activity on the server
      setActivities([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !==id)])
    }).then(() => setSubmitting(false))
  }

  useEffect(() => {      //Think of the useEffect Hook as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods
      agent.Activities.list()
        .then(response =>{
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities)     //use the response data to fill in the empty activities list upon component mount
    }).then(() => setLoading(false));
  }, []); //this empty array here is preventing the useEffect from running again and again after our component has mounted 


  if (loading) return <LoadingComponent content = 'Loading activities...'/>

    //Fragement is just a replacement for div, that comes with react
    //Use Fragment when no styling needs to be applied to the outer container
    return ( 
      <Fragment>  
        <NavBar openCreateForm = {handleOpenCreateForm}/>
        <Container style = {{marginTop: "7em"}}>
          <ActivityDashboard 
            activities = {activities} 
            selectActivity = {handleSelectActivity}    //here we are passing down a function to the child ActivityDashboard Component, hence it will have access to a parent function
            selectedActivity = {selectedActivity!}      //the grandchild component ActivityList calls handleSelectActivity when button is clicked and passes the corresponding id
            //then the selectedActivity gets set inside handleSelectActivity using the id passed by ActivityList grandchild and we pass the selectedActivity to ActivityDetails
            //to show to the screen!
            editMode = {editMode}
            setEditMode = {setEditMode}
            setSelectedActivity = {setSelectedActivity}
            createActivity = {handleCreateActivity}
            editActivity = {handleEditActivity}
            deleteActivity = {handleDeleteActivity}
            submitting={submitting}
            target = {target}
          />
        </Container>
      </Fragment> 
    );

}

export default App;
