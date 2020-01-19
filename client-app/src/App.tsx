import React, {Component} from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount(){   
    axios.get('http://localhost:5000/API/values').then((response =>{
      this.setState({
        values: response.data
      })
    }))
  }
  render(){
    return (
      <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>  

      <List>
        {this.state.values.map((value: any) => (    //this = instance of class, .state.values = values array in state variable
          //{any thing in these curly braces will be seen as typescript}
        <List.Item key={value.id}>{value.name}</List.Item>   //whenever we loop over someting, always important to give a key={value}
        ))}
      </List>
      </div> 
    );
  }
}

export default App;
