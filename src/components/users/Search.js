import React, {useContext, useState}  from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text,setText] = useState('');
  
  const { setAlert } = alertContext; 

  const showClear = githubContext.users.length > 0 ? true :  false;

  const onChange = (e) => {
    // this.setState({[e.target.name]: e.target.value});
    setText(e.target.value);

  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(text === '') {
      setAlert('Please enter some thing', 'light');
    }else {
      // this.props.searchUsers(this.state.text);
      // this.setState({text: ''});
      githubContext.searchUsers(text);
      setText('');
    } 
  }

    return (
      <div>
        <form className="form" onSubmit={onSubmit}>
          <input 
            type="text"
            name="text" 
            value={text}
            onChange={onChange}
            placeholder="Search Users" />
          <input 
            type="submit" 
            value="Search" 
            className="btn btn-dark btn-block" />

        </form>
        {showClear && (
          <button 
            className="btn btn-light btn-block" 
            onClick={githubContext.clearUsers}>
            Clear
          </button>
        )}
        
        
      </div>
    )
}

export default Search
