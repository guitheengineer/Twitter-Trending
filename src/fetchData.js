export default async function fetchData(dispatch, data) {
  dispatch({ type: "LOADING_TRUE" });
  try {
    dispatch({ type: "ERROR_FALSE" });
    // Link setted to trends based on the input country code.
    let link = `/api/trends/${data.currentTrendingCountry}`;
    const response = await fetch(link);
    const trendsData = await response.json();
    dispatch({
      type: "SET_TREND_LIST",
      payload: trendsData.slice(0, data.quantityTrends),
    });
  } catch {
    // Case the tentative of fetching doesn't work properly, code inside catch will be executed.
    // Set is error state to true.
    dispatch({ type: "ERROR_TRUE" });
  }
  dispatch({ type: "LOADING_FALSE" });
}
