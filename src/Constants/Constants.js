import React from 'react';
import { sortBy } from 'lodash';

export const initialStories = [
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


export const useSemiPersistentState = (key, initialState) => {

    const isMounted = React.useRef(false);

    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );
  
    React.useEffect(() => {

      if(!isMounted.current)
      {
        isMounted.current = true;
      }
      else
      {
        console.log("Inside useEffect");
        localStorage.setItem(key, value);
      }
      
    }, [value, key]);
  
    return [value, setValue];
  };

export const SET_STORIES = "SET_STORIES";

export const REMOVE_STORY = "REMOVE_STORY";

export const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";

export const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";

export const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";

export const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export const API_BASE = 'https://hn.algolia.com/api/v1';
export const API_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';

export const SORTS = {
  NONE: (list, sortOrder) => list,
  TITLE: (list, sortOrder) => sortOrder ? sortBy(list, 'title') : sortBy(list, 'title').reverse(),
  AUTHOR: (list, sortOrder) => sortOrder ? sortBy(list, 'author') : sortBy(list, 'author').reverse(),
  COMMENT: (list, sortOrder) => sortOrder ? sortBy(list, 'num_comments') : sortBy(list, 'num_comments').reverse(),
  POINT: (list, sortOrder) => sortOrder ? sortBy(list, 'points') : sortBy(list, 'points').reverse()
}


