import { StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ChatHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={styles.backArrow}/>
            </TouchableOpacity>

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
        borderWidth:1,
        borderColor:'black',
        alignSelf:'center',
        paddingTop:3,
        paddingLeft:3,
        paddingHorizontal:2,
        borderRadius:20
    }
})