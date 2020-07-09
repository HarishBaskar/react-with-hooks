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
  console.log("Inside App");

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false});

  const getUrl = searchTerm => `${API_ENDPOINT}${searchTerm}`;

  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const handleButtonSubmit = (event) => {
    pileUpSearch(searchTerm);
    event.preventDefault();
  }

  const pileUpSearch = searchTerm => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  }

  const handleFetchedStories = React.useCallback( async () => {
    if(searchTerm === '')
    {
      return;
    }

    dispatchStories({type: STORIES_FETCH_INIT});

    try
    {
      const lastUrl = urls[urls.length-1];
      const result = await axios.get(lastUrl);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits
      });
    }
    catch
    {
      dispatchStories({ type: STORIES_FETCH_FAILURE})
    }
  }, [urls])

  React.useEffect(() => {
    handleFetchedStories();
  }, [handleFetchedStories]);
  
  const handleRemoveStory = React.useCallback(item => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item,
    });
  }, []);

  const extractSearchTerm = url => url.replace(API_ENDPOINT, "");

  const handleLastSearch = searchTerm => {
    pileUpSearch(searchTerm);
  }

  const getLastSearches = urls => urls.slice(-5).map((url, index) => extractSearchTerm(url));

  const lastSearches = getLastSearches(urls);
    
  return(
      <div className={styles.container}>
        <h1 className={styles.headlineprimary}>My Hacker Stories</h1>
        <SearchForm id="search" 
                search={searchTerm} 
                onSearch={handleSearch}
                isFocused={false}
                onFormSubmit={handleButtonSubmit}>
                <strong>Search: </strong>
        </SearchForm>
        <p>Last 5 searches: </p>
        {lastSearches.map((searchTerm, index) => (
        <button className={`${styles.button} ${styles.buttonsmall}`}
          key={searchTerm + index}
          type="button"
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}

        <hr/>
        {stories.isError && <p>Something went wrong....</p>}
        { stories.isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        
      </div>
  )
}

export default App;
