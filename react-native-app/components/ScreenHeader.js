import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";

const ScreenHeader = ({ text, }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
            onPress={() => {navigation.pop()}}>
                <AntDesign name="back" size={24} color="black" style={{marginRight:20}}/>
            </TouchableOpacity>
            <Text style={styles.blueTitle}>{text}</Text>
        </View>
    );
}
 
export default ScreenHeader;

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:'white',
        padding:5,
        flexDirection:'row',
        alignItems:'center',
    },
    blueTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:'#00a6ff',
        flexWrap:'wrap',
        width:'90%'
    }
})