import React from 'react'
import TripHolder from './Tripholder'
import Updater from './Updater'
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new: false,
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
                { id: 101, from: 'TOWN', to: 'ESTATE', fare: 80, active: false }
            ]
        }
        this.newTrip = this.newTrip.bind(this);
        this.showTrips=this.showTrips.bind(this);
    }
    newTrip() {
        this.setState({ new: true })
    }
    showTrips() {
        this.setState({ new: false })
    }
    render() {
        return (
            <View style={styles.home}>
                {
                    (this.state.new ?
                        <Text style={styles.headtext}>New Trip</Text>
                        :
                        <TouchableOpacity style={styles.new} onPress={this.newTrip}>
                            <Text style={styles.text}>+ new trip</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    (this.state.new ?
                        <Updater bus='' showTrips={this.showTrips} />
                        :
                        <ScrollView contentContainerStyle={styles.scroll}>
                            {this.state.trips.map((trip, index) => (<TripHolder key={index} id={trip.id} from={trip.from} to={trip.to} fare={trip.fare} active={trip.active} />))}
                        </ScrollView>
                    )
                }
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
    new: {
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#0455bf",
        padding: 10,
        marginBottom:10
    },
    headtext: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#0455bf",

    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    },
    scroll: {
        width: "100%",
        alignItems: "center",
        padding: 10
    }
})