import React from 'react';
import List from '../components/List/List';
import Search from '../components/Search/Search';
import { initialStories, useSemiPersistentState, SET_STORIES, REMOVE_STORY } from '../Constants/Constants';
import { storiesReducer } from '../Reducers/Reducers';

const App = () => 
{
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    };

  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);

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
      dispatchStories({
        type: SET_STORIES,
        payload: result.data.stories
      })
      setIsLoadig(false);
    }).catch(() => setIsError(true))
  }, []);
  
  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => {return ( item.objectID !== story.objectID)}
    );
    dispatchStories({
      type: REMOVE_STORY,
      payload: item
    })
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
