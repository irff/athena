/**
 * The global state selectors
 */
const selectGlobal = () => (state) => state.get('global').toJS();

const selectGlobalToJS = () => (state) => state.get('global').toJS();

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectGlobalToJS,
  selectLocationState,
};
