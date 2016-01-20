
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {styles, styleColors} from '../styles';
import {ServiceOrderHighlights} from './ServiceOrderHighlights';
import {Scenes} from '../globals';
 
var {
  View,
  TouchableOpacity,
  Text
} = React;


var { Icon } = require('react-native-icons');


export class BottomImageBtn extends Component {
    render () {
        const { state, dispatch } = this.props;
        return (
             <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{flex: 1, flexDirection: 'column', alignItems: 'center' }, styles.bottomImageBtn]}>
                    <Icon
                        name={this.props.icon}
                        size={25}
                        color={styleColors.ICON_BUTTON_COLOR} 
                        style={styles.bottomIconImages} />
                    <Text style={[styles.buttonIconText]}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
 
 BottomImageBtn.propTypes = {};