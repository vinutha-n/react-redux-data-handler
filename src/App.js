import React from "react";

import { connect } from "react-redux";
import { getUsers, getUsersSuccess } from "./actions";

import "./styles.css";
const urls = [
      'https://api.spacexdata.com/v3/history'
      // 'https://api.spacexdata.com/v3/payloads'
      ];

class App extends React.Component {
  handleLoadUsersClick = () => {
    this.props.onLoadUsersClick();

    // let's do our api call
    // Promise.all(urls.map(url=>
      fetch(urls)
        .then(response => response.json())
        .then(json => this.props.onLoadUsersComplete(json))
    // ));
  };

  render() {
    return (
      <div className="App">
        <h1>React, Redux, and Data Handling</h1>
        <h2>An example </h2>
        <p>
          Click the load users button below to start loading users from the api
        </p>
        <p>
          <button onClick={this.handleLoadUsersClick}>Load users</button>
        </p>
        <hr />
        <h3>Users</h3>
        {this.props.loading ? <p>loading...</p> : null}
        {!this.props.loading && this.props.users ? (
          <ul>
            {this.props.users.map(user => (
              <li key={user.id}>
                <strong>{user.title}</strong>
                {user.flight_number}
                {user.details}

              </li>
              
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.isLoading
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsersClick: () => {
      dispatch(getUsers());
    },
    onLoadUsersComplete: users => {
      dispatch(getUsersSuccess(users));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
