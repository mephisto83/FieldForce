
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {styles} from '../styles';
import {titleService} from '../titleService';
import {titles} from '../titles';
 
var {
  View,
  Text,
  TouchableOpacity
} = React;


export class ServiceOrderHighlight extends Component {
    render () {
        const { state, dispatch } = this.props;
        return (
            <TouchableOpacity onPress={this.props.press}>
                <View style={styles.serviceOrderHighlightContainer}>
                    
                    <Text style={styles.serviceOrderHighLightText}>
                        {this.props.text}
                    </Text>
                    <Text style={styles.serviceOrderHighLightCountText}>
                        {this.props.count} 
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

ServiceOrderHighlight.propTypes = {};
