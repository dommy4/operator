import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import Tripholder from './Tripholder'
import Updater from './Updater'

export default class Trips extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountID: this.props.accountID,
            new: false,
            bus: this.props.bus
        }
        this.newTrip = this.newTrip.bind(this);
        this.showTrips = this.showTrips.bind(this);
    }
    componentDidMount() {
        this.props.getTrips();
    }

    newTrip() {
        this.setState({ new: true })//displays form for new trip
    }

    showTrips() {
        this.setState({ new: false }, () => {
            this.props.getTrips();
        })
    }

    render() {
        return (
            <View style={styles.trips}>
                {this.state.new ?
                    <>
                        <Text style={styles.headtext}>New Trip</Text>
                        <Updater accountID={this.state.accountID} bus={this.state.bus} showTrips={this.showTrips} />
                    </>
                    :
                    <>
                        <TouchableOpacity style={styles.new} onPress={this.newTrip}>
                            <Text style={styles.text}>New</Text>
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scroll}>
                            {this.props.trips.map((trip, index) => (<Tripholder key={index} action={this.showTrips} id={trip.id} accountId={trip.accountId} selectedBus={trip.busId} from={trip.tripFrom} to={trip.tripTo} fare={trip.fare} active={trip.tripStatus} />))}
                        </ScrollView>
                    </>

                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    add: {
        marginRight: 20
    },
    trips: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    new: {
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#0866e0",
        padding: 15,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    headtext: {
        fontWeight: "bold",
        fontSize: 20
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    },
    scroll: {
        width: "100%",
        alignItems: "center",
        padding: 10,
        paddingBottom: 80
    }

})