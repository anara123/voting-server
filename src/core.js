import { Map, List } from 'immutable';


export const INITIAL_STATE = Map({


});

export function setEntries(state, movies) {
	return state.set('movies', List(movies));
}

const getWinners = (vote) => {
	if (!vote) {
		return List();
	}

	const [a, b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);

	if (aVotes > bVotes) {
		return [a];
	} 
	else if (aVotes < bVotes) {
		return [b];
	}
	else {
		return [a, b];
	}
};

export const next = (state) => {
	const winners = getWinners(state.get('vote'));
	var entries = state.get('movies').concat(winners);

	if (entries.size === 1) {
		return state.remove('vote')
					.remove('movies')
					.set('winner', entries.first());
	}

	return state.merge({
		vote: Map({
			pair: entries.take(2)
		}),

		movies: entries.skip(2)
	});
};

export const vote = (voteState, movie) => {
	return voteState.updateIn(
		['tally', movie],
		0,
		tally => tally + 1
	);
};