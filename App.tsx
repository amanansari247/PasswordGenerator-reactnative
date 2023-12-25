import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
const passwordschema =  Yup.object().shape({
  passwordLength: Yup.number().min(4,'Should be Min of 4 Characters')
  .max(16,'Should be max of 16 Characters').required('Length is Required')
})

export default function App() {
  const [password,setpassword] = useState('');
  const [ispasswordgenerated,setispasswordgenerated] = useState(false)
  const [lowercase,setlowercase] = useState(true)
  const [uppercase,setuppercase] = useState(false)
  const [symbol,setsymbol] = useState(false)
  const [numbers,setnumbers] = useState(false)
  const generatepassword = (passwordlength:number)=>{
  
    let charachterlist = '';
    const uppercaselist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberlist = '0123456789'
    const lowercaselist = 'abcdefghijklmnopqrstuvwxyz'
    const symbollist = '@!~#$%^&*()_+='
    if(uppercase){
      charachterlist+=uppercaselist
    }
    if(lowercase){
      charachterlist+=lowercaselist
    }
    if(numbers){
      charachterlist+=numberlist
    }
    if(symbol){
      charachterlist+=symbollist
    }
    const passwordresult = createpassword(charachterlist,passwordlength)
    setpassword(passwordresult)
    setispasswordgenerated(true);
    
  }

  const createpassword =(character:string, passwordlength:number) =>{
   let result = ''
   for (let i = 0; i < passwordlength; i++) {
    const characterindex = Math.round(Math.random() * character.length)
    result += character.charAt(characterindex)
    
   }
   return result;
  }
  const resetpasswordstate = ()=>{
    setpassword('')
    setispasswordgenerated(false)
    setuppercase(false)
    setlowercase(true)
    setsymbol(false)
    setnumbers(false)

  }
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})