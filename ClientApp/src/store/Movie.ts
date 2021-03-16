import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface MoviesState {
    isLoading: boolean;
    startDateIndex?: number;
    movies: Movie[];
}

export interface Movie {
    date: string;
   
    summary: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SearchMoviesAction {
    type: 'SEARCH_MOVIE';
    index: number;
    movies: Movie[]
}

//interface ReceiveWeatherForecastsAction {
//    type: 'RECEIVE_WEATHER_FORECASTS';
//    startDateIndex: number;
//    forecasts: WeatherForecast[];
//}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SearchMoviesAction /*| ReceiveWeatherForecastsAction;*/

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    searchMovies: (index: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.movies) {
            fetch(`searchByTitle`)
                .then(response => response.json() as Promise<Movie[]>)
                .then(data => {
                    dispatch({ type: 'SEARCH_MOVIE', index: index, movies: data });
                });

        //    dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MoviesState = { movies: [], isLoading: false };

export const reducer: Reducer<MoviesState> = (state: MoviesState | undefined, incomingAction: Action): MoviesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {

        case 'SEARCH_MOVIE':
            return {
                movies: action.movies,
          
                isLoading: false
            };
        //case 'REQUEST_WEATHER_FORECASTS':
        //    return {
        //        startDateIndex: action.startDateIndex,
        //        forecasts: state.forecasts,
        //        isLoading: true
        //    };
        //case 'RECEIVE_WEATHER_FORECASTS':
        //    // Only accept the incoming data if it matches the most recent request. This ensures we correctly
        //    // handle out-of-order responses.
        //    if (action.startDateIndex === state.startDateIndex) {
        //        return {
        //            startDateIndex: action.startDateIndex,
        //            forecasts: action.forecasts,
        //            isLoading: false
        //        };
        //    }
            break;
    }

    return state;
};
