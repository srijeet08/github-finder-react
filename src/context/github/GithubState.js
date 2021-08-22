import React,  {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SEARCH_USERS, GET_USER, GET_REPOS, SET_LOADING, CLEAR_USERS} from '../types';


const GithubState = (props) => {

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Github Users
  const searchUsers = async (text) => {
    
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // setUsers(res.data.items);
    // setLoading(false);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }


  //Get single Github user
  const getUser = async (userName) => {

    
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // setUser(res.data);
    // setLoading(false);

    dispatch({
      type: GET_USER,
      payload: res.data
    });


  }


  // Get users repos
  const getUserRepos = async (userName) => {

    setLoading();
    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // setRepos(res.data);
    // setLoading(false);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  }

  // Clear users from state
  const clearUsers =  () => {
    // setUsers([]);
    // setLoading(false);

    dispatch({
      type: CLEAR_USERS,
      payload: []
    });

  }


  // Set Loading
  const setLoading = () => dispatch({type: SET_LOADING})


  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      getUser,
      getUserRepos,
      clearUsers
    }}
  >
    {props.children}

  </GithubContext.Provider>
}

export default GithubState;