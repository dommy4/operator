import axios from 'axios';
import React from 'react';
import { Text, View } from 'react-native'
import Account from './appComponets/Account';
import Home from './appComponets/Home';
import Login from './appComponets/Login';
import Updater from './appComponets/Updater'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAllowed: false,//should be in a redux store
    }
    this.setAllowed = this.setAllowed.bind(this);
    this.revokeUser=this.revokeUser.bind(this);
  }
  setAllowed() {
    this.setState({ isAllowed: true })
  } 
  revokeUser() {
    this.setState({ isAllowed: false })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {(this.state.isAllowed ?
          <Home logu={this.revokeUser} />
          :
          <Login setAllowed={this.setAllowed} />
        )}
      </View>
    )
  }
}
export default App;