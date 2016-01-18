import {bindActionCreators} from 'redux';
import * as OrderActions from '../src/actions/orderActions';
import * as ApplicationActions from '../src/actions/applicationActions';
import {Scenes} from './globals';
var count = 0;

export const utils = {
    mapStateToProps: function (state) {
        count++;
        console.log('reduced ' + count);
        return {
            state: state.fieldForceReducer
        };
    },
    mapDispatchToProps(dispatch) {
        return bindActionCreators({
                ...OrderActions,
                ...ApplicationActions
            }, dispatch);
	}
}


export function groupBy(collection, func) {
    var result = {};
    for (var i = 0; i < collection.length; i++) {
        var t = func(collection[i]);
        result[t] = result[t] || [];
        result[t].push(collection[i]);
    }
    return result;
}