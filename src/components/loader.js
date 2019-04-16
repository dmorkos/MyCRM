/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from './node_modules/react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';


const styles = StyleSheet.create({
   loader: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },


});
// creating a statless component, doesnt do much but returns a function 
// <Activity size ={size || 'small' } />  is a size isnt mentioned use small size 
const Loader = ({ size }) => {
    return (
        <View style = {styles.loader}>
            <ActivityIndicator size ={size || 'small' } /> 
        </View>
    );
};
export default Loader;