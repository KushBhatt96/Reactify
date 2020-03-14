//This is simply a typescript interface that we are exporting and will import in one of our tsx files
//The primary purpose of these typescript interfaces is to strongly type and ensure type checking
//So that when we create an Activity object we don't accidently use a wrong type
export interface IActivity {    //This represents a single activity
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
}