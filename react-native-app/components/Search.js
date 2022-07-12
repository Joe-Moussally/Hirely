import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Search = ({setValue}) => {

    return (
        <View style={styles.container}>

                <Ionicons name="search" size={30} color="#969696" style={styles.icon}/>
                <TextInput
                placeholder="Search Jobs..."
                onChangeText={input => setValue(input)}
                style={styles.input}/>

        </View>
    );
}
 
export default Search;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        margin:10,
    },
    input:{
        fontSize:17,
        padding:5,
        color:'#737373'
    },
    icon:{
        padding:5
    }
})