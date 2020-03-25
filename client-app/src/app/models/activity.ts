//This is simply a typescript interface that we are exporting and will import in one of our tsx files
//The primary purpose of these typescript interfaces is to strongly type and ensure type checking
//So that when we create an Activity object we don't accidently use a wrong type
export interface IActivity {    //This represents a single activity
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity>{
    time?: Date
}


export class ActivityFormValues implements IActivityFormValues {
    id?: string =  undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}