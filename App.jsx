import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './GlobalNavigator/Navigation'
import { GlobalProvider } from './Components/Context/Context'

const App = () => {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  )
}

export default App

const styles = StyleSheet.create({})