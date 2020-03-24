import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify'



const App: React.FC<RouteComponentProps> = ({location}) => {

    return ( 
      <Fragment>  
        <ToastContainer position='bottom-right' />
        <Route path='/' component={HomePage} exact={true}/>
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar/>
            <Container style = {{marginTop: "7em"}}>
              <Switch>
                <Route path='/activities' component={ActivityDashboard} exact={true} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route 
                key = {location.key} 
                  path={['/createActivity', '/manage/:id']} 
                  component={ActivityForm} 
                />
                <Route component = {NotFound}/>
              </Switch>
            </Container>
          </Fragment>
        )} />

      </Fragment> 
    );

}

export default withRouter(observer(App));
