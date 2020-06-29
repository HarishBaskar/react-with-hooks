import React from 'react';
import List from '../components/List/List';
import Search from '../components/Search/Search';

const App = () => 
{
  const stories = [
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

  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story,index) =>{
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  })
    
  return(
      <div className="App">
        <h1>My Hacker Stories</h1>
        <Search search={searchTerm} onSearch={handleSearch}/>
        <hr/>
        <List list={filteredStories}/>
      </div>
  )
}

export default App;
