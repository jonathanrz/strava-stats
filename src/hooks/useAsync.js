import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import useSetState from "./useSetState";

export default function useAsync(
  promiseOrFn,
  deps = promiseOrFn ? [promiseOrFn] : [],
  options = { defer: false }
) {
  const { defer } = options;
  const mounted = useRef(false);
  const requestCounter = useRef(0);

  const [state, setState] = useSetState({
    loading: !defer,
    error: null,
    data: undefined,
  });

  const setData = useCallback((patch) => {
    setState((prevState) => {
      const newData =
        typeof patch === "function" ? patch(prevState.data) : patch;
      setState({ data: newData });
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const run = useCallback((...payload) => {
    requestCounter.current += 1;
    const requestId = requestCounter.current;

    const promise =
      typeof promiseOrFn === "function" ? promiseOrFn(...payload) : promiseOrFn;

    if (!promise) {
      setState({ loading: false });

      return Promise.resolve();
    }

    setState({ loading: true, error: null });

    return promise
      .then((data) => {
        if (mounted.current && requestId === requestCounter.current) {
          setState({
            loading: false,
            data,
          });
        }
      })
      .catch((error) => {
        if (mounted.current && requestId === requestCounter.current) {
          setState({
            loading: false,
            error,
          });
        }
      });
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // By default, the async function is called automatically.
    // Setting `defer` requires you to manually call `run`.
    if (!defer) {
      run();
    }
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps

  // mark as unmounted only once, asap
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const result = useMemo(
    () => ({ ...state, run, setData }),
    [state, run, setData]
  );

  return result;
}
