import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const Requirement = ({ text,key,removeRequirement }) => {
    return ( 
        <View style={styles.requirementContainer}>
            <Text style={{fontSize:17}}>• {text}</Text>

            <TouchableOpacity
            style={styles.removeContainer}
            onPress={removeRequirement}>
                <Entypo name="minus" size={24} color="black" style={styles.removeIcon}/>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>

        </View>
     );
}
 
export default Requirement;

const styles = StyleSheet.create({
    requirementContainer:{
        borderWidth:1,
        borderColor:'#d1d1d1',
        borderRadius:4,
        marginVertical:7,
        padding:3
    },
    removeContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        justifyContent:'flex-end',
    },
    removeIcon:{
        color:'red',
        margin:5
    },
    removeText:{
        color:'#b80000',
        fontWeight:'bold',
        marginRight:10
    }
})