import {styles} from '../styles';
import React, { Component, DeviceEventEmitter } from 'react-native'; 
import {titleService} from '../titleService';
import {titles} from '../titles';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {Scenes} from '../globals';
var {
  Navigator,
  View,
  Text,
  NativeModules
} = React;

for(var i in NativeModules){
    console.log(i);
}

var  {NearFieldCommunications} = NativeModules; 
console.log(NearFieldCommunications);
import ServiceOrderList  from '../components/ServiceOrderList';
import DashBoard from '../components/DashBoard';
import Assignment from '../components/Assignment';
import SBNavBar from '../components/SBNavBar';

class FieldForceAppAndroid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nfctexts: []
        }
    } 
    componentDidMount(){
        var me = this;
        this.props.getOrdersAsync();
        DeviceEventEmitter.addListener('nfcText', function(e) {
            console.log(e);
            // me.state.nfctexts.push(e);
            me.setState({
                nfctexts: [...me.state.nfctexts, e]
            })
        });
        setTimeout(function(){
            console.log('setting message');
            NearFieldCommunications.setMessage('a message was set from react : ' + Date.now());
            console.log('set message');
        }, 3000);
        
        setInterval(function(){
              console.log('expose Intent');
            NearFieldCommunications.exposeIntent();
              console.log('exposed Intent');
        }, 5000);
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
                        <Text style={{fontSize: 20}}>
                            Nfc texts : {this.state.nfctexts.length}
                        </Text>
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
                renderScene={this.renderScene.bind(this)}
                navigationBar={<SBNavBar  />}
                initialRoute={Object.assign({},Scenes.DASHBOARD)} />
        );
    }
}

FieldForceAppAndroid.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(FieldForceAppAndroid);