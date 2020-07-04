import React from 'react';
import List from '../components/List/List';
import Search from '../components/Search/Search';
import { useSemiPersistentState, 
          REMOVE_STORY,
          STORIES_FETCH_FAILURE,
          STORIES_FETCH_INIT,
          STORIES_FETCH_SUCCESS,
          API_ENDPOINT } from '../Constants/Constants';
import { storiesReducer } from '../Reducers/Reducers';

const App = () => 
{
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false});

  React.useEffect(() => {
    dispatchStories({type: STORIES_FETCH_INIT});
    fetch(`${API_ENDPOINT}react`)
        .then(response => response.json())
        .then(result => {
            dispatchStories({
              type: STORIES_FETCH_SUCCESS,
              payload: result.hits
            });
        })
        .catch(() => dispatchStories({ type: STORIES_FETCH_FAILURE}) )
  }, []);
  
  const handleRemoveStory = item => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item
    })
  };

  const filteredStories = stories.data.filter((story,index) =>{
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
        {stories.isError && <p>Something went wrong....</p>}
        { stories.isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={filteredStories} onRemoveItem={handleRemoveStory}/>)}
        
      </div>
  )
}

export default App;
