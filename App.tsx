import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Formik } from 'formik'
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
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Password Generator
          </Text>
          <Formik
          
       initialValues={{ passwordLength : '' }}
      validationSchema={passwordschema}
       onSubmit={values=>{
       generatepassword(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          
          <View style={styles.inputColumn}>
          <Text style={styles.heading}>Password length</Text>
          {touched.passwordLength && errors.passwordLength&&
          (<Text style={styles.errorText}>
            {errors.passwordLength}
          </Text>)}
           
          </View>
          <TextInput style={styles.inputStyle} 
           value={values.passwordLength}
           onChangeText={handleChange('passwordLength')}
           placeholder='Ex-7'
           keyboardType='numeric'
           />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>
            Include lower Case
          </Text>
          <BouncyCheckbox disableBuiltInState 
          isChecked={lowercase}
          onPress={()=> setlowercase(!lowercase)}
          fillColor='#29AB87'
          />
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setuppercase(!uppercase)}
                    fillColor="#FED85D"
                  />
        </View>
        <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setnumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setsymbol(!symbol)}
                    fillColor="#FC80A5"
                  />
                </View>
        <View style={styles.formActions}>
          <TouchableOpacity disabled={!isValid}
          style={styles.primaryBtn}
          onPress={()=>handleSubmit()}
          
          ><Text style={styles.primaryBtnTxt}>Generate password</Text></TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=> {
            handleReset();
            resetpasswordstate();
          }}
          
          ><Text  style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
        </View>
        </>
       )}
     </Formik>
        </View>
        {
          ispasswordgenerated ? (
            <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.subTitle}>Password Generated Successfully</Text>
              <Text style={styles.description}>Long Press To Copy</Text>
              <Text  selectable={true} style={styles.generatedPassword}>{password}</Text>
            </View>
          ):null
        }
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    textAlign:'center',
    
  },
  subTitle: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 2,
    color: '#758283'
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontFamily: "Font",
    fontSize: 17,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
  },
  inputWrapper: {
    marginTop:13,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:12
  },
  primaryBtn: {
    width: 150,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 150,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color:'black'
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})