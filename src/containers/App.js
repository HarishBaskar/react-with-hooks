import React, {Component} from 'react';
import List from '../components/List/List';

const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

class App extends Component
{
    state = {
        list: list
    }
    
	render(){
        return(
            <div className="App">
              <h1>My Hacker Stories</h1>
              <label htmlFor="search">Search: </label>
              <input id="search" type="text" />
              <hr />
              <List list={this.state.list}/>
            </div>
        )
    }
}

export default App;
