import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//firebase
import { collection, getDocs,addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Chats({navigation}) {

    //track the user's chats
    const [chats,setChats] = useState([])
    const [user,setUser] = useState('')

    useEffect(()=>{

        //get the user's chats
        //chats collection reference in firebase
        const chatsRef = collection(db,'chats')

        //get the user's id
        AsyncStorage.getItem('user').then(obj=>{
            setUser(JSON.parse(obj))

            //set query to fetch appropriate messages according to the user's id
            let q1 = query(chatsRef,where('user._id','==',user.id))
            
            let array = []
            getDocs(q1).then((messages) => {
                messages.forEach( message => {
                    array.push({
                        _id: message.data()._id,
                        text: message.data().text,
                        createdAt: message.data().createdAt.toDate(),
                        user: message.data().user,
                    })   
                })

            })

                array.sort((a, b) => b.createdAt - a.createdAt)
                setChats(array)
                console.log('HEREEE NEW',chats)
        }).catch((err) => {
            console.log(err)
        })
        
    },[])

    return (
        <Button title="Go to Chat" onPress={()=>navigation.push('ChatStack')}/>
    )
}