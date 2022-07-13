import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

const Search = ({setValue}) => {

    const [textInput,setTextInput] = useState('')

    return (
        <View style={styles.container}>

                <Ionicons
                name="search" size={30}
                color="#969696" 
                style={styles.icon}/>

                <TextInput
                placeholder="Search Jobs..."
                onChangeText={input => {
                    setValue(input)
                    setTextInput(input)
                    }}
                style={styles.input}/>

                {
                    textInput?
                    <AntDesign
                    name="close" 
                    size={30}
                    color="#969696"
                    style={styles.close}/>
                    :
                    <></>
                }


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
        alignItems:'center'
    },
    input:{
        fontSize:17,
        padding:5,
        color:'#737373'
    },
    icon:{
        padding:5
    },
    close:{
        marginLeft:'auto',
        marginRight:5
    }
})