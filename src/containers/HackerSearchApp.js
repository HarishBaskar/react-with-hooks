import React from 'react';
import List from '../components/List/List';
import SearchForm from '../components/SearchForm/SearchForm';
import { useSemiPersistentState, 
          REMOVE_STORY,
          STORIES_FETCH_FAILURE,
          STORIES_FETCH_INIT,
          STORIES_FETCH_SUCCESS,
          API_BASE,
          API_SEARCH,
          PARAM_SEARCH,
          PARAM_PAGE } from '../Constants/Constants';
import { storiesReducer } from '../Reducers/Reducers';
import axios from 'axios';
import styles from  './App.module.css';
import LastSearch from '../components/LastSearches/LastSearches';
import withAuthorization from '../components/Session/withAuthorization';


const HackerSearchApp = () => 
{
  console.log("Inside App");

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], page: [], isLoading: false, isError: false});

  const getUrl = (searchTerm, page) => `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;;

  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);

  const handleButtonSubmit = (event) => {
    pileUpSearch(searchTerm, 0);
    event.preventDefault();
  }

  const pileUpSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
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
        payload: {
          list: result.data.hits,
          page: result.data.page,
        }
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

  const extractSearchTerm = url => url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&')).replace(PARAM_SEARCH, "");

  const handleLastSearch = searchTerm => {
    setSearchTerm(searchTerm);
    pileUpSearch(searchTerm, 0);
  }

  const getLastSearches = urls => {
    const searches = urls.slice(-5).map((url, index) => extractSearchTerm(url));
    const excludingSearchTerm = searches.filter((search, index) => search !== searchTerm);

    let frequencyCounter = {};
    excludingSearchTerm.forEach((search, index) => {
      frequencyCounter[search] = (frequencyCounter[search] || 0) + 1;
    })

    let newSearchArray = [];

    for(let key in frequencyCounter)
    {
      newSearchArray.push(key);
    }
    console.log(newSearchArray);
    return newSearchArray;
  };

  const lastSearches = getLastSearches(urls);

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    pileUpSearch(searchTerm, stories.page + 1);
  };
    
  return(
      <div className={styles.container}>
        <h1 className={styles.headlineprimary}>Hacker Stories</h1>
        <SearchForm id="search" 
                search={searchTerm} 
                onSearch={handleSearch}
                isFocused={false}
                onFormSubmit={handleButtonSubmit}>
                <strong>Search: </strong>
        </SearchForm>
        
        <LastSearch lastSearches={lastSearches} handleLastSearch={handleLastSearch}/>
        <hr/>
        {stories.isError && <p>Something went wrong....</p>}
        { stories.isLoading ? (<p>Please wait, data is loading...</p>) : 
                      (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        {stories.isLoading ? (
            <p>Loading ...</p>
            ) : (

            <button type="button" onClick={handleMore}>
              More
            </button>
        )}
      </div>
  )
}

const condition = authUser => authUser != null

export default withAuthorization(condition)(HackerSearchApp);
