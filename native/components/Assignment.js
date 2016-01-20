
import React, { Component } from 'react-native';
import { connect } from 'react-redux/native';
import {utils} from '../utilities';
import {titleService} from '../titleService';
import {titles} from '../titles';
import {styles, styleColors, NAV_BAR_HEIGHT} from '../styles';
import {ServiceOrderHighlights} from './ServiceOrderHighlights';
import {Scenes} from '../globals';
import * as Accessor from '../../src/accessors/ordersAccessor'
import {BottomImageBtn} from './BottomImageBtn';
import {Swiper} from './Swiper';
var {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  NativeModules, TextInput,
  Text
} = React;
var CalendarPicker = require('react-native-calendar-picker');
var { Icon } = require('react-native-icons');
var TOP_BOTTOM_WINDOW  = 10;
var bottomBarHeight = 0;
var swiperCallback;
var openBoard;

var Radio = require('react-native-radio-button-classic');
var Option = Radio.Option;

class Assignment extends Component {
    constructor(props){
        super(props)
        this.state = {
            bottomWindowTop: new Animated.Value(bottomBarHeight || 0),
            date: new Date(),
            comment: '',
            opened: false,
            optionSelected: 0
        }
    }
    onDateChange(date) {
        this.setState({ date: date });
    }
    onSelect(index){
        this.setState({
            optionSelected: index
        })
    }
    renderSwipeSection (){
        var me = this;
        var result = (
            <View style={[styles.feedBackInputPanel]}>
                <Swiper refs={(swiper)=>{me.swiper = swiper}} switchToFuncCallback={this.switchToFuncCallback.bind(this)}>
                    <View>
                        <Text style={[styles.feedBackSectionTitle]}>
                            {titleService.get(titleService.titles.HowMuchTimeSpent, 'How much time spent?')}
                        </Text>
                        <View>
                                <CalendarPicker 
                                    selectedDate={this.state.date}
                                    onDateChange={this.onDateChange.bind(this)} />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.feedBackSectionTitle]}>
                            {titleService.get(titleService.titles.HowMuchTimeSpent, 'What products did you use?')}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.feedBackSectionTitle]}>
                            {titleService.get(titleService.titles.HowMuchTimeSpent, 'What equipment did you use?')}
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <View>
                                <Text style={styles.buttonText}>
                                    {titleService.get(titleService.titles.SearchEquipment, 'Search equipment')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.feedBackSectionTitle]}>
                            {titleService.get(titleService.titles.HowMuchTimeSpent, 'Any comments?')}
                        </Text>
                        <TextInput
                            multiline={true}
                            style={{height: 150, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(comment) => this.setState({comment})}
                            value={this.state.text} />
                        <View style={{ flex: 1, paddingTop: 20}}>
                            <Radio onSelect={this.onSelect.bind(this)} defaultSelect={this.state.optionSelected - 1}>
                                <Option color="gray" selectedColor="#008BEF">
                                    <Item title="First Options" description="This is your First Option"/>
                                </Option>
                                <Option color="gray" selectedColor="#008BEF">
                                    <Item title="Second Options" description="This is your Second Option"/>
                                </Option>
                                <Option color="gray" selectedColor="#008BEF">
                                    <Item title="Third Options" description="This is your Third Option"/>
                                </Option>
                            </Radio>

                        </View>
                    </View>
                </Swiper>
            </View>
        );
        
        
        return result;
    }
    navigateToList(){
        this.props.navigator.push( Object.assign({}, Scenes.SERVICE_ORDER_LIST));
    }
    componentDidUpdate (){
        var me = this;
        openBoard = undefined;
        if(!me.state.opened){
            setTimeout(function(){
                me.refs.bottomView.measureLayout(React.findNodeHandle(me),(ox, oy, width, bheight) => {
                    let { height } = Dimensions.get('window');
                    var windowHeight = height;
                    bottomBarHeight =   windowHeight - bheight - NAV_BAR_HEIGHT;
                    // me.state.bottomWindowTop.setValue(bottomBarHeight);
                    Animated.spring(me.state.bottomWindowTop, {
                            toValue: bottomBarHeight,                         // Animate to smaller size
                            velocity: 3,  // Velocity makes it move
                            tension: -10, // Slow
                            friction: 1,  // Oscillate a lot
                    }).start();   
                });
            }, 1)
        }
    }
    toggleBottomWindow(board) {
        var me = this;
        if(!me.state.opened){
            me.state.bottomWindowTop.setValue(TOP_BOTTOM_WINDOW);
                // Animated.spring(me.state.bottomWindowTop, {
                //             toValue: 0,                         // Animate to smaller size
                //             velocity: 3,  // Velocity makes it move
                //             tension: -10, // Slow
                //             friction: 1,  // Oscillate a lot
                // }).start();      
            me.setState({
                opened: true
            });
          
        }
        
        if(swiperCallback) {
            switch(board) {
                case "time":
                    swiperCallback(1)
                break;
                case "clipboard":
                    swiperCallback(2)
                break;
                case "comments":
                    swiperCallback(0)
                break;
                case "equipment":
                    swiperCallback(3);
                break;
            }
        }
        else {
            switch(board) {
                case "time":
                    openBoard = (1)
                break;
                case "clipboard":
                    openBoard = (2)
                break;
                case "comments":
                    openBoard = (0)
                break;
                case "equipment":
                    openBoard = (3);
                break;
            
            }
        }
    }
    switchToFuncCallback(callback){
        swiperCallback = callback;
        if(openBoard !== undefined){
            setTimeout(()=>{
                swiperCallback(openBoard);
                openBoard = undefined;
            },200);
        }
    }
    render () {
        var me = this;
        let { width, height } = Dimensions.get('window');
        var windowWidth = width;
        var windowHeight = height;
        var currentAssignment = Accessor.getCurrentAssignment(this.props.state);

        const { state, dispatch } = this.props;
        var closeSection = (
            <View>
            </View>
        );
        
        var swipSection  = (
            <View>
            </View>
        );
        
        if(this.state.opened){
            closeSection = (
             <TouchableOpacity  style={[styles.closeTopBtn,{ width: windowWidth}]} onPress={() => {
                    let { height } = Dimensions.get('window');
                    var windowHeight = height;
                    Animated.spring(me.state.bottomWindowTop, {
                        toValue: bottomBarHeight,                         // Animate to smaller size
                        velocity: 3,  // Velocity makes it move
                        tension: -10, // Slow
                        friction: 1,  // Oscillate a lot
                    }).start();      
                    me.setState({ opened: false});
             }}>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Text>
                        {titleService.get(titleService.titles.EnterFeedback, 'Enter feedback')}
                    </Text> 
                    <Icon
                        name="ion|close-round"
                        size={20}
                        color={styleColors.ICON_COLOR} 
                        style={styles.iconCloseRound} />
                </View>
              </TouchableOpacity>
            );
            swipSection = this.renderSwipeSection();
        }
        if(currentAssignment){
          return (
                <View style={[styles.Screen, styles.Assignment, { height: Dimensions.get('window').height - NAV_BAR_HEIGHT }]}>
                    <View style={{flex: 1, paddingBottom: 30}}>
                        <View style={[styles.assignmentInfoSection]}>
                            <Text style={[styles.assignmentDescriptionLabel]}>
                                {currentAssignment.description}
                            </Text>
                            <Text style={[styles.assignmentWorkOrder]}>
                                {currentAssignment.workOrder}
                            </Text>
                        </View>
                        <View style={[styles.assignmentInfoSection]}>
                            <Text style={[styles.assignmentLabel]}>
                                Description
                            </Text>
                            <Text>
                                {currentAssignment.description}
                            </Text>
                        </View>
                        <View style={[styles.assignmentInfoSection]}>
                            <Text style={[styles.assignmentLabel]}>
                                Location
                            </Text>
                            <Text>
                                {currentAssignment.location}
                            </Text>
                        </View>
                        <View style={[styles.assignmentInfoSection]}>
                            <Text style={[styles.assignmentBtn]}>
                                Contact
                            </Text> 
                        </View>
                        <View style={[styles.assignmentInfoSection]}>
                            <Text style={[styles.assignmentBtn]}>
                                Planned Products
                            </Text> 
                        </View>
                    </View>
                    <Animated.View style={{ position: 'absolute', top: this.state.bottomWindowTop, flex: 1}}>
                        <View ref="bottomView" >
                            {closeSection}
                            <View  style={[styles.AssignmentButtons,{ width: windowWidth}]}>
                                <BottomImageBtn icon="ion|ios-time" onPress={this.toggleBottomWindow.bind(this, "time")} text={titleService.get(titleService.titles.Time, 'Time')} />
                                <BottomImageBtn icon="ion|clipboard" onPress={this.toggleBottomWindow.bind(this, "clipboard")} text={titleService.get(titleService.titles.Clipboard, 'Clipboard')} />
                                <BottomImageBtn icon="ion|wrench" onPress={this.toggleBottomWindow.bind(this, "equipment")} text={titleService.get(titleService.titles.Equipment, 'Equipment')} />
                                <BottomImageBtn icon="ion|chatbox" onPress={this.toggleBottomWindow.bind(this, "comments")} text={titleService.get(titleService.titles.Comments, 'Comments')} />
                            </View>
                            {swipSection}
                        </View>
                    </Animated.View>
                </View>
            );
        }
        return (
            <View style={styles.Screen}>
            </View>
        );
    }
}

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { title, description } = this.props;

    return (
      <View style={{ paddingTop: 7, paddingLeft: 10 }}>
        <Text style={styles.title}>{ title }</Text>
        <Text style={styles.description}>{ description }</Text>
      </View>
    );
  }
}

Assignment.propTypes = {};

export default connect(utils.mapStateToProps, utils.mapDispatchToProps)(Assignment);