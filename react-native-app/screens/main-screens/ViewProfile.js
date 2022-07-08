import { useState } from "react";
import { Text, View,Image, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";

const ViewProfile = ({route}) => {

    const [user,setUser] = useState(route.params.user)

    return (
        <View style={[globalStyles.container,{backgroundColor:'white'}]}>

            {
                user.picture?
                <Image
                style={styles.picture}
                source={user.picture}/>:
                <Image
                style={styles.picture}
                source={require('../../assets/profile/default_picture.jpg')}/>
            }
            <Text style={styles.username}>{user.name}</Text>

            

        </View>
    );
}
 
export default ViewProfile;

const styles = StyleSheet.create({
    picture:{
        width:180,
        height:180,
        borderRadius:90,
        borderWidth:2,
        borderColor:'#0096ed',
        alignSelf:'center',
        margin:10
    },
    username:{
        fontSize:26,
        fontWeight:'600',
        alignSelf:'center',
        margin:20
    }
})