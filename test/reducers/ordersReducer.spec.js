
import expect from 'expect'

import * as OrdersActions from '../../src/actions/orderActions';
import {ordersReducer} from '../../src/reducers/ordersReducer';;
import * as OrdersAccessor from '../../src/accessors/ordersAccessor';
import * as FieldForceResults from '../FieldForceResults';

describe('ordersReducers', ()=>{
    it('can create a default state' , ()=> {
      var state = ordersReducer();
      
      expect(state).toExist(); 
      
      
      expect(state.orders).toExist();
    });
    
    it('can add work orders' , ()=>{
        var state = ordersReducer(null, OrdersActions.addOrders(FieldForceResults.getOrderListResults));
        expect(state).toExist();
        
        var orders = OrdersAccessor.getOrders(state);
        expect(orders).toExist();
        expect(orders.length == FieldForceResults.getOrderListResults.length).toBe(true);
    });
    
    
    it('can add unique work orders', ()=>{
        
        var state = ordersReducer(null, OrdersActions.addOrders(FieldForceResults.getOrderListResults));
        expect(state).toExist();
        state = ordersReducer(state, OrdersActions.addOrders(FieldForceResults.getOrderListResults));
        var orders = OrdersAccessor.getOrders(state);
        expect(orders).toExist();
        expect(orders.length == FieldForceResults.getOrderListResults.length).toBe(true);
    });
    
    
    it('can add an order assignment', ()=>{
        var workOrderID = '130155';
        var state = ordersReducer(null, OrdersActions.addOrders(FieldForceResults.getOrderListResults));
        var action  = OrdersActions.addOrderAssignment(FieldForceResults.getOrderAssigment);

        state = ordersReducer(state, action );
        var orderAssigment = OrdersAccessor.getOrderAssignment(state, workOrderID);
        expect(orderAssigment).toExist();
        expect(orderAssigment.workOrder).toBe(workOrderID)
    });
    
    it('can add an order assignment uniquely', ()=>{
        var workOrderID = '130155';
        var state = ordersReducer(null, OrdersActions.addOrders(FieldForceResults.getOrderListResults));
        var action  = OrdersActions.addOrderAssignment(FieldForceResults.getOrderAssigment);

        state = ordersReducer(state, action );
        var orderAssigments = OrdersAccessor.getWorkAssignments(state);
        expect(orderAssigments).toExist();
        expect(orderAssigments.length).toBe(1)
    });
});
