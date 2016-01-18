
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {styles} from '../styles';
import {titleService} from '../titleService';
import {titles} from '../titles';
import {ServiceOrderHighlight} from './ServiceOrderHighlight';
import * as Accessors from '../../src/accessors/ordersAccessor';
var {
  View,
  Text
} = React;


export class ServiceOrderHighlights extends Component {
    getHighPriorityCount() {
        var orders = Accessors.getHighPriority(this.props.state);
        if(orders){
            return orders.length
        }
        return 0;
    }
    getOrderPool(){
        var orders = Accessors.getOrderPool(this.props.state)
        if(orders){
            return orders.length;
        }
        return 0;
    }
    getMyOrders (){
        var orders = Accessors.getMyWorkOrders(this.props.state);
        if(orders) {
            return orders.length;
        }
        return 0;
    } 
    render () {
        const { state, dispatch } = this.props;
        return (
            <View>
                <View>
                    <Text style={[styles.serviceDashBoardDateText]}>
                        { (new Date()).toDateString() }
                    </Text>
                </View>
                <View style={[styles.serviceDashBoard]}>
                    <View style={[styles.serviceDashBoardTitle]}>
                        <Text style={[styles.serviceDashBoardTitleText]}>
                            {
                                titleService.get(titles.ServiceOrder, 'Service Order')
                            }
                        </Text>
                    </View>
                    <ServiceOrderHighlight press={this.props.onPress} text={titleService.get(titles.HighPriority, "High Priority")} count={this.getHighPriorityCount()} />
                    <ServiceOrderHighlight press={this.props.onPress} text={titleService.get(titles.MyOrders, "My Orders")} count={this.getMyOrders()} />
                    <ServiceOrderHighlight  press={this.props.onPress} text={titleService.get(titles.OrderPool, "Order Pool")} count={this.getOrderPool()} />
                </View>
            </View>
        );
    }
}

ServiceOrderHighlights.propTypes = {};
