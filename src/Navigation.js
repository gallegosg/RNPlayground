import FileStream from './Screens/FileStream';
import EmailFormatVerify from './Screens/EmailFormatVerify';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Home from './Screens/Home';
import WebView from './Screens/Webview'
import Auth from './Screens/Auth'
import Camera from './Screens/Camera'

const Navigation = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home'
        }
    },
    EmailFormatVerify: {
        screen: EmailFormatVerify
    },
    FileStream: {
        screen: FileStream,
        navigationOptions: {
            title: 'File Save'
        }
    },
    WebView: {
        screen: WebView,
        navigationOptions: {
            title: 'WebView'
        }
    },
    Auth: {
        screen: Auth,
        navigationOptions: {
            title: 'Authentication'
        }
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            title: 'Camera'
        }
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#c1d9ff',
        },
    }
});

export default createAppContainer(Navigation);