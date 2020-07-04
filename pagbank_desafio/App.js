import React, { Component} from 'react';
import { Text, StyleSheet,View,FlatList, ActivityIndicator,TouchableOpacity,Image} from 'react-native';

export default class PagBank extends Component {

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        dataSource: [],
         image_url: ''
      }
    }

    componentDidMount() {
      fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      })   
    }

    _renderItem = ({item,index}) => {
      return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => alert(item.description)}>
          <Image style={styles.image} 
            source={{uri: item.image_url}}/>

          <View style={styles.item}>
            <Text style={{fontWeight: 'bold',color: 'yellow'}}>{item.name}</Text>
            <Text style={{fontWeight: 'bold',color: 'white'}}>Teor alcóolico: {item.abv} %</Text>
          </View>
        </TouchableOpacity>
        </View>
      ) 
    }

    render() {
      let {container} = styles
      let {dataSource,isLoading} = this.state
      if(isLoading){
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" animating/>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <FlatList
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item,index) => index.toString()}
            />
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingTop: 50,
    backgroundColor: 'black'
  },
  image: {
    width: 71,
    height: 71,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 10,
    alignSelf: "center",
    backgroundColor: 'white'
  },
  item: {
     padding: 5,
     alignItems: 'center',
     flexDirection: "column",
     justifyContent: "flex-start"
  }
})