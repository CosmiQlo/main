import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/AllUsers'
import {Link} from 'react-router-dom'
import './AllUsers.css'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    return (
      <div className="userlist">
        {this.props.users.map(user => (
          <div key={user.id} className="eachcell">
            <p>Name:{user.name}</p>
            <p>E-mail:{user.email}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
