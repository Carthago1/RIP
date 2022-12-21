import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';
import BasketScreen from './screens/BasketsScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Военторг' component={ShopScreen} />
                    <Stack.Screen name='Товар' component={ProductScreen} />
                    <Stack.Screen name='Корзина' component={BasketScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
