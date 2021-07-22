import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import Transactions from './Transactions'
import Settings from './Settings'
import Account from './Account'
import Trips from './Trips'
import axios from 'axios'
import getHost from './Host'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountID: '',
            selectedBus: 'KCM648R',
            user: {},
            item: 'trips',
            trips: [],
            recievedTransactions: []

        }
        this.changeFragments = this.changeFragments.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.getTrips = this.getTrips.bind(this);
    }
    //gets all data on mount
    componentDidMount() {
        this.getAccount();
        this.getTrips();
        this.getTransactions();
    }

    getAccount = async () => {
        try {
            let acc = await AsyncStorage.getItem('@account')
            acc != null ? JSON.parse(acc) : acc = 'No account found';
            this.setState({ accountID: acc });
        } catch (error) {
            alert(error);
        }
    }

    RegisteredBus = async () => {
        try {
            let bus = await AsyncStorage.getItem('@bus');
            bus != null ? JSON.parse(bus) : bus = 'No bus registered';
            this.setState({ selectedBus: bus });
        } catch (error) {
            alert(error);
        }
    }



    getTrips() {
        axios.get(`${getHost()}/trips/today`)
            .then((res) => {
                this.setState({ trips: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    getTransactions() {
        axios.get(`${getHost()}/transactions`)
            .then((res) => {
                this.setState({ recievedTransactions: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    changeFragments(component) {
        this.setState({ item: component });
    }


    render() {
        const { item, trips } = this.state;
        let renderingComponent = '';

        if (item === 'trips') {
            renderingComponent = <Trips accountID={this.state.accountID} trips={trips} />;
        } else if (item === 'user') {
            renderingComponent = <Account logu={this.props.logu} />
        } else if (item === 'transactions') {
            renderingComponent = <Transactions accountID={this.state.accountID} data={this.state.recievedTransactions} />
        } else {
            renderingComponent = <Settings accountID={this.state.accountID} />
        }

        return (
            <View style={styles.home}>
                {/* rendering component */}
                {renderingComponent}
                {/* navigation */}
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => this.changeFragments('user')}>
                        <Icon name="user" type="font-awesome" color="white" />
                        <Text>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeFragments('transactions')}>
                        <Icon name="money" type="font-awesome" color="white" />
                        <Text>Mpesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeFragments('trips')}>
                        <Icon name="exchange" type="font-awesome" color="white" />
                        <Text>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeFragments('settings')}>
                        <Icon name="cog" type="font-awesome" color="white" />
                        <Text>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingTop: 50
    },
    bottom: {
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#629cdb",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5
    }
})