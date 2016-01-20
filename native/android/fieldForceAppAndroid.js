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
import SBNavBar from '../components/SBNavBar';

class FieldForceAppAndroid extends Component {
    constructor(props) {
        super(props);
    } 
    componentDidMount(){
        this.props.getOrdersAsync();
    }
    renderScene (route, nav) {
        switch(route.id){
            case Scenes.ASSIGNMENT.id:
                return (
                    <View style={styles.ApplicationContainer}>
                        <Assignment navigator={nav} />
                    </View>
                )
            case Scenes.SERVICE_ORDER_LIST.id:
                return ( 
                        <ServiceOrderList navigator={nav} /> 
                );
            default:
                return (
                    <View style={styles.ApplicationContainer}>
                        <DashBoard navigator={nav} />
                    </View>
                );
        }
    }
    //  renderScene (route, nav) {
    //     console.log(route)
    //     var selectedScene; 
    //     switch(route.id){
    //         case Scenes.ASSIGNMENT.id:
    //             selectedScene = (
    //                 <Assignment navigator={nav} />
    //             )
    //         case Scenes.SERVICE_ORDER_LIST.id:
    //             selectedScene = (
    //                 <ServiceOrderList navigator={nav} />
    //             );
    //         default:
    //             selectedScene = (
    //                 <DashBoard navigator={nav} />
    //             );
    //     }
    //     
    //     var scene = (
    //         <View style={styles.ApplicationContainer}>
    //             {selectedScene}
    //         </View>
    //     )
    //     return scene;
    // }
    render () {
       const { state, dispatch } = this.props;
       
        return (
            <Navigator 
                style={[styles.container, styles.rootStyle]}
                renderScene={this.renderScene}
                navigationBar={<SBNavBar  />}
                initialRoute={Object.assign({},Scenes.DASHBOARD)} />
        );
    }
}

FieldForceAppAndroid.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(FieldForceAppAndroid);