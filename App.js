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
      accountID: '',
      selectedBus: ''
    }
    this.setAllowed = this.setAllowed.bind(this);
    this.revokeUser = this.revokeUser.bind(this);
    this.getSetData = this.getSetData.bind(this);
  }

  componentDidMount() {
    this.getSetData();
    this.getAccount();
    this.RegisteredBus();
  }
  
  getAccount = async () => {
    try {
      let acc = await AsyncStorage.getItem('@account')
      acc != null ? JSON.parse(acc) : acc = 'NoAccount';
      this.setState({ accountID: acc });
    } catch (error) {
      alert(error);
    }
  }

  RegisteredBus = async () => {
    try {
      let bus = await AsyncStorage.getItem('@bus');
      bus != null ? JSON.parse(bus) : bus = 'NoBus';
      this.setState({ selectedBus: bus });
    } catch (error) {
      alert(error);
    }
  }


  setAllowed(user, ukey, action) {
    AsyncStorage.multiSet([['@user', user], ['@ukey', ukey]]);
    this.setState({ isAllowed: action });
  }

  revokeUser() {
    AsyncStorage.multiRemove(['@user', '@ukey']);
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
            .catch((err) => { Alert.alert("ERROR", err.message) })
        });
      })
      .catch((err) => { Alert.alert("ERROR", err.message) })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        {(this.state.isAllowed ?
          <Home logu={this.revokeUser} accountID={this.state.accountID} selectedBus={this.state.selectedBus} />
          :
          <Login setAllowed={this.setAllowed} />
        )}
      </View>
    )
  }
}
export default App;