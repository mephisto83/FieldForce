
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {styles} from '../styles';
import {ServiceOrderHighlights} from './ServiceOrderHighlights';
import {Scenes} from '../globals';
 
var {
  View,
  Text
} = React;


class DashBoard extends Component {
    navigateToList(){
        this.props.navigator.push({id: Scenes.SERVICE_ORDER_LIST})
    }
    render () {
        const { state, dispatch } = this.props;
        return (
            <View style={styles.Screen}>
                <ServiceOrderHighlights {...this.props} onPress={this.navigateToList.bind(this)} />
            </View>
        );
    }
}

DashBoard.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(DashBoard);