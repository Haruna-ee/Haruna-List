import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity, FlatList, Modal} from 'react-native';
import { colors } from './utils';
import {AntDesign} from "@expo/vector-icons"
import data from './assets/data';
import TodoList from './src/components/TodoList';
import AddTodo from './src/screens/AddTodo';

class App extends Component {
  state = {
    modalOpen: false,
    lists: data
  }

toggleModal = () => {
  this.setState({modalOpen: !this.state.modalOpen})
}

addList = list => {
  const lists = this.state.lists
  this.setState({lists: [...lists, {...list, id: lists.length + 1, todos: []}]})
}

updateList = list => {
  const lists = this.state.lists
  this.setState({lists: lists.map(item => item.id === list.id ? list : item)})
}

renderList = (list) => (
  <TodoList list={list} updateList={this.updateList} />
)

  render(){
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          >
         
           <AddTodo toggleModal={this.toggleModal} addList={this.addList} />
         
        </Modal>
        <View style={styles.headerContainer}>
          <View  style={styles.divider}/>
          <Text style={styles.title}>
            Haruna's <Text style={styles.subTitle}>Todo</Text>
          </Text>
          <View  style={styles.divider}/>
        </View>

        <View style={{marginVertical: 48}}>
          <TouchableOpacity style={styles.addBtn} onPress={this.toggleModal}>
          <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.addTodo}>Add Todo</Text> 
        </View>

        <View style={{height: 275, paddingLeft: 32}}>
          <FlatList 
          data={this.state.lists}
          renderItem={({item}) => this.renderList(item) } 
          keyExtractor={item => item.name} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          />
        </View>

      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: "row"
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  subTitle: {
    fontWeight: "300",
    color: colors.blue
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64
  },
  addBtn: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  addTodo: {
    color: colors.blue,
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  }

});

export default App
