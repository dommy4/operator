import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'
import React from 'react'
import { Alert, Text, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import getHost from './Host'
export default class Settings extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            accountID: props.accountID,
            buses: [],
            registeredBus: ''
        }
        this.handleSelectBus = this.handleSelectBus.bind(this);
        this.getBuses = this.getBuses.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);

    }
    componentDidMount() {
        this._isMounted = true;
        this.getBuses();
        this.getAccount();
        this.RegisteredBus();
    }

    changeHandler(name) {
        return (text) => this.setState({ [name]: text })
    }

    getBuses() {
        this.getAccount();
        axios.get(`${getHost()}/buses/${this.state.accountID}`)
            .then((res) => {
                this.setState({ buses: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    //REQUEST METHOD COMES HERE
    handleSelectBus(registeredBus) {
        this.setState({ registeredBus: registeredBus });
    }

    //stores data locally
    storeAccount = async () => {
        try {
            await AsyncStorage.setItem(
                '@account',
                this.state.accountID,
                (err) => {
                    Alert.alert(err);
                }
            );
        } catch (error) {
            alert("Unable to save accountID")
        }
    }

    //stores data locally
    registerBus = async () => {
        try {
            await AsyncStorage.setItem('@bus', this.state.registeredBus);
        } catch (error) {
            alert("Unable to save BUS")
        }
    }

    //get existing account
    getAccount = async () => {
        let acc;
        try {
            acc = await AsyncStorage.getItem('@account')
            // acc != null ? JSON.parse(acc) : acc = 'No account found';
        } catch (error) {
            alert(error);
        }
        this.setState({ accountID: acc });
    }
    //gets registere bus
    RegisteredBus = async () => {
        try {
            let registeredBus = await AsyncStorage.getItem('@bus');
            // registeredBus != null ? JSON.parse(registeredBus) : registeredBus = 'No bus registered';
            this.setState({ registeredBus: registeredBus });
        } catch (error) {
            alert(error);
        }
    }
    saveUpdate() {
        const { accountID, registeredBus } = this.state;
        if (accountID === '' && registeredBus === '') {
            return
        } else if (accountID && registeredBus === '') {
            this.storeAccount();
        } else if (accountID === '' && registeredBus) {
            this.registerBus();
        } else {
            this.storeAccount();
            this.registerBus();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <View style={styles.settings}>
                <Text style={styles.text}>Settings</Text>
                <TextInput style={styles.input} onChangeText={this.changeHandler('accountID')} keyboardType="numeric" placeholder="Enter account" />
                <TouchableOpacity style={styles.save1} onPress={this.getBuses}>
                    <Text style={styles.saveText1}>Get buses</Text>
                </TouchableOpacity>

                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.registeredBus}
                        onValueChange={this.handleSelectBus}
                        mode="dropdown">
                        {this.state.buses.map((bus, index) => (<Picker.Item key={index} label={bus.regNo} value={bus.regNo} />))}
                    </Picker>
                </View>
                <View style={styles.registeredBus}>
                    <Text style={styles.selectedText}>Rgistered Account</Text>
                    <Text style={styles.selectedText2}>{this.state.accountID}</Text>
                    <Text style={styles.selectedText}>Registered Bus</Text>
                    <Text style={styles.selectedText2}>{this.state.registeredBus}</Text>
                </View>
                <TouchableOpacity style={styles.save} onPress={this.saveUpdate}>
                    <Text style={styles.saveText}>save</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    settings: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    text: {
        fontWeight: "bold",
        fontSize: 24
    },
    picker: {
        width: "90%",
        borderColor: "#698ebd",
        borderStyle: "solid",
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5
    },
    registeredBus: {
        width: "90%",
        borderColor: "#698ebd",
        borderStyle: "solid",
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        padding: 15
    },
    selectedText: {
        fontSize: 20,
    },
    selectedText2: {
        fontSize: 20,
        color: "grey"
    },
    input: {
        width: "90%",
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#698ebd",
        borderStyle: "solid",
        borderRadius: 5,
        marginTop: 10,
        padding: 10
    },
    save: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    save1: {
        width: "90%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#0866e0",
        marginTop: 20,
        borderRadius: 5
    },
    saveText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    saveText1: {
        fontSize: 20,
        color: "#0866e0",
        fontWeight: "bold"
    }
})