import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import { RootStackParamList } from "./src/types/RouteScreen";
import Account from "./src/pages/Account";
import EditAccount from "./src/pages/EditAccount";
import SignUp from "./src/pages/SignUp";
import ForgotPassword from "./src/pages/ForgotPassword";
import EmailVerify from "./src/pages/EmailVerify";

const RouteSc = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RouteSc.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <RouteSc.Screen name="Home" component={Home} />
        <RouteSc.Screen name="Login" component={Login} />
        <RouteSc.Screen name="SignUp" component={SignUp} />
        <RouteSc.Screen name="ForgotPassword" component={ForgotPassword} />
        <RouteSc.Screen name="EmailVerify" component={EmailVerify} />
        <RouteSc.Screen name="Account" component={Account} />
        <RouteSc.Screen name="EditAccount" component={EditAccount} />
      </RouteSc.Navigator>
    </NavigationContainer>
  );
};
export default App;
