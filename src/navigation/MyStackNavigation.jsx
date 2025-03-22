import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WallPaperScreen from '../screens/WallPaperScreen';
import CollectionScreen from '../screens/CollectionScreen';
import CollectionWallpaperScreen from '../screens/CollectionWallpaperScreen';
import SearchScreen from '../screens/SearchScreen';
import LikeScreen from '../screens/LikeScreen';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WallPaperScreen" component={WallPaperScreen} />
    </Stack.Navigator>
  );
}

export function CollectionStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen
        name="CollectionWallpaperScreen"
        component={CollectionWallpaperScreen}
      />
      <Stack.Screen name="WallPaperScreen" component={WallPaperScreen} />
    </Stack.Navigator>
  );
}

export function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="WallPaperScreen" component={WallPaperScreen} />
    </Stack.Navigator>
  );
}

export function LikeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LikeScreen" component={LikeScreen} />
      <Stack.Screen name="WallPaperScreen" component={WallPaperScreen} />
    </Stack.Navigator>
  );
}
