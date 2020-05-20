import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity, FlatList, Modal} from 'react-native';
import { colors } from './utils';
import {AntDesign} from "@expo/vector-icons"
import data from './assets/data';
import TodoList from './src/components/TodoList';
import AddTodo from './src/screens/AddTodo';

class App extends Component {
  state = {
    modalOpen: false
  }

toggleModal = () => {
  this.setState({modalOpen: !this.state.modalOpen})
}

  render(){
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          >
         
           <AddTodo toggleModal={this.toggleModal} />
         
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
          data={data}
          renderItem={({item}) => (
           <TodoList list={item} />
          ) } 
          keyExtractor={item => item.name} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} />
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
