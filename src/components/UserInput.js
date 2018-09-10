import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserInput extends Component {
  state = {
    username: '',
    hometown: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addUser(this.state);
    this.setState({
      username: '',
      hometown: '',
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange}/>
          Hometown:
          <input type="text" value={this.state.hometown} name="hometown" onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
        <br />
        <h3>All Users:</h3>
        <ul>{this.props.users}</ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    users: state.users.map(user => <li>{user.username}</li>),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (state) => dispatch({
      type: 'ADD_USER', 
      user: {
        username: state.username, 
        hometown: state.hometown,
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);