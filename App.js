import React from 'react';
import { Text, View } from 'react-native'
import Login from './appComponets/Login';
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{flex:1,width:"100%"}}>
        <Login/>
      </View>
    )
  }
}
export default App;