import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import Transactions from './Transactions'
import Settings from './Settings'
import Account from './Account'
import Trips from './Trips'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: 'trips',
            trips: [
                { id: 101, from: 'ESTATE', to: 'ESTATE', fare: 20, active: true },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'ESTATE', to: 'ESTATE', fare: 20, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'ESTATE', to: 'ESTATE', fare: 20, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'ESTATE', to: 'ESTATE', fare: 20, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'ESTATE', to: 'ESTATE', fare: 20, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false },
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 20, active: false }
            ],
            buses: [//DATA FROM SERVER
                { regNo: "KDA648R" },
                { regNo: "KCB647R" },
                { regNo: "KCM648R" },
                { regNo: "KCN648S" },
                { regNo: "KCM648R" },
                { regNo: "KCM648R" }
            ],
            recievedTransactions: [
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
                { id:'PG742P1HVI',name: "washington", seat: 12, amount: 80},
            ]

        }
        this.changeFragments = this.changeFragments.bind(this);
    }
    changeFragments(component) {
        this.setState({ item: component });
    }
    render() {
        const { item, trips } = this.state;
        let renderingComponent = '';

        if (item === 'trips') {
            renderingComponent = <Trips trips={trips} />;
        } else if (item === 'user') {
            renderingComponent = <Account logu={this.props.logu} />
        } else if (item === 'transactions') {
            renderingComponent = <Transactions data={this.state.recievedTransactions} />
        } else {
            renderingComponent = <Settings buses={this.state.buses} />
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