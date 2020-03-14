import {observable, action} from 'mobx'
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';



class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;

    @action loadActivities = () => {
        this.loadingInitial = true;    //mutating state is perfectly valid in mobx, but now allowed in Redux
        agent.Activities.list()
        .then(activities =>{
        activities.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          this.activities.push(activity);
        })
    }).finally(() => this.loadingInitial = false);
    }
}


export default createContext(new ActivityStore())