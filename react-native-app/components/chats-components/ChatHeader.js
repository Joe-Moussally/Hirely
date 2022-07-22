import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const ChatHeader = ({contact}) => {

    //defining react navigation
    const navigation = useNavigation()

    // const [contact,setContact] = useState('')

    // useEffect(()=>{
    //     //get the user's information
    //     axios({
    //         method:'GET',
    //         url:'http://'+localhost+':8000/api/users/'+contactId,
    //     }).then((res) => {
    //         setContact(res.data.contact[0])
    //     })
    // },[])

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
            onPress={()=> navigation.navigate('ChatsStack')}>
                <Ionicons
                name="arrow-back"
                size={26}
                color="white"
                style={styles.backArrow}/>
                
            </TouchableOpacity>

            {
                contact.picture_base64?
                <Image
                source={{uri:'data:image/png;base64,'+contact.picture_base64}}
                style={styles.picture}/>:
                <Image
                style={styles.picture}
                source={require('../assets/profile/default_picture.jpg')}/>
            }


            <Text style={styles.name}>{contact.name}</Text>

        </View>
    );
}
 
export default ChatHeader;

const styles = StyleSheet.create({
    headerContainer:{
        height:65,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'gray',
        borderBottomWidth:.4,
        backgroundColor:'#00a6ff'
    },
    backArrow:{
        margin:10,
    },
    picture:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:2,
        borderColor:'white'
    },
    name:{
         fontSize:21,
         fontWeight:'600',
         marginHorizontal:20,
         color:'white'
    }
})