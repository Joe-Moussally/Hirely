import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

const UserCard = ({user}) => {

    const navigation = useNavigation()

    return (

        <TouchableNativeFeedback
        onPress={()=>navigation.push('ViewProfileStack',{user:user})}>
            <View style={styles.container}>

                {
                    //check user's picture
                    user.picture?
                    <Image
                    style={styles.picture}
                    source={{uri:user.picture}}/>:
                    <Image
                    style={styles.picture}
                    source={require('../assets/profile/default_picture.jpg')}/>
                }

                {/* flex direct column */}
                
                <Text style={styles.username}>{user.name}</Text>

            </View>
        </TouchableNativeFeedback>
    );
}
 
export default UserCard;

const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        width:'108%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    picture:{
        margin:8,
        width:'18%',
        aspectRatio:1/1,
        borderRadius:Dimensions.get('window').width/2,
        marginRight:25,
        borderWidth:2,
        borderColor:'#0096ed'
    },
    username:{
        fontSize:20,
        fontWeight:'500',
    }
})