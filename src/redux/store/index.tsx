import { createStore, compose, applyMiddleware,Store } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const migrations:any = {
    0: (state: { media: any; }) => {
		return {
			...state,
			media: { ...state.media, artists: [], albums: [] }
		};
	}
};

export type RootReducer=ReturnType<typeof reducers>

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	version: 0,
	migrate: createMigrate(migrations, { debug: false }),
	blacklist: ['footer', 'player', 'search']
};
const persistedReducer = persistReducer(persistConfig, reducers);
//<StoreType,ActionType>
export const store:any = createStore(persistedReducer,{}, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
