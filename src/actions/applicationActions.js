import * as Reducers from './reducers';
import {service} from '../service/serviceCaller';
import {endPoints, parameters} from '../service/endPoints';
import {batch} from './util';


export const SET_CURRENT_ASSIGNMENT = 'SET_CURRENT_ASSIGNMENT';
export function setCurrentAssignment(workOrderId){
    return {
        type: SET_CURRENT_ASSIGNMENT,
        workOrderId,
        reducer: Reducers.APPLICATION
    }
}