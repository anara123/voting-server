import { assert } from 'chai';

import { fromJS } from 'immutable';

import { SET_ENTRIES } from '../src/constants';
import makeStore from '../src/store';


describe('store test', function () {
	
	it('should makeStore - and set entries to it', function () {
		const store = makeStore();
		const action = { 
			type: SET_ENTRIES, 
			entries: ['Terminator']
		};
		
		store.dispatch(action);

		const expectedState = fromJS({
			movies: ['Terminator']
		});

		assert.equal(
			store.getState(),
			expectedState);
	});
});