import React, {useEffect, Fragment, useContext} from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite';



const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {      //Think of the useEffect Hook as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods
    activityStore.loadActivities();
  }, [activityStore]); //activityStore as a dependecy when using stores//this empty array here is preventing the useEffect from running again and again after our component has mounted 


  if (activityStore.loadingInitial) return <LoadingComponent content = 'Loading activities...'/>

    //Fragement is just a replacement for div, that comes with react
    //Use Fragment when no styling needs to be applied to the outer container
    //here we are passing down a function to the child ActivityDashboard Component, hence it will have access to a parent function
    //the grandchild component ActivityList calls handleSelectActivity when button is clicked and passes the corresponding id
    //then the selectedActivity gets set inside handleSelectActivity using the id passed by ActivityList grandchild and we pass the selectedActivity to ActivityDetails
    //to show to the screen!
    return ( 
      <Fragment>  
        <NavBar/>
        <Container style = {{marginTop: "7em"}}>
          <ActivityDashboard />
        </Container>
      </Fragment> 
    );

}

export default observer(App);
