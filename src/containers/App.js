import React from 'react';
import List from '../components/List/List';
import Search from '../components/Search/Search';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};


const App = () => 
{
  const initialStories = [
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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, setStories] = React.useState([]);

  const [isLoading, setIsLoadig] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  const getAsyncStories = () => 
        new Promise((resolve, reject) => 
        setTimeout(
          () => resolve({ data: {stories: initialStories}}), 
          2000
        )
      );

  React.useEffect(() => {
    setIsLoadig(true);
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoadig(false);
    }).catch(() => setIsError(true))
  }, []);
  
  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => {return ( item.objectID !== story.objectID)}
    );
    setStories(newStories);
  };

  const filteredStories = stories.filter((story,index) =>{
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
    
  return(
      <div className="App">
        <h1>My Hacker Stories</h1>
        <Search id="search" 
                search={searchTerm} 
                onSearch={handleSearch}
                isFocused={true}>
                <strong>Search: </strong>
        </Search>
        <hr/>
        {isError && <p>Something went wrong....</p>}
        { isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={filteredStories} onRemoveItem={handleRemoveStory}/>)}
        
      </div>
  )
}

export default App;
