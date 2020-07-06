import React from 'react';
import List from '../components/List/List';
import SearchForm from '../components/SearchForm/SearchForm';
import { useSemiPersistentState, 
          REMOVE_STORY,
          STORIES_FETCH_FAILURE,
          STORIES_FETCH_INIT,
          STORIES_FETCH_SUCCESS,
          API_ENDPOINT } from '../Constants/Constants';
import { storiesReducer } from '../Reducers/Reducers';
import axios from 'axios';
import styles from  './App.module.css';

const App = () => 
{
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false});

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleButtonSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
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
      <div className={styles.container}>
        <h1 className={styles.headlineprimary}>My Hacker Stories</h1>
        <SearchForm id="search" 
                search={searchTerm} 
                onSearch={handleSearch}
                isFocused={true}
                onFormSubmit={handleButtonSubmit}>
                <strong>Search: </strong>
        </SearchForm>
        <hr/>
        {stories.isError && <p>Something went wrong....</p>}
        { stories.isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        
      </div>
  )
}

export default App;
