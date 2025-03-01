import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Elst from '../../../SvgIcons/Elst'
import PlusIcon from '../../../SvgIcons/PlusIcon'

const Empty = () => {

  return (
    <View style={styles.container}>
      <Elst style={[styles.box]} />

      <View style={[styles.box]} >
        <View style={[styles.card, styles.cardOne]}>
          <Text style={styles.text}></Text>
        </View>

        <View style={[styles.card, styles.cardThree]}>
          <Text style={styles.text}></Text>
        </View>

        <View style={[styles.card, styles.cardTwo]}>
          <Text style={styles.text}></Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.box]} >
        <View style={styles.signInBtn}>
          <Text style={styles.SignInBtnText}>Add Note</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={[styles.add_plus_btn]} >
        <View style={styles.add_button}>
          <PlusIcon />
        </View>
      </TouchableOpacity> */}
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },

  box: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.737, // Border thickness
    borderColor: '#9A9A9A', // Border color
    borderStyle: 'dashed', // Dashed border
    borderRadius: 12.593, // Rounded corners
    backgroundColor: '#FAFAFA',
    position: 'absolute', // Stacks them on top of each other
  },
  cardOne: {
    width: 113,
    height: 130,
    bottom: -40,
    right: -40,
    transform: [{ rotate: '-8.841deg' }],
  },
  cardTwo: {
    width: 113,
    height: 150,
    bottom: -50,
    transform: [{ rotate: '0deg' }], // Normal, no rotation
  },
  cardThree: {
    width: 113,
    height: 131,
    bottom: -40,
    left: -40,
    transform: [{ rotate: '11.165deg' }],
  },


  signInBtn: {
    backgroundColor: '#598931',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInBtnText: {
    fontSize: 10,
    padding: 8,
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontStyle: 'normal',

  },
  add_plus_btn: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    cursor: 'auto',
  },
  add_button: {
    backgroundColor: 'green',
    width: 64,
    height: 64,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 32,

  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})