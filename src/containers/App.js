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
import axios from 'axios';

const App = () => 
{
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false});

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleButtonSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }

  const handleFetchedStories = React.useCallback( async () => {
    if(searchTerm === '')
    {
      return;
    }

    dispatchStories({type: STORIES_FETCH_INIT});
    
    try
    {
      const result = await axios.get(url);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits
      });
    }
    catch
    {
      dispatchStories({ type: STORIES_FETCH_FAILURE})
    }
  }, [url])

  React.useEffect(() => {
    handleFetchedStories();
  }, [handleFetchedStories]);
  
  const handleRemoveStory = item => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item
    })
  };
    
  return(
      <div className="App">
        <h1>My Hacker Stories</h1>
        <Search id="search" 
                search={searchTerm} 
                onSearch={handleSearch}
                isFocused={true}
                onButtonClick={handleButtonSubmit}>
                <strong>Search: </strong>
        </Search>
        <hr/>
        {stories.isError && <p>Something went wrong....</p>}
        { stories.isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        
      </div>
  )
}

export default App;
