import startServer from './server';
import makeStore from './store';

import { SET_ENTRIES, NEXT } from './constants';

export const store = makeStore();
startServer(store);

store.dispatch({
	type: SET_ENTRIES,
	entries: require('../resources/entries.json')
});

store.dispatch({
	type: NEXT
});

console.log('Server started successfully !!');