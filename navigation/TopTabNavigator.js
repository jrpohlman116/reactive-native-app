import * as React from 'react';
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ListScreen from '../screens/ListScreen';

const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function TopTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
      />
      <Tab.Screen
        name="Settings"
        component={LinksScreen}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'List':
      return 'List of Names';
    case 'Settings':
      return 'Settings';
  }
}
