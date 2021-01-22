/*
Ez Barter App
Phone item swapping app developed by Franco Mattos
*/

import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, View, Image, StatusBar } from "react-native";

// Imports React Navigation components
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import { useAuth, AuthProvider } from "./Components/Database/AuthProvider";
import { LogInView } from "./Components/LogInView";
import { RegisterView } from "./Components/RegisterView";
import { SearchPage } from "./Components/SearchPage";
import { MyAccount } from "./Components/MyAccount";
import { MyItems } from "./Components/MyItems";

// Initializes the bottom tab navigation
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // Wraps navigation inside auth provider for behavior pending on login state
    <AuthProvider>
      <NavigationContainer>
        <NavigationMain />
      </NavigationContainer>
    </AuthProvider>
  );
};

// This is the navigation menu, if login or register no buttons to click, when user logins it allows navigation.
function NavigationMain() {
  const { user } = useAuth();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      {user == null ? (
        // No token found, user isn't signed in
        <>
          <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
              tabBarVisible: false,
            }}
          />
          <Tab.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{
              title: "Register",
              tabBarVisible: false,
            }}
          />
        </>
      ) : (
        // User is signed in, sets nutton icon and navigation
        <>
          <Tab.Screen
            name="Search"
            component={SearchPage}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color }) => (
                <Icon name="search-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="MyItems"
            component={MyItems}
            options={{
              tabBarLabel: "MyItems",
              tabBarIcon: ({ color }) => (
                <Icon name="pricetags-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Header"
            component={MyAccount}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color }) => (
                <Icon name="person-outline" color={color} size={26} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

//Returns sign in layout with app logo
function SignIn() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ padding: 30 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./logo.png")}
              style={{ width: 240, height: 240 }}
            />
          </View>
          <LogInView />
        </View>
      </SafeAreaView>
    </>
  );
}

//Returns registration page with app logo
function RegisterPage() {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ padding: 30 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./logo.png")}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <RegisterView />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default App;
