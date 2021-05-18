import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,SafeAreaView,Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedBooksList : []
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("requested_books")
    .onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedBooksList : requestedBooksList
      });
    })
  }

  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      
      <ListItem 
        key={i}    bottomDivider>
        <ListItem.Content>
        <Image style = {{height: 50, width:50}} source = {{uri : item.image_link}}/>
            <ListItem.Title style= {{color: 'black',fontWeight:"bold"}}> {item.book_name}</ListItem.Title>
            <ListItem.Subtitle style={{color : 'green'}}>{item.reason_to_request}</ListItem.Subtitle>
            <TouchableOpacity style={styles.button}
             onPress ={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details": item})
              }}
            >
                <Text style={{color :'#ffff'}}>View</Text>

            </TouchableOpacity>
        </ListItem.Content>
     
          </ListItem>
    )
  }

  render(){
    return(
     
      <View style={{flex:1}}>
        <MyHeader title="Donate Books" navigation={this.props.navigation} />
        <View style={{flex:1}}>
          {
            this.state.requestedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:80,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})