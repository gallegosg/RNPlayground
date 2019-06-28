import FileStream from './FileStream';
import EmailFormatVerify from './EmailFormatVerify';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Home from './Home';
import WebView from './Webview'
import Auth from './Auth'
import Camera from './Camera'

const Navigation = createStackNavigator({
    Home: {
        screen: Home
    },
    EmailFormatVerify: {
        screen: EmailFormatVerify
    },
    FileStream: {
        screen: FileStream
    },
    WebView: {
        screen: WebView
    },
    Auth: {
        screen: Auth
    },
    Camera: {
        screen: Camera
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#c1d9ff',
        },
    }
});

export default createAppContainer(Navigation);