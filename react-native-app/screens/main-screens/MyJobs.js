import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from '../../styles/global'
import { MaterialIcons } from '@expo/vector-icons';

export default function MyJobs() {
    return (
        <View style={globalStyles.container}>
            <Text>MyJobs</Text>
            <TouchableOpacity style={styles.add}>
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
        top:'85%'
    },
    plus:{
        alignSelf:'center',
        marginTop:15
    }
})