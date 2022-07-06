import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from '../../styles/global'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function MyJobs({navigation}) {

    //track the modal if open or closed
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <View style={globalStyles.container}>

            <Text>MyJobs</Text>


            {/* Add Job Offer Button */}
            <TouchableOpacity
            style={styles.add}
            onPress={()=>navigation.push('AddJobStack')}>
            <MaterialIcons name="add" size={30} color="white" style={styles.plus}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    add:{
        backgroundColor:'#00a6ff',
        width:60,
        height:60,
        borderRadius:30,
        position:'absolute',
        left:'90%',
        top:'100%',
        transform:[{translateY:-120}]
    },
    plus:{
        alignSelf:'center',
        marginTop:15
    },
    //modal
    modalHeader:{
        display:'flex',
        flexDirection:'row'
    }
})