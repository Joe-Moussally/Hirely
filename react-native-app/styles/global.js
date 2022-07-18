import { Dimensions, StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'white'
    },
    blueTitle: {
        fontSize:32,
        fontWeight:'bold',
        color:'#00a6ff'
    },
    input:{
        borderWidth:2,
        borderColor:'#004f70',
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
    },
    //ouline button
    outlineButton:{
        width:'85%',
        borderColor:'#00aeff',
        borderRadius:10,
        borderWidth:4,
        color:'red',
        marginVertical:10,
        marginHorizontal:'7.5%',
        paddingVertical:7
    },
    outlineButtonText:{
        color:'#00aeff',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:19
    },
    //profile screen
    profilePicture:{
        alignSelf:'center',
        borderWidth:3,
        borderColor:'#0096ed',
        width:200,
        height:200,
        borderRadius:Dimensions.get('window').width/2,
    },
    loadingContainer:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    skillsContainer:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    skillCard:{
        margin:10,
        backgroundColor:'#00b3ff',
        paddingHorizontal:12,
        paddingVertical:5,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    skillText:{
        fontSize:19,
        fontWeight:'bold',
        color:'white'
    },
    removeSkillIcon:{
        marginLeft:5
    },
    sectionContainer:{
        marginVertical:10,
    },
    sectionTitle:{
        fontSize:21,
        fontWeight:'bold',
        color:'#205a8a'
    },
    sectionBody:{
        marginLeft:10,
        marginTop:10,
        fontSize:16,
        
    },
    //whatsapp button
    whatsappButtonContainer:{
        width:'85%',
        borderColor:'#6adb00',
        borderRadius:10,
        borderWidth:4,
        color:'red',
        marginVertical:10,
        marginHorizontal:'7.5%',
        paddingVertical:7,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    whatsappButtonText:{
        color:'#6adb00',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:19
    }

},)

export { globalStyles }