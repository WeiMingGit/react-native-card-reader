import React from 'react'
import {
  View, Text, Button
} from 'react-native'
import NfcCardReader from 'react-native-nfc-card-reader';

class App extends React.Component {

  state = {
      cardNumber : null,
      expiryDate : null,
      cardType : null,

   }


   async startScan(){
    let that = this;
    await NfcCardReader.startNfc(function(cardDetails){
      console.log(cardDetails)
      that.setState({cardNumber : cardDetails.cardNumber})
      that.setState({expiryDate : cardDetails.expiryDate})
      that.setState({cardType : cardDetails.cardType})

     })
  }

  render() {
    return (
      <View style={{flex:1,justifyContent: 'center',margin:20, alignContent:'center'}}>
        <Button title="Start NFC Scan!" onPress={() => {this.startScan()}} ></Button>
        <Text>Card Number: {this.state.cardNumber}</Text>
        <Text>Expire Date: {this.state.expiryDate}</Text>
        <Text>Card Type: {this.state.cardType}</Text>

      </View>
    )
  }

}

export default App
