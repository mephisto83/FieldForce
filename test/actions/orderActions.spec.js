import expect from 'expect';
import * as OrderActions from '../../src/actions/orderActions';


import {service} from '../../src/service/serviceCaller';
import {endPoints} from '../../src/service/endPoints';
import {mock, mockStore} from '../testUtils';
import * as FieldForceResults from '../FieldForceResults';

import {batch} from '../../src/actions/util';

describe('card actions', () => {

    it('can add orders', (done) => {
        var orders = FieldForceResults.getOrderListResults;

        const expectedActions = [
            OrderActions.addOrdersRequest(),
            batch([
                OrderActions.addOrders(orders),
                OrderActions.addOrdersSuccess()
                ])
        ]
        const store = mockStore({}, expectedActions, done);

        store.dispatch(OrderActions.getOrdersAsync());
    });
    it('FAILED: can add orders', (done) => {
        var orders = FieldForceResults.getOrderListResults;

        const expectedActions = [
            OrderActions.addOrdersRequest(),
            OrderActions.addOrdersFailed()
        ]

        mock.fail()
        const store = mockStore({ todos: [] }, expectedActions, function () {
            mock.unfail();
            done();
        });

        store.dispatch(OrderActions.getOrdersAsync());
    });
});