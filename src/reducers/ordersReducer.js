import * as OrderActions from '../actions/orderActions';
import * as OrderAccessors from '../accessors/ordersAccessor';
var makeState = function () {
    return {
        orders: [],
        assignments: []
    }
}


function duplicateState(state) {
    var newstate = Object.assign({}, makeState(), state || {});

    return newstate;
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
function addOrders(state, action) {
    var newstate = duplicateState(state);
    newstate.orders = newstate.orders.filter(order=> {
        var orderId = OrderAccessors.getId(order);

        return !action.orders.find(ord=> {
            return OrderAccessors.getId(ord) === orderId;
        })
    });
    newstate.orders = [...newstate.orders, ...action.orders];
    newstate.orders.sort((a, b) => {
        return parseFloat(a.listCategory, 10) - parseFloat(b.listCategory, 10);
    })
    newstate.groupedOrders = groupBy(newstate.orders, (item) => {
        return item.listCategory;
    });
    return newstate;
}
function addWorkOrderAssignment(state, action) {
    var newstate = duplicateState(state, action);

    newstate.assignments = [...newstate.assignments.filter(assignment => OrderAccessors.getId(assignment) !== OrderAccessors.getId(action.assignment)), action.assignment]
    newstate.assignments.sort((a, b) => {
        return parseFloat(a.listCategory, 10) - parseFloat(b.listCategory, 10);
    })
    return newstate;
}
export function ordersReducer(state, action) {
    state = state || makeState();

    if (!action) {
        return state;
    }
    switch (action.type) {
        case OrderActions.ADD_ORDERS:
            return addOrders(state, action);
        case OrderActions.ADD_WORK_ORDER_ASSIGNMENT:
            return addWorkOrderAssignment(state, action);
        default:
            return state;
    }
    return state;
}