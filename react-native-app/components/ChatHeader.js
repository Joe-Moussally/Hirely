import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";

const ChatHeader = ({contactId}) => {

    useEffect(()=>{
        //get the user's information
    },[])

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Ionicons
                name="arrow-back"
                size={26}
                color="black"
                style={styles.backArrow}/>
                
            </TouchableOpacity>
            <Text>{contactId}</Text>

        </View>
    );
}
 
export default ChatHeader;

const styles = StyleSheet.create({
    headerContainer:{
        height:55,
        width:'100%',
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center'
    },
    backArrow:{
        margin:10,
    }
})