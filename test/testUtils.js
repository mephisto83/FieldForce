
import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
import * as FieldForceResults from './FieldForceResults';
var domainName = 'http://localhost:44300'
import {service} from '../src/service/serviceCaller';
import {endPoints, parameters} from '../src/service/endPoints';

var current = {};
var servicefails = false;
export const mock = {
	func: function (name, old, _new, obj) {
		current[name] = {
			old: old,
			obj: obj
		};
		obj[name] = _new;
	},
	undo: function (name) {
		if (current[name]) {
			var obj = current[name].obj;
			if (obj) {
				obj[name] = current[name].old;
			}
		}
	},
	fail: function(){
		servicefails = true;
	},
	unfail: function(){
		servicefails = false
	}
}

export function mockStore(getState, expectedActions, done) {
	if (!Array.isArray(expectedActions)) {
		throw new Error('expectedActions should be an array of expected actions.')
	}
	if (typeof done !== 'undefined' && typeof done !== 'function') {
		throw new Error('done should either be undefined or function.')
	}

	function mockStoreWithoutMiddleware() {
		return {
			getState() {
				return typeof getState === 'function' ?
					getState() :
					getState
			},

			dispatch(action) {
				const expectedAction = expectedActions.shift();

				try {
					expect(action).toEqual(expectedAction)

					if (done && !expectedActions.length) {
						done()
					}
					return action
				} catch (e) {
					done(e)
				}
			}
		}
	}

	const mockStoreWithMiddleware = applyMiddleware(
		...middlewares
		)(mockStoreWithoutMiddleware)

	return mockStoreWithMiddleware()
}
var serviceFailPromise = function(){
return	 Promise.resolve().then(function(){
			throw new Error('service fail');
		});
}
mock.func("get", service.get, c => {
	if (servicefails) {
		return serviceFailPromise();
	}
	switch (c) {
		case endPoints.getOrdersEndpoint + parameters(service.getClient()):
			return Promise.resolve(FieldForceResults.getOrderListResults);
	}
	console.log('missed endpoint - get' + c)
}, service);

mock.func("post", service.post, c => {
	if (servicefails) {
		return serviceFailPromise();
	}
	switch (c) {
		case endPoints.createCard:
			return Promise.resolve(FieldForceResults.addCardResult);
	}
	console.log('missed endpoint - post ' + c)
}, service);


mock.func("put", service.put, c => {
	if (servicefails) {
		return serviceFailPromise();
	}
	switch (c) {
		case endPoints.updateCard:
			return Promise.resolve(FieldForceResults.updateCardResult);
	}
	console.log('missed endpoint - post ' + c)
}, service);


mock.func("delete", service.delete, c => {
	if (servicefails) {
		return serviceFailPromise();
	}
	switch (c) {
		case endPoints.deleteConnection + '/id':
			return Promise.resolve(FieldForceResults.connectionCreateResult);
	}
	console.log('missed endpoint - delete' + c)
}, service);