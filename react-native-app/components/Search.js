import { Alert, Modal, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useState } from "react";

const Search = ({setValue}) => {

    const [textInput,setTextInput] = useState('')

    //track if filter modal is visible or not
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.mainContainer}>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <Text>ASD</Text>
            </View>
        </Modal>

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
                    style={styles.input}
                    value={textInput}
                    />

                    {
                        textInput?
                        <AntDesign
                        name="close" 
                        size={30}
                        color="#6b6b6b"
                        style={styles.close}
                        onPress={()=>{
                            setTextInput('')
                            setValue('')
                        }}
                        />
                        :
                        <></>
                    }


            </View>

            {/* Filter Seach */}
            <TouchableNativeFeedback style={{width:30,height:30}} onPress={() => setModalVisible(true)}>
                <Ionicons name="filter" size={24} color="#4f4f4f" />
            </TouchableNativeFeedback>
            
        </View>
    );
}
 
export default Search;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    container:{
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        margin:10,
        width:'85%',
        alignItems:'center'
    },
    input:{
        fontSize:17,
        padding:5,
        color:'#737373',
        width:'100%'
    },
    icon:{
        padding:5
    },
    close:{
        marginLeft:'auto',
        marginRight:5
    },
    modalContainer:{
        backgroundColor:'#fcfcfc',
        flex:1,
        marginVertical:'70%',
        marginHorizontal:'5%',
        borderRadius:20,
        shadowColor:'black',
        elevation:10
    }
})