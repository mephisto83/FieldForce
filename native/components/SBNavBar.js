import React, { Component, Navigator, TouchableOpacity, Text, PropTypes, StyleSheet } from 'react-native'
import {styles, styleColors} from '../styles';
var { Icon } = require('react-native-icons');
class SBNavBar extends Component {
  render () {
    const routeMapper = {
      LeftButton: (route, navigator, index, navState) => {
        if (index === 0) {
          return null
        }
        const previousRoute = navState.routeStack[index - 1]
        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}>
            <Icon
                name={"ion|arrow-left-c"}
                size={20}
                color={styleColors.ICON_BUTTON_COLOR} 
                style={{height: 20, width: 20}} />
            <Text style={styles.navText}>
              {previousRoute.title}
            </Text>
          </TouchableOpacity>
        )
      },
      RightButton: (route, navigator, index, navState) => {
        if (route.rightElement) {
          return route.rightElement
        }
      },
      Title: (route, navigator, index, navState) => {
        return (
          <Text style={[styles.navText, styles.navBarTitleText]}>{route.title}</Text>
        )
      }
    }
    return (
      <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={routeMapper}
        {...this.props}
      />
    )
  }
}

SBNavBar.propTypes = {
  ...Navigator.NavigationBar.propTypes
}
 
export default SBNavBar