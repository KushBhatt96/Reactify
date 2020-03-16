import React, {useEffect, Fragment, useContext} from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';



const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {      //Think of the useEffect Hook as a combination of componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods
    activityStore.loadActivities();
  }, [activityStore]); //activityStore as a dependecy when using stores//this empty array here is preventing the useEffect from running again and again after our component has mounted 


  if (activityStore.loadingInitial) return <LoadingComponent content = 'Loading activities...'/>

    return ( 
      <Fragment>  
        <NavBar/>
        <Container style = {{marginTop: "7em"}}>
          <Route path='/' component={HomePage} exact={true}/>
          <Route path='/activities' component={ActivityDashboard} exact={true} />
          <Route path='/activities/:id' component={ActivityDetails} />
          <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />
        </Container>
      </Fragment> 
    );

}

export default observer(App);
