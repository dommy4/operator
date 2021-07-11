import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import Tripholder from './Tripholder'
import Updater from './Updater'
import { Icon } from 'react-native-elements/dist/icons/Icon'
export default class Trips extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new: false,
        }
        this.newTrip = this.newTrip.bind(this);
        this.showTrips = this.showTrips.bind(this);
    }
    newTrip() {
        this.setState({ new: true })
    }
    showTrips() {
        this.setState({ new: false })
    }

    render() {
        return (
            <View style={styles.trips}>
                {this.state.new ?
                    <>
                        <Text style={styles.headtext}>New Trip</Text>
                        <Updater bus='' showTrips={this.showTrips} />
                    </>
                    :
                    <>
                        <TouchableOpacity style={styles.new} onPress={this.newTrip}>
                            <Text style={styles.text}>New</Text>
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scroll}>
                            {this.props.trips.map((trip, index) => (<Tripholder key={index} id={trip.id} from={trip.from} to={trip.to} fare={trip.fare} active={trip.active} />))}
                        </ScrollView>
                    </>

                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    add:{
        marginRight:20
    },
    trips: {
        flex: 1,
        alignItems: "center",
        width:"100%"
    },
    new: {
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#0866e0",
        padding: 15,
        marginBottom: 10,
        flexDirection:"row",
        justifyContent:"center"
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
        padding: 10,
        paddingBottom: 80
    }

})