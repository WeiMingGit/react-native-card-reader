import React from 'react'
import {
  StyleSheet, View,Button, Text,Image,Dimensions,TextInput
} from 'react-native'
import NfcCardReader from 'react-native-nfc-card-reader';
const {height, width} = Dimensions.get('window');

class App extends React.Component {


  state = {
      number : "",
      exp : "",
      type : "",
      name: "",
   }

   _handleTypeInput(value) {
     if(value.toLowerCase() == "mastercard"){
       this.setState({ type:"./src/assets/mastercard.png" })
     }
     else if(value.toLowerCase() == "visa"){
       this.setState({ type:"./src/assets/visa.png" })
     }
  }



   async startScan(){
    let that = this;
    await NfcCardReader.startNfc(function(cardDetails){
      console.log(cardDetails)
      that.setState({number : cardDetails.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()})
      that.setState({exp : cardDetails.expiryDate})
      that.setState({type : cardDetails.cardType.toLowerCase()})
      that.setState({name : "Hello World"})
     })
  }

  render() {
    return (
      <View style={style.container}>
      <Image style={style.background} source={require('./src/assets/background.png')} resizeMode={'cover'} />

      <View>
        <Image style={style.cc} source={require('./src/assets/creditcard.png')} resizeMode={'cover'} />
        <Text style={{color: "white",fontSize: 30,bottom:width - 290,left:width - 380}}>{this.state.name}</Text>
        <Text style={{color: "white",fontSize: 25,bottom:width - 190,left:width - 380}}>{this.state.number}</Text>
        <Text style={{color: "white",fontSize: 25,bottom:width - 153,left:width - 100}}>{this.state.exp}</Text>
        {this.state.type == "mastercard"
        ?
        <Image style={style.logoIcon} source={require('./src/assets/mastercard.png')} resizeMode={'cover'} />
        :
        <Image style={style.logoIcon} source={require('./src/assets/visa.png')} resizeMode={'cover'} />
        }
      </View>

      <View style={style.body}>
        <View style={style.inputContainer}>
          <Text style={style.label}>NAME</Text>
          <TextInput
            onChangeText={(value) => this.setState({ name:value })}
            placeholder="MIKE CHAN"
            placeholderTextColor="#D3D3D3"
            style={style.input}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>CARD NUMBER</Text>
          <TextInput
            keyboardType={'numeric'}
            maxLength = {16}
            onChangeText={(value) => this.setState({ number:value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
            placeholder="1234 1234 1234 1234"
            placeholderTextColor="#D3D3D3"
            style={style.input}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>EXPIRY DATE</Text>
          <TextInput
            onChangeText={(value) => this.setState({ exp:value })}
            placeholder="08/20"
            placeholderTextColor="#D3D3D3"
            style={style.input}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>TYPE</Text>
          <TextInput
            onChangeText={(value) => this.setState({ type:value.toLowerCase() })}
            placeholder="mastercard/visa"
            placeholderTextColor="#D3D3D3"
            style={style.input}
          />
        </View>
      </View>

      <View style={style.button}>
        <Button color = "black" title="Start NFC Scan!" onPress={() => {this.startScan()}} ></Button>
      </View>




    </View>



    )
  }

}

const style = StyleSheet.create({
  container: {
    flexDirection:'column',
  },
  cc:{
    width:width - 30,
    height:height - 500,
    resizeMode: 'stretch',
    marginVertical: 50,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button:{
    width:width - 300,
    bottom:width - 660,
    left:width - 165
  },
  logoIcon:{
    width:width - 300,
    height:height - 710,
    bottom:width + 45,
    left:width - 125
  },
  body:{
    marginVertical: -240,
    alignSelf: 'center'
  },
  background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height
    },
  inputContainer: {
    marginVertical: 10
  },
  label: {
    color: "white",
    fontSize: 12,
    width: width - 100,
  },
  input: {
    fontSize: 16,
    color: "white",
    borderWidth: 3,
    borderColor: '#ddd',
    padding: 5,
    width: width - 100,
  },
});

export default App
