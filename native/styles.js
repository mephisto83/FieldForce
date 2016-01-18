

var React = require('react-native');

var {
    Dimensions,
    StyleSheet
} = React;

var transparent = 'rgba(0,0,0,0)';
var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var COLOR1 = '#ADA9A2';
var COLOR1_SUB = '#949089'
var COLOR2 = '#252932';
export const COLOR2_Active = '#0C1019'
var COLOR3 = '#D5D0CC';
var COLOR4 = '#0C1019'
var COLOR1A = 'rgba(174, 170, 163, .2)';
var TEXT_COLOR = COLOR2;
var TEXT_COLOR_SUB = COLOR1_SUB;
var TEXT_TITLE_COLOR = COLOR2;
var TEXT_COLOR_ON_BACKGROUND = COLOR1_SUB;
var LIST_ITEM_BACKGROUND_COLOR = COLOR1;
var SECTION_ITEM_BACKGROUND_COLOR = "#EFF0F1";
var ASSIGNMENT_BUTTON_COLOR = COLOR3;
var LIST_ITEM_DIVIDER = COLOR1A;
var BOARD_COLOR  = COLOR1;
var BUTTON_COLOR = COLOR4;

var ICON_BOLT_COLOR = COLOR2;
var ICON_COLOR = TEXT_COLOR;
export const SCREEN_BACKGROUND_COLOR = COLOR2;
var FEEDBACK_INPUT_COLOR = '#FFffff'
var BUTTON_TEXT_COLOR = FEEDBACK_INPUT_COLOR;
var BORDER_COLOR = COLOR2;
var paddingLeft = 5;
var fontSize = 12;

export const styleColors = {
    CALL_COLOR: '#ff0000',
    UNASSIGN_COLOR: COLOR3,
    ON_HOLD_COLOR: COLOR4,
    IN_PROGRESS_COLOR: COLOR2,
    ICON_COLOR: ICON_COLOR
}
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rootStyle: {
        backgroundColor: SCREEN_BACKGROUND_COLOR
    },
    serviceDashBoard:{
        flex: 1,
        backgroundColor: BOARD_COLOR,
        padding: 5
    },
    serviceDashBoardTitle: {
        alignItems: 'center'
    },
    serviceDashBoardTitleText: {
        fontSize: 30
    },
    serviceDashBoardDateText: {
        fontSize: 15,
        color: TEXT_COLOR_ON_BACKGROUND
    },
    Screen: {
        padding: 10
    },
    assignmentWorkOrder: {
      fontSize: (fontSize - 3) 
    },
    assignmentDescriptionLabel: {
      fontSize: 20  
    },
    Assignment: {
        padding: 0,
        flex: 1
    },  
    button: {
        flex: 1,
        padding: 5,
        margin: 5,
        alignItems: 'center',
        backgroundColor: BUTTON_COLOR,
        borderWidth: 1,
        borderColor: BORDER_COLOR  
    },
    buttonText: {
        fontSize: 20,
        color: BUTTON_TEXT_COLOR
    },
    feedbackSectionTitle: {
        fontSize: 30
    },
    AssignmentButtons: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: ASSIGNMENT_BUTTON_COLOR,
        alignItems: 'center'  ,
        justifyContent: 'center'
    },
    serviceOrderHighlightContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR
    },
    listContentContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: LIST_ITEM_BACKGROUND_COLOR,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
        padding: 5
    },
    section: {
      padding: 4,
      backgroundColor: SECTION_ITEM_BACKGROUND_COLOR
    },
    sectionText: {
       fontSize: fontSize + 10 
    }, 
    assignmentInfoSection :{
        marginTop: 3,
        marginBottom: 3,
        padding: 10,
        borderWidth: 1,
        backgroundColor: BOARD_COLOR,
        borderColor: BORDER_COLOR,
    },
    assignmentBtn: {
        fontSize: fontSize+2
    },  
    workOrderNumber: {
      fontSize: (fontSize - 3)  
    },
    locationText: {
       fontSize: (fontSize - 3)  
    },
    dateText: {
         fontSize: (fontSize - 3)
    },
    serviceOrderHighLightText: {
        color: TEXT_COLOR,
        fontSize: fontSize,
        flex: 1,
        margin: 10
    },
    serviceOrderHighLightCountText: {
        color: TEXT_TITLE_COLOR,
        fontSize: 30
    },
    
    liContainer: {
        backgroundColor: LIST_ITEM_BACKGROUND_COLOR,
        flex: 1,
        paddingLeft: paddingLeft,
    },
    liIndent: {
        flex: 1,
    },
    listLeftIcon: {
        alignSelf: 'center'
    },
    listContent: {
        flex: 1,
        paddingLeft: paddingLeft,
        alignSelf: 'flex-start'
    },
    listLeftIconImage: {
        height: 10,
        width: 10,
        borderColor: COLOR1A
    },
    iconCloseRound: {
        height: 20,
        width: 20  
    },
    closeTopBtn: {
      backgroundColor: SECTION_ITEM_BACKGROUND_COLOR,
      padding: 5,
      flex: 1  
    },
    bottomIconImages: {
        height: 40,
        width: 40
    },
    bottomImageBtn: {
        padding: 10
    },
    feedBackInputPanel : {
        backgroundColor: FEEDBACK_INPUT_COLOR
    }
});
export const fieldForceListStyleValues = StyleSheet.create({
        separator: {
            backgroundColor: SCREEN_BACKGROUND_COLOR
        },
        refreshableView: {
            backgroundColor: SCREEN_BACKGROUND_COLOR
        },
        paginationView: {
            backgroundColor: SCREEN_BACKGROUND_COLOR
        },
        actionsLabel: {
            color: COLOR3
        }
})
export const androidStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    rootStyle: {
        backgroundColor: SCREEN_BACKGROUND_COLOR
    }
})