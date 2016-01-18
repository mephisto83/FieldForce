
import expect from 'expect'

import {fieldForceReducer} from '../../src/reducers/fieldForceReducer';

describe('fieldForceReducer', ()=>{
    it('can create a default state' , ()=> {
      var state = fieldForceReducer();
      
      expect(state).toExist();
      expect(state.application).toExist();
      expect(state.orders).toExist()  
      expect(state.timesheets).toExist();
      expect(state.products).toExist();
      expect(state.equipment).toExist();
      expect(state.feedbackInfo).toExist();
    });
});
