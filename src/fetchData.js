export default async function fetchData(dispatch, data) {
  dispatch({ type: "LOADING_TRUE" });
  try {
    dispatch({ type: "ERROR_FALSE" });
    let link = `/api/trends/${data.currentTrendingCountry}`;
    const response = await fetch(link);
    const trendsData = await response.json();
    dispatch({
      type: "SET_TREND_LIST",
      payload: trendsData.slice(0, data.quantityTrends),
    });
  } catch {
    dispatch({ type: "ERROR_TRUE" });
  }
  dispatch({ type: "LOADING_FALSE" });
}
