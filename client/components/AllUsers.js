import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/AllUsers'
import {Link} from 'react-router-dom'

export class AllUsers extends React.Component {
  componentDidMount() {
    // console.log("this is Allusers component")
    this.props.loadUsers()
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <div key={user.id}>
            <p>User's name:{user.name}</p>
            <p>User's email:{user.email}</p>
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
