import { assert } from 'chai';
import { Map, List } from 'immutable'; 

import reducer from '../src/reducer';
import { SET_ENTRIES, NEXT, VOTE } from '../src/constants';

// 'Trainspotting', '28 Days Later', 'Sunshine', 'Millions', '127 Hours'

describe('reducer', function () {
	
	it('handles SET_ENTRIES', function () {
		const stateBefore = Map();
		const movies = ['Trainspotting'];
		const action = { type: SET_ENTRIES, entries: movies };

		const stateAfter = Map({
			movies: List.of('Trainspotting')
		});

		assert.equal(
			reducer(stateBefore, action),
			stateAfter);
	});

	it('handles NEXT', function () {
		const action = { type: NEXT };
		const stateBefore = Map({
			movies: List.of('Trainspotting', '28 Days Later')
		});

		const stateAfter = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later')
			}),
			movies: List()
		});

		assert.equal(
			reducer(stateBefore, action),
			stateAfter);
	});

	it('handles VOTE', function() {
		const action = { type: VOTE, entry: 'Trainspotting' };
		const stateBefore = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 2
				})
			}),
			movies: List()
		});

		const stateAfter = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 3
				})
			}),
			movies: List()
		});

		assert.equal(
			reducer(stateBefore, action),
			stateAfter);
	});

	it('has an initial state', function() {
		const action = { };
		const stateBefore = undefined;

		const stateAfter = Map();

		assert.equal(
			reducer(stateBefore, action),
			stateAfter);
	});

	it('multiple actions reduced', function() {

		var actions = [
			{ type: SET_ENTRIES, entries: ['Trainspotting', '28 Days Later'] },
			{ type: NEXT },
			{ type: VOTE, entry: 'Trainspotting'},
			{ type: VOTE, entry: 'Trainspotting' },
			{ type: NEXT }
		];

		const expectedFinalState = Map({
			winner: 'Trainspotting'
		});

		const finalState = actions.reduce(reducer, Map());

		assert.equal(
			finalState,
			expectedFinalState);
	});

});