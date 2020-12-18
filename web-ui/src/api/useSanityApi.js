import { useEffect, useReducer, useState } from 'react';
import { sanityClient } from 'utils/sanity';

import { getLogger, levels } from 'utils/logger';
const logger = getLogger('useSanityApi', { development: levels.INFO });

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const RESET = 'RESET';

export const NO_CONTENT = 'NO_CONTENT';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isComplete: false,
        isLoading: true,
        error: undefined,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isComplete: true,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isComplete: true,
        isLoading: false,
        data: undefined,
        error: action.error,
      };
    case RESET:
      return {
        isComplete: false,
        isLoading: false,
        data: undefined,
        error: undefined,
      };
    default:
      throw new Error();
  }
};

const newlineRE = /(?:\n)/g;
const extraSpacesRE = /(?:\s{2,})/g;

const useSanityApi = (query, params = {}) => {
  const [queryData, setQueryData] = useState({ query: query, params: params });

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isComplete: false,
    isLoading: false,
    error: undefined,
    data: undefined,
  });

  useEffect(() => {
    if (!queryData || !queryData.query) {
      return;
    }
    let didCancel = false;

    const fetchData = async () => {
      const { query, params } = queryData;
      const _logger = logger.scoped({
        query:
          query
            .slice(0, 128)
            .replace(newlineRE, ' ')
            .replace(extraSpacesRE, ' ') + '…',
        params,
        didCancel,
      });

      dispatch({ type: FETCH_INIT });

      try {
        _logger.debug('query');

        const response = await sanityClient.fetch(query, params);

        _logger.debug('response');

        if (didCancel) return;
        dispatch({ type: FETCH_SUCCESS, payload: response });
      } catch (error) {
        _logger.error('Sanity returned error', { error, didCancel });

        if (didCancel) return;

        dispatch({ type: FETCH_FAILURE, error });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [queryData]);

  useEffect(() => {
    if (state.isComplete) {
      dispatch({ type: RESET });
    }
  }, [state.isComplete]);

  const doFetch = (query, params) => {
    setQueryData({ query, params });
  };

  return [state, doFetch];
};

export default useSanityApi;
