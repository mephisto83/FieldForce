
var makeState = function () {
    return {
    }
}

export function equipmentReducer(state, action) {
    state = state || makeState();

    if (!action) {
        return state;
    } 
    switch(action.type){
        default:
            return state;
    } 
    return state;
}