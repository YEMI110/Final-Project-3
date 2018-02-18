import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onHanleChange= (e) => {
    let {dispatch} = this.props;
    dispatch({type: 'UPDATE_USERNAME', username: e.target.value})
  }

  onUserSearch = () => {
    let {dispatch}= this.props;
    let {username}= this.props;
    fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      dispatch({type:'UPDATE_USERPROFILE', userprofile: res})
    })
  }

  onRepoFetch = () => {
    let {dispatch}= this. props;
    let {repos_url}= this.props.userprofile;
    console.log(repos_url)
    
    fetch(repos_url)
    .then(res => {
      return res.json()
    })
    .then (res =>{
      dispatch({type:'UPDATE_REPOS', repos:res})
    })
  }
  render() {
    let {userprofile} = this.props;
    let repos = this.props.repos.map((repo, i) => {
      return <li key={i}>{repo.name}</li>
    })
    return (
      <div>
        <h1>{this.props.username}</h1>
        <input type="text"
        onChange={this.onHanleChange}
        value={this.props.user}/>
        <button onClick={this.onUserSearch}>Search</button>
        <hr/>
        <h3>{userprofile.login}</h3>
        <img src="https://lh3.googleusercontent.com/gHqoypqQv-F3bAWEmy9cOWbR4VCzaZdqXceDBBxgLC25JZnEwC0lkvuXS1AatUlKg8kOXPk6vvjpHadddmjyFQSSHqZRCmcj1UapU-6v40mGa4PoA19pQxjMLcHeiJeA-Lkzsx5HQM7I6h5G0eqL_ctRwWXJ_4w86NgbVDzBuJqKtC7ZyT_YFT-UzP7N4vYGIXa6IMRnr82UiJMNocdn92SKjZK4EtcvEktsbpeEGx6ye3-zXMJJiFD-iUmEVHUPnwROMnOAfzJ6g88VKd1J475yuIFkYM69IGtgg4LLnOh923RpqPwwEHR2TlEb1x0NE1j8XqWYLukQjnyBVZrz3D2n3EmePel05WOsMJ9hFPUNKDdbMBAKGz6y4dwjjKNkhHHM8gi0lf7_I9rBNGbK0v62t8pDxEwP3LTuStf4FVLSvl3kBQdh_JMPLAlTzifYGKYpz38gSK6UpHsS-7xHG6vWUrm-EEaidAWX9upOTrMJa1qyJ2Wt3_9GjsKDWzbHt2PFmmj0a9UDAKm3tbMMlxCsfyeU2swVI-PI5GXnDUs_7h8ewpwhR2d4RQ3bmbF_9LM5zcTEQOqSF679i6q2Yq6u-mzISnrWjHdVixN7=w375-h662-no" alt=""/>
        <hr/>
        <button onClick={this.onRepoFetch}>Fetch Repos</button>
        {repos}
        <hr/>
        </div>
     );
  }
}
const mapStateTpProps= (state) => {
  return{
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  }
}

export default connect(mapStateTpProps)(App);
