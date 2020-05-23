import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from "react-native"
import { colors } from '../../utils';
import TodoItem from './TodoItem';

const TodoList = ({list, updateList}) => {
    const [isListVisible, setListVisble] = useState(false)

    const toggleListModal = () => {
        setListVisble(!isListVisible)
    }

    const completed = list.todos.filter(todo => todo.completed).length
    const remaining = list.todos.length - completed
    return (
    <View>
        <Modal animationType="slide" visible={isListVisible} onRequestClose={toggleListModal}>
            <TodoItem list={list} toggleListModal={toggleListModal} updateList={updateList}/>
        </Modal>
        <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]} onPress={toggleListModal}>
            <Text numberOfLines={1} style={styles.listTiltle}>
            {list.name}
            </Text>

            <View>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.count}>{remaining}</Text>
                    <Text style={styles.subTitle}>Remaining </Text>
                </View>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.count}>{completed}</Text>
                    <Text style={styles.subTitle}>Completed </Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
     
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTiltle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    subTitle: {
        fontSize: 14,
        color: colors.white,
        fontWeight: "700"
    },
    
    count: {
        fontSize: 34,
        fontWeight: "200",
        color: colors.white
    }
})

export default TodoList;

