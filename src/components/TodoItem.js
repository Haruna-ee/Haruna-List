import React, {useState} from 'react'
import { StyleSheet, 
    Text, View , 
    SafeAreaView, 
    TouchableOpacity, 
    FlatList, 
    KeyboardAvoidingView, 
    TextInput,
    Keyboard,
    Alert
}  from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { colors } from '../../utils'

const TodoItem = ({list, toggleListModal, updateList}) => {
    const [newTodo, setNewTodo] = useState("")
    const totalCount = list.todos.length
    const completed = list.todos.filter(todo => todo.completed).length
    

    const toggleTodoCompleted = index => {
        let currentList = list
        currentList.todos[index].completed = !currentList.todos[index].completed 

        updateList(currentList)
    }

    const addTodo = () => {
        let currentList = list;
        if(!newTodo) return
        currentList.todos.push({title: newTodo, completed: false}) 
        updateList(currentList)
        setNewTodo("")
        Keyboard.dismiss()
    }

    const deleteTodod = (index) => {
        let currentList = list;
       
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this todo?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                    currentList.todos.splice(index, 1) 
                    updateList(currentList)
                },
              },
            ],
            { cancelable: true }
          );
    }

 

    const renderList = (todo, index) => (
       
        <View style={styles.todoContainer}>
            <TouchableOpacity style={[styles.deleteBtn]} onPress={()=> deleteTodod(index)}>
                <AntDesign name="delete" size={16} color={colors.red}  />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
                <Ionicons 
                  name={todo.completed ? "ios-square" : "ios-square-outline"} 
                  size={24} 
                  color={colors.grey} 
                  style={{width:32}} />
            </TouchableOpacity>
            
            <Text 
              style={[styles.todo, {color: todo.completed ? colors.grey : colors.black, 
                    textDecorationLine: todo.completed ? "line-through": "none",}
                    ]}>
                {todo.title}
            </Text>
           
        </View>
       
    )
    
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{position: "absolute", top: 30, right: 32, zIndex: 10}} onPress={toggleListModal}>
                <AntDesign name="close" color={colors.black} size={24} />
            </TouchableOpacity>
            <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                <View>
                    <Text style={styles.title}>{list.name}</Text>
                    <Text style={styles.count}>{completed} of {totalCount} task(s) completed</Text>
                </View>
            </View>
            <View style={[styles.section, {flex: 3}]}>
                <FlatList 
                  data={list.todos}
                  renderItem={({item, index}) => renderList(item, index) } 
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingHorizontal:32, paddingVertical: 64}}
                />
            </View>
            <View style={[styles.section, styles.footer]} >
                <TextInput style={[styles.input, {borderColor: list.color}]} value={newTodo} onChangeText={setNewTodo} />
                <TouchableOpacity style={[styles.add, {backgroundColor: list.color}]} onPress={addTodo}>
                    <AntDesign name="plus" size={16} color={colors.white} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    count: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    add: {
        padding: 16,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },

    deleteBtn: {
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 40
        //alignSelf: "flex-end"
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    }
})

export default TodoItem


