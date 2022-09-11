import { Text, View, StyleSheet } from "react-native";

const EmptyScreenText = ({text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}
 
export default EmptyScreenText;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'50%',
        alignSelf:'center',
        top:-50
    },
    text:{
        color:'#9c9c9c',
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center'
    }
})