import React from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../../styles/global";

export default function SignUp() {
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.blueTitle}>Sign Up</Text>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Full Name</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="John Doe"/>
            </View>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Full Name</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="example@mail.com"/>
            </View>

            <View style={globalStyles.inputContainer}>
                <Text style={globalStyles.inputLabel}>Password</Text>
                <TextInput
                style={globalStyles.input}
                placeholder="Password"
                secureTextEntry={true}/>
            </View>

            <TouchableOpacity style={globalStyles.fullWidthButton}>
                <Text style={globalStyles.fullWidthButtonText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
    )
}