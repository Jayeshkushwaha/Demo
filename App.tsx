import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './screens/HomeScreen';
import DeviceDetailsScreen from './screens/DeviceDetailsScreen';
import AccountScreen from './screens/AccountScreen';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#7e4e95" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              padding: 10,
              width: '100%',
              height: 84,
              zIndex: 0,
              paddingBottom: 10,
            },

            tabBarIcon: ({ focused }) => {
              let iconName;
              let iconColor = focused ? '#7e4e95' : 'grey';
              switch (route.name) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Device Details':
                  iconName = 'list';
                  break;
                case 'Account':
                  iconName = 'user';
                  break;
                default:
                  iconName = 'home';
                  break;
              }
              return <Icon name={iconName} size={30} color={iconColor} />;
            },

            tabBarLabel: ({ focused }) => (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: focused ? '#7e4e95' : 'grey', fontSize: 12 }}>
                  {route.name}
                </Text>
                {focused ? (
                  <View style={styles.dotContainer}>
                    <View style={styles.dot} />
                  </View>
                ) : (
                  <View style={styles.dotContainer}>
                    <View style={{
                      backgroundColor: 'white',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                    }} />
                  </View>
                )}
              </View>
            ),

            headerStyle: {
              backgroundColor: '#7e4e95',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 10,
            },

            headerTintColor: '#fff',

            headerTitleAlign: 'center',
            
            headerRight: () =>
              route.name === 'Home' ? (
                <View style={styles.headerRightContainer}>
                  <Icon
                    name="bell"
                    size={25}
                    color="#fff"
                    style={{ marginRight: 15 }}
                    onPress={() => alert('Notifications')}
                  />
                  <Menu>
                    <MenuTrigger customStyles={{ triggerTouchable: { underlayColor: 'transparent' } }}>
                      <Icon name="more-vertical" size={25} color="white" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => alert('Settings')}>
                        <View style={styles.menuOption}>
                          <Text style={styles.menuText}>Settings</Text>
                          <Icon name="settings" size={20} color="grey" />
                        </View>
                      </MenuOption>
                      <MenuOption onSelect={() => alert('Logout')}>
                        <View style={styles.menuOption}>
                          <Text style={styles.menuText}>Logout</Text>
                          <Icon name="log-out" size={20} color="grey" />
                        </View>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ) : null,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
          <Tab.Screen name="Device Details" component={DeviceDetailsScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    marginTop: 2,
  },
  dot: {
    backgroundColor: '#7e4e95',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
});
