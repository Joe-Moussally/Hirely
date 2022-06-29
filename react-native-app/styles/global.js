import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
    },
    blueTitle: {
        fontSize:32,
        fontWeight:'bold',
        color:'#00a6ff'
    },
    input:{
        borderWidth:2,
        borderColor:'#808080',
        borderRadius:10,
        fontSize:21,
        padding:10,
    },
    inputContainer: {
        marginVertical: 10
    },
    inputLabel:{
        margin:5,
        fontWeight:'bold'
    },
    //buttons
    fullWidthButton:{
        backgroundColor:'#00a6ff',
        borderRadius:10,
        marginVertical: 20
    },
    fullWidthButtonText:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        fontSize:21,
        marginVertical: 7
    }
})