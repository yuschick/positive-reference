import { useEffect, useReducer, useState } from 'react';
import { getLogger, levels } from 'utils/logger';

const logger = getLogger('useBackendApi', { development: levels.INFO });

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
        responseStatus: undefined,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isComplete: true,
        isLoading: false,
        data: action.payload,
        responseStatus: action.responseStatus,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isComplete: true,
        isLoading: false,
        data: undefined,
        error: action.error,
        responseStatus: action.responseStatus,
      };
    case RESET:
      return {
        isComplete: false,
        isLoading: false,
        data: undefined,
        error: undefined,
        responseStatus: undefined,
      };
    default:
      throw new Error();
  }
};

const useBackendApi = (initialProps = { method: 'get' }) => {
  const [props, setProps] = useState(initialProps);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isComplete: false,
    isLoading: false,
    error: undefined,
    data: initialProps.response,
  });

  async function tryParseResponse(response, logger) {
    // no content
    if (response.status === 204) {
      return NO_CONTENT;
    }
    let respBody = 'UNABLE_TO_PARSE_RESPONSE_BODY';
    try {
      respBody = await response.json();
    } catch (error) {
      logger.error('Unable to parse backend response.', { error });
    }

    return respBody;
  }

  useEffect(() => {
    const url = props.url;
    if (!url) return;

    let didCancel = false;

    const fetchData = async () => {
      const urlObj = new URL(url, 'http://localhost');
      const scopedLogger = logger.scoped({ path: urlObj.pathname + urlObj.search + urlObj.hash });

      dispatch({ type: FETCH_INIT });

      try {
        const response = await fetch(url, { credentials: 'same-origin', ...props });
        const status = response.status;

        scopedLogger.with({ status, requestID: response.headers.get('X-Request-ID') });

        if (didCancel) {
          scopedLogger.debug('Backend responded to canceled request.');
          return;
        }

        let respBody = await tryParseResponse(response, scopedLogger);

        if (status >= 200 && status < 400) {
          dispatch({ type: FETCH_SUCCESS, payload: respBody, responseStatus: status });
        } else {
          scopedLogger.warn('Backend response status code was not OK.');

          dispatch({
            type: FETCH_FAILURE,
            error: { status: response.status, body: respBody },
            responseStatus: status,
          });
        }
      } catch (error) {
        scopedLogger.error('Error doing backend request.', { error });

        if (didCancel) return;

        dispatch({ type: FETCH_FAILURE, error });
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [props]);

  useEffect(() => {
    if (state.isComplete) {
      dispatch({ type: RESET });
    }
  }, [state.isComplete]);

  const doFetch = props => {
    setProps({});
    setProps(props);
  };

  return [state, doFetch];
};

export default useBackendApi;
