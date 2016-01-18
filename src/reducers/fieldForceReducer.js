import {applicationReducer} from './applicationReducer';
import {ordersReducer} from './ordersReducer';
import {timesheetsReducer} from './timesheetsReducer';
import {productsReducer} from './productsReducer';
import {equipmentReducer} from './equipmentReducer';
import {feedbackInfoReducer} from './feedbackInfoReducer';
import * as Reducers from '../actions/reducers';
var makeState = function () {
    return {
        application: applicationReducer(),
        orders: ordersReducer(),
        timesheets: timesheetsReducer(),
        products: productsReducer(),
        equipment: equipmentReducer(),
        feedbackInfo: feedbackInfoReducer()
    }
}
function groupBy(collection, func) {
    var result = {};
    for (var i = 0; i < collection.length; i++) {
        var t = func(collection[i]);
        result[t] = result[t] || [];
        result[t].push(collection[i]);
    }
    return result;
}
function duplicateState(state){
    var newstate = Object.assign({}, state || {});
    
    return newstate;
}
function orderRel(state, action){
    var newstate = duplicateState(state);
    
    newstate.orders = ordersReducer(state.orders, action); 
    newstate.orderGroups = groupBy(newstate.orders, (item)=>{
        return item.listCategory;
    });
    return newstate;
}
function applicationRel(state, action){
    var newstate = duplicateState(state);
    newstate.application = applicationReducer(state.application, action);
    return newstate;
}
export function fieldForceReducer(state, action) {
    if(!state) { 
        state = makeState();
    }
    if (!action) {
        return state;
    }
    var actions = action
    if (!action.batch) {
        actions = [action];
    }
    else {
        actions = action.batch;
    }
    actions.forEach(action => {
        switch(action.reducer){
            case Reducers.APPLICATION:
                state = applicationRel(state, action);
            case Reducers.ORDERS:
                state = orderRel(state, action);
        }
    });
    return (state);
}