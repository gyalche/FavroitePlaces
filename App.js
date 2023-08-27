import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Allplaces from './screens/Allplaces';
import Addplace from './screens/Addplace';
import IconButton from './UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}>
          <stack.Screen
            name="AllPlaces"
            component={Allplaces}
            options={({ navigation }) => ({
              title: 'Your Favroite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icons="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <stack.Screen
            name="AddPlace"
            component={Addplace}
            options={{
              title: 'Add a new Place',
            }}
          />
          <stack.Screen name="map" component={Map} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
