import { assert } from 'chai';
import { Map, List } from 'immutable';

import { setEntries, next, vote } from '../src/core';


// 'Trainspotting', '28 Days Later', 'Sunshine', 'Millions', '127 Hours'
describe('#setEntries', function () {
	
	it('should set be immutable', function () {
		const stateBefore = Map();
		const movies = ['Trainspotting', '28 Days Later'];

		const stateAfter = Map({
			movies: List.of('Trainspotting', '28 Days Later')
		});

		assert.equal(
			setEntries(stateBefore, movies),
			stateAfter);
	});

});

describe('#next', function () {
	
	it ('takes the next two entries under vote', function() {
		const stateBefore = Map({
			movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
		});

		const stateAfter = Map({
			vote: Map({ 
				pair: List.of('Trainspotting', '28 Days Later')
			}),
			movies: List.of('Sunshine')
		});

		assert.equal(
			next(stateBefore),
			stateAfter);
	});


	it ('puts winner of current vote back to the entries', function() {
		const stateBefore = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 4,
					'28 Days Later': 3
				})
			}),
			movies: List.of('Sunshine', 'Millions', '127 Hours')
		});

		const stateAfter = Map({
			vote: Map({
				pair: List.of('Sunshine', 'Millions')
			}),
			movies: List.of('127 Hours', 'Trainspotting')
		});

		assert.equal(
			next(stateBefore),
			stateAfter);
	});

	it ('puts both of the movies back to entries if there is a tie', function() {
		const stateBefore = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 3,
					'28 Days Later': 3
				})
			}),
			movies: List.of('Sunshine', 'Millions', '127 Hours')
		});

		const stateAfter = Map({
			vote: Map({
				pair: List.of('Sunshine', 'Millions')
			}),
			movies: List.of('127 Hours', 'Trainspotting', '28 Days Later')
		});

		assert.equal(
			next(stateBefore),
			stateAfter);
	});

	it('mark winner when only one entry left', function () {
		const stateBefore = Map({
			vote: Map({
				pair: List.of('Trainspotting', '28 Days Later'),
				tally: Map({
					'Trainspotting': 4,
					'28 Days Later': 2
				})
			}),
			movies: List.of()
		});

		const stateAfter = Map({
			winner: 'Trainspotting'
		});

		assert.equal(
			next(stateBefore),
			stateAfter);

	});
});

describe('#vote', function() {

	it('should create tally for the vote if it not exist', function() {
		const voteBefore = Map({
			pair: List.of('Trainspotting', '28 Days Later')
		});

		const voteAfter = Map({
			pair: List.of('Trainspotting', '28 Days Later'),
			tally: Map({
				'Trainspotting': 1
			})
		});

		assert.equal(
			vote(voteBefore, 'Trainspotting'),
			voteAfter);
	});

	it('should increment tally if tally is exist', function() {
		const stateBefore = Map({
			pair: List.of('Trainspotting', '28 Days Later'),
			tally: Map({
				'Trainspotting': 2,
				'28 Days Later': 3
			})
		});

		const stateAfter = Map({
			pair: List.of('Trainspotting', '28 Days Later'),
			tally: Map({
				'Trainspotting': 2,
				'28 Days Later': 4
			})
		});

		assert.equal(
			vote(stateBefore, '28 Days Later'),
			stateAfter);
	});

});

