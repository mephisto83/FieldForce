import {styles} from '../styles';
import React, { Component } from 'react-native'; 
import {titleService} from '../titleService';
import {titles} from '../titles';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {Scenes} from '../globals';

var {
  Navigator,
  View,
  Text
} = React;

import ServiceOrderList  from '../components/ServiceOrderList';
import DashBoard from '../components/DashBoard';
import Assignment from '../components/Assignment';

class FieldForceAppAndroid extends Component {
    constructor(props) {
        super(props);
    } 
    componentDidMount(){
        this.props.getOrdersAsync();
    }
    renderScene (route, nav) {
        switch(route.id){
            case Scenes.ASSIGNMENT:
                return (
                    <Assignment navigator={nav} />
                )
            case Scenes.SERVICE_ORDER_LIST:
                return (
                    <ServiceOrderList navigator={nav} />
                );
             default:
                return (
                    <DashBoard navigator={nav} />
                );
        }
    }
    render () {
       const { state, dispatch } = this.props;
       
        return (
            <Navigator 
                style={[styles.container, styles.rootStyle]}
                renderScene={this.renderScene}
                initialRoute={{
                    id: Scenes.DASHBOARD,
                    index: 0,
                    title: titleService.get(titles.DashBoard, 'DashBoard')
                }} />
        );
    }
}

FieldForceAppAndroid.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(FieldForceAppAndroid);