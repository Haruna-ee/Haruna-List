
import React, {useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors, backgroundColors } from '../../utils'
import data from '../../assets/data'


const AddTodo = ({toggleModal}) => {
    const [name, setText] = useState("")
    const [color, setColor] = useState(backgroundColors[0])

    const addTodo = () => {
        data.push({name, color, todos: []})
        setText("")
        toggleModal()
    }

    const renderColorSelector = () => (
        backgroundColors.map(color => (
        <TouchableOpacity 
            key={color} 
            style={[styles.colorSelector, {backgroundColor: color}]} 
            onPress={() => setColor(color)}
        />
        ))
    )
    
    return (
       <KeyboardAvoidingView style={styles.container} behavior="padding">
           <TouchableOpacity style={{position: "absolute", top: 30, right: 32}} onPress={toggleModal}>
                <AntDesign name="close" size={24} color={colors.black} />
           </TouchableOpacity>
           <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
               <Text style={styles.title}>
                   Create todo list
               </Text>
               <TextInput style={styles.input} placeholder="List Name" value={name} onChangeText={setText} />
               <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>
                   {renderColorSelector()}
               </View>
               <TouchableOpacity style={[styles.add, {backgroundColor: color}]} onPress={addTodo}>
                   <Text style={{color: colors.white, fontWeight: "600", textTransform:"uppercase"}}>
                    Add
                   </Text>
               </TouchableOpacity>
           </View>
       </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        alignSelf: "center",
        color: colors.black,
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        height: 50,
        borderRadius: 6,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },

    add: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    colorSelector: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})

export default AddTodo




