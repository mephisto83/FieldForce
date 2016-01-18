import * as Reducers from './reducers';
import {service} from '../service/serviceCaller';
import {endPoints, parameters} from '../service/endPoints';
import {batch} from './util';

// ------------------------------------- add orders ----------------------------------------------------------
export const ADD_ORDERS = 'ADD_ORDERS';
export function addOrders(orders) {
    return {
        type: ADD_ORDERS,
        orders,
        reducer: Reducers.ORDERS
    }
}
export const  ADD_ORDERS_REQUEST = 'ADD_ORDERS_REQUEST';
export function addOrdersRequest(){
    return {
        type: ADD_ORDERS_REQUEST,
        reducer: Reducers.APPLICATION
    }
}

export const ADD_ORDERS_SUCCESS = 'ADD_ORDERS_SUCCESS';
export function addOrdersSuccess(){
    return {
        type: ADD_ORDERS_SUCCESS,
        reducer: Reducers.APPLICATION
    }
}

export const ADD_ORDERS_FAILED = 'ADD_ORDERS_FAILED';
export function addOrdersFailed(){
    return {
        type: ADD_ORDERS_FAILED,
        reducer: Reducers.APPLICATION
    }
}
export function getOrdersAsync(){
    return dispatch => {
        dispatch(addOrdersRequest());
        service.get(endPoints.getOrdersEndpoint + parameters(service.getClient())).then(res=>{
            dispatch(
                batch(
                    [
                        addOrders(res),
                        addOrdersSuccess()
                    ]
                )
            );
            
        }).catch(err=>{
            console.log(err);
            dispatch(addOrdersFailed(err));
        });0
    }
}
// ----------------------------------------- add work order assignments ----------------------------------------
export const ADD_WORK_ORDER_ASSIGNMENT = 'ADD_WORK_ORDER_ASSIGNMENT';
export function addOrderAssignment(assignment){
    return {
        type: ADD_WORK_ORDER_ASSIGNMENT,
        assignment,
        reducer: Reducers.ORDERS
    }
}