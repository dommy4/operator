import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { Alert, Text, View } from 'react-native'
import Home from './appComponets/Home';
import getHost from './appComponets/Host';
import Login from './appComponets/Login';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      ukey: '',
      isAllowed: false,//should be in a redux store
    }
    this.setAllowed = this.setAllowed.bind(this);
    this.revokeUser = this.revokeUser.bind(this);
    this.getSetData = this.getSetData.bind(this);
  }

  componentDidMount() {
    this.getSetData();
  }

  setAllowed(user, ukey, action) {
    AsyncStorage.multiSet([['@user', user], ['@ukey', ukey]]);
    this.setState({ isAllowed: action });
  }

  revokeUser() {
    this.setState({ isAllowed: false })
  }

  getSetData() {
    AsyncStorage.getItem('@user')
      .then((v) => {
        this.setState({ user: v }, () => {
          AsyncStorage.getItem('@ukey')
            .then((v) => {
              this.setState({ ukey: v }, () => {
                const { user, ukey } = this.state;
                axios.post(`${getHost()}/verifyuser`, { user: user, ukey: ukey })
                  .then((res) => {
                    if (res.data.allowed) {
                      this.setState({ isAllowed: JSON.stringify(res.data.allowed) })
                    } else {
                      this.revokeUser();
                    }
                  })
                  .catch((err) => {
                    alert(err.message);
                  })

              });
            })
            .catch((err) => { Alert.alert(err) })
        });
      })
      .catch((err) => { Alert.alert(err) })
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