import { combineActions, handleActions } from 'redux-actions';
import {
  getDeckLegendsSuccess,
  legendsFailure,
  getDeckLegendsRequest,
  createLegendRequest,
  gotLegend,
  setLegendImageTextRequest,
  updateLegendRequest
} from './actions';
import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

import { State } from './types';

const normalizeLegend = (legend: any) => ({
  ...legend,
  cards: Object.values(groupBy(orderBy(legend.items, 'id') || [], 'cardNumber'))
});

const defaultState: State = {
  loading: false,
  legendsById: {},
};

export default handleActions<State, any>(
  {
    [combineActions(
      getDeckLegendsRequest,
      createLegendRequest,
      setLegendImageTextRequest,
      updateLegendRequest
    ).toString()]: state => ({...state, loading: true, createdDeckId: null, error: null}),
    [legendsFailure.toString()]: (state, {payload: {error}}) => ({...state, loading: false, error}),
    [getDeckLegendsSuccess.toString()]: (state, {payload: {legends}}) => {
      const normalizedLegends = legends.map(normalizeLegend);
      return {
        loading: false,
          legendsById: {
          ...keyBy(normalizedLegends, 'id')
        }
      }
    },
    [gotLegend.toString()]: (state, {payload: {legend}}) => ({
      loading: false,
      legendsById: {
        ...state.legendsById,
        [legend.id]: normalizeLegend(legend)
      }
    })
  },
  defaultState
);
