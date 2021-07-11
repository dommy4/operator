import React from 'react';
import { Text, View } from 'react-native'
import Home from './appComponets/Home';
import Login from './appComponets/Login';
import Updater from './appComponets/Updater'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAllowed: false
    }
    this.setAllowed = this.setAllowed.bind(this);
  }
  setAllowed() {
    this.setState({ isAllowed: true })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {(this.state.isAllowed ?
          <Home />
          :
          <Login setAllowed={this.setAllowed} />
        )}
      </View>
    )
  }
}
export default App;