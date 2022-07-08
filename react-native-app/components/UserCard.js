import { Image, StyleSheet, View } from "react-native";

const UserCard = ({user}) => {
    return (

        //flex direction row
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
            <View >

            </View>

        </View>
    );
}
 
export default UserCard;

const styles = StyleSheet.create({
    container:{
        width:'100%',
    }
})