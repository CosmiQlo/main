import React from 'react'
import './darkened.css'

export default class Darkened extends React.Component {
  render() {
    return <div className="darkened" onClick={this.props.close} />
  }
}
