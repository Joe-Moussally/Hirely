import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ScreenHeader = ({ text, }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
            onPress={() => {navigation.pop()}}>
                <AntDesign name="back" size={24} color="black" style={{marginRight:20}}/>
            </TouchableOpacity>
            <Text style={globalStyles.blueTitle}>{text}</Text>
        </View>
    );
}
 
export default ScreenHeader;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})