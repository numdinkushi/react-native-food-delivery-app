import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Text, AppRegistry } from 'react-native';

import CustomDrawer from "./Navigation/CustomDrawer";
import { MainLayout } from './screens'

import {createStore, applyMiddleware,} from 'redux';
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import { Provider } from "react-redux";

const Stack = createStackNavigator();
const store = createStore(

    rootReducer,
    applyMiddleware(thunk)
)

const App = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen
                    name="Home"
                    component={CustomDrawer}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>

    )
}
AppRegistry.registerComponent('Appname', () => App);
export default App