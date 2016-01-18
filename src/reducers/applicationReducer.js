import * as OrderActions from '../actions/orderActions';
import * as ApplicationActions from '../actions/applicationActions';
import * as OrderAccessors from '../accessors/ordersAccessor';
var FAILED =  'FAILED';
var makeState = function () {
    return {
        addingOrders: false
    }
}

function duplicateState(state){
    var newstate = Object.assign({}, makeState(), state || {});
    
    return newstate;
}
function setCurrentAssignment(state, action){
    var newstate=  duplicateState(state);
    
    newstate.currentAssignment = action.workOrderId;
    
    return newstate;
}
function addOrdersRequest(state, action){
    var newstate = duplicateState(state);
    
    newstate.addingOrders = true;
    
    return newstate
}
function addOrdersSuccess(state, action){
    var newstate =duplicateState(state);
    
    newstate.addingOrders = false;
    
    return newstate;
}

function addOrdersFailed(state, action){
    var newstate = duplicateState(state);
    
    newstate.addingOrders = FAILED;
    
    return newstate;
}
export function applicationReducer(state, action) {
    state = state || makeState();

    if (!action) {
        return state;
    } 
    switch(action.type){
        case ApplicationActions.SET_CURRENT_ASSIGNMENT:
            return setCurrentAssignment(state, action);
        case OrderActions.ADD_ORDERS_REQUEST:   
            return addOrdersRequest(state, action);
        case OrderActions.ADD_ORDERS_SUCCESS:
            return addOrdersSuccess(state, action);
        case OrderActions.ADD_ORDERS_FAILED:
            return addOrdersFailed(state, action);
        default:
            return state;
    } 
    return state;
}