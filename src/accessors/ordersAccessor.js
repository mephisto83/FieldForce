var myworkorders = 20;
var highPriority = 10;

export function getOrders(state){
    return state.orders;
}

export function getId (order){
    return order.workOrder;
}
export function getWorkAssignments(state){
    return state ? state.assignments : []
}
export function getOrderAssignment(state, id) {
    var assignments = getWorkAssignments(state);
    if( assignments &&  assignments.length) {
        return  assignments.find(assignment => { 
            return getId(assignment) === id;
        })
    }
}
export function getOrder(state, id) {
    var assignments = getOrders(state);
    if( assignments &&  assignments.length) {
        return  assignments.find(assignment => { 
            return getId(assignment) === id;
        })
    }
}

//Top level
export function getMyWorkOrders(state){
    var ostate = state.orders;
    if(ostate){
        
        var orders = getOrders(ostate).filter(order=> {
            return order.listCategory === myworkorders;
        });
        
        return orders;
    }
    return [];
}

export function assignToMe(state, item) {
    return item.assignedToOperative && item.assignmentId === 1;
}

export function getHighPriority(state){
    var ostate = state.orders;
    if(ostate){
        return getOrders(ostate).filter(order=> {
            return order.listCategory === highPriority;
        })
    }
}

export function isHighPriority(item){
    return item.listCategory === highPriority;
}

export function getOrderPool(state){
    var ostate = state.orders;
    if(ostate){
        return getOrders(ostate).filter(order=> {
            return order.listCategory !== highPriority && order.listCategory !== myworkorders;
        })
    }
}

export function getAppOrders(state){
    return getOrders(state.orders) || [];
}
export function getAppGroupedOrders(state, convert){
    var result = {};
    
    for(var i in state.orders.groupedOrders) {
        result[i] = state.orders.groupedOrders[i].map(item => convert(item));
    }
    
    return result;
}

export function getCurrentAssignment(state){
    var appState = state.application;
    var oState = state.orders;
    if(appState){
        return getOrder(oState, appState.currentAssignment)
    }
    
    return null;
     
}