import React from 'react'

import {Navbar, Darkened, SlidingCart} from './components'
import Routes from './routes'

class App extends React.Component {
  // state = {drawerOpen: false}

  // slidingcartToggleClickHandler = () => {
  //   this.setState({
  //     drawerOpen: !this.state.drawerOpen,
  //   })
  // }
  // darkenedClickHandler = () => {
  //   this.setState({
  //     drawerOpen: false,
  //   })
  // }
  render() {
    // let backdrop
    // if (this.state.drawerOpen) {
    //   backdrop = <Darkened close={this.backdropClickHandler} />
    // }
    return (
      <div>
        <SlidingCart />
        {/* {backdrop} */}
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
