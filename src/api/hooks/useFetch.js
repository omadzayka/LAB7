import { useEffect, useReducer } from 'react'

const initialState = { loading: true, error: null, data: null }

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { loading: true, error: null, data: null }
    case 'SUCCESS':
      return { loading: false, error: null, data: action.data }
    case 'ERROR':
      return { loading: false, error: action.error, data: null }
    default:
      return state
  }
}

// fetcher: (signal) => Promise, deps: values the fetcher depends on (like useEffect's array)
export function useFetch(fetcher, deps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'START' })

    fetcher(controller.signal)
      .then((data) => dispatch({ type: 'SUCCESS', data }))
      .catch((error) => {
        if (error.name === 'AbortError') return // cancelled on purpose, not a real error
        dispatch({ type: 'ERROR', error })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
