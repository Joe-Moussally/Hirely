import { Image, StyleSheet, Text, View } from "react-native";

const UserCard = ({user}) => {
    return (

        <View style={styles.container}>

            {
                //check user's picture
                user.picture?
                <Image
                style={styles.picture}
                source={user.picture}/>:
                <Image
                style={styles.picture}
                source={require('../assets/profile/default_picture.jpg')}/>
            }

            {/* flex direct column */}
            
            <Text style={styles.username}>{user.name}</Text>

        </View>
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
        width:90,
        height:90,
        margin:8,
        marginRight:25,
        borderRadius:45,
        borderWidth:1,
        borderColor:'gray'
    },
    username:{
        fontSize:20,
        fontWeight:'500',
    }
})