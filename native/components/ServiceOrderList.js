
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils, groupBy} from '../utilities';
import {styles, styleColors} from '../styles';
import {titleService} from '../titleService';
import {titles} from '../titles';
import {FieldForceListView} from './FieldForceListView';
import * as Accessors from '../../src/accessors/ordersAccessor';
import {ListItem} from './listItem';
import Swipeout from './Swipeout'
import {Scenes} from '../globals';
var {
  View,
  Text,
  TouchableOpacity,
  ListView
} = React;

var { Icon } = require('react-native-icons');

// Buttons
var swipeoutRightBtns = [{
    text: titleService.get(titleService.titles.Unassign, 'Unassign'),
    backgroundColor: styleColors.UNASSIGN_COLOR
  },{
    text: titleService.get(titleService.titles.OnHold, 'On hold'),
    backgroundColor: styleColors.ON_HOLD_COLOR
  },{
    text: titleService.get(titleService.titles.InProgress, 'In progress'),
    backgroundColor: styleColors.IN_PROGRESS_COLOR
  }
],
autoClose = true;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export class ServiceOrderList extends Component {
    constructor(props) {
        super(props); 
    }
    componentWillReceiveProps (){ 
    }
    renderRow (item) {
           return (
                  <View>
                    <Swipeout 
                        autoClose={false}
                        right={swipeoutRightBtns.map(t=>{return Object.assign({}, t)})}>
                      <ListItem
                          text={ item.text || '' }
                          children = { item.children }
                          onPress = { item.onPress }
                          backgroundColor = { item.backgroundColor }
                          indent = { item.indent }
                          style = { item.style }
                          styleText = { item.styleText } />
                    </Swipeout>
                  </View> );
    }
    toListItem (item){
        var me = this;
        var assignedTo = (
            <View style={styles.listLeftIconImage}>
            </View>
        );
        if(Accessors.assignToMe(me.props.state, item)) {
            assignedTo = (
              <View>
                    <Icon
                        name='ion|ios-bolt'
                        size={10}
                        color={styleColors.ICON_BOLT_COLOR} 
                        style={styles.listLeftIconImage} />
              </View>  
            );
        }
        return {
            item: item,
            id: item.workOrder,
            text: item.description,
            onPress: () =>{
                me.props.navigator.push({id: Scenes.ASSIGNMENT})
                setTimeout(()=>{
                    me.props.setCurrentAssignment(item.workOrder);
                }, 300);
            },
            children: (
                 <View style={[styles.listContentContainer]}>
                    <View style={[styles.list]}>
                        {assignedTo}
                    </View>
                    <View style={[styles.listContent]}>
                        <Text style={[styles.listTitleText]}>{item.description}</Text>
                        <Text style={[styles.workOrderNumber]}>{item.workOrder}</Text>
                        <Text style={[styles.locationText]}>{item.location}</Text>
                        <Text style={[styles.dateText]}>{item.startDate}</Text>
                    </View>
                </View>
            )
        }    
    }
    sectionHeaderView(sectionData, sectionID) {
        var sectionTitle = '';
        switch(parseInt(sectionID)) {
            case 10:
                sectionTitle = titleService.get(titles.HighPriority, "High Priority");
            break;
            case 20:
                sectionTitle = titleService.get(titles.MyOrders, "My Orders");
            break;
            case 30:
            case 40:
                sectionTitle = titleService.get(titles.OrderPool, "Order Pool");
            break;
        }
         return (
            <View style={styles.section}>
                <Text style={styles.sectionText}>{sectionTitle}</Text>
            </View>
        )
    }
    
    render () {
        var me = this;
        const { state, dispatch } = this.props;
        var orders = Accessors.getAppGroupedOrders(this.props.state, item=> {
                return me.toListItem(item);
        });
        var orderGroups = orders;
        
        return (
            <View style={{flex: 1}}>  
                <FieldForceListView
                    data={orderGroups}
                    style={{flex: 1}}
                    withSections={true}
                    refreshable={false}
                    getPageCallback={()=>{ 
                        console.log('get page callback')
                    }}
                    initialListSize={1}
                    pageSize={1}
                    sectionHeaderView={this.sectionHeaderView.bind(this)}
                    rowView={this.renderRow.bind(this)}
                    firstLoader={false}
                    
                    pagination={false} />
            </View>
        );
    }
}

ServiceOrderList.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(ServiceOrderList);
