import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

import Home from './home';
import AdicionarTreino from './AdicionarTreino';
import TreinoDetails from './TreinoDetails';
import TreinoList from './TreinoList';

const Stack = createStackNavigator<RootStackParamList>();

export default function MyStack() {
    return ( 
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AdicionarTreino" component={AdicionarTreino} />
                <Stack.Screen name="TreinoDetails" component={TreinoDetails} />
                <Stack.Screen name="TreinoList" component={TreinoList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}