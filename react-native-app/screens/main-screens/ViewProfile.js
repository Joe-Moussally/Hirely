import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View,Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";
import { globalStyles } from "../../styles/global";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ViewProfile = ({route}) => {

    const navigation = useNavigation()

    const [user,setUser] = useState(route.params.user)
    const [signedInUser,setSignedInUser] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('user').then(obj=>{
            setSignedInUser(JSON.parse(obj))
        })
    },[])

    return (
        <View style={[globalStyles.container,{backgroundColor:'white'}]}>

            {
                user.picture_base64?
                <Image
                style={globalStyles.profilePicture}
                source={{uri:'data:image/png;base64,'+user.picture_base64}}/>:
                <Image
                style={globalStyles.profilePicture}
                source={require('../../assets/profile/default_picture.jpg')}/>
            }
            <Text style={styles.username}>{user.name}</Text>

            <TouchableNativeFeedback onPress={() => {
                navigation.pop()
                navigation.pop()
                navigation.navigate('Chats',{
                    screen:'ChatStack',
                    params: {
                        contact:route.params.user,
                        user:signedInUser
                    }
                })
                }}>
                <View style={globalStyles.outlineButton}>
                    <Text style={globalStyles.outlineButtonText}>Message</Text>
                </View>
            </TouchableNativeFeedback>

        </View>
    );
}
 
export default ViewProfile;

const styles = StyleSheet.create({
    username:{
        fontSize:26,
        fontWeight:'600',
        alignSelf:'center',
        margin:20
    }
})