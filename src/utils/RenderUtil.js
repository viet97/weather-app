import isEqual from "lodash.isequal";

function areEqual(prevProps, nextProps) {
  const { style: prevStyle, ...prevRest } = prevProps;
  const { style: nextStyle, ...nextRest } = nextProps;

  return isEqual(prevStyle, nextStyle) && isEqual(prevRest, nextRest);
}

export function shouldComponentUpdate(nextProps, nextState) {
  return !areEqual(this.props, nextProps) || !isEqual(this.state, nextState);
}