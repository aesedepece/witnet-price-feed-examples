import * as Witnet from "witnet-requests"

// Retrieves STELLA/USDT-6 price from the HOTBIT HTTP-GET API
const hotbit = new Witnet.Source("https://api.hotbit.io/api/v1/market.last?market=STELLAUSDT")
  .parseJSONMap() // Parse a `Map` from the retrieved `String`
  .getFloat("result") // Get the `Float` value associated to the `result` key
  .multiply(10 ** 6) // Use 6 digit precision
  .round() // Cast to integer

// Retrieve STELLA/USDT-6 price from StellaSwap DEX at Moonbeam
const stellaswap = new Witnet.Source("https://graph.witnet.io/?endpoint=https://api.thegraph.com/subgraphs/name/stellaswap/stella-swap&data=%7B%22query%22%3A%22%7Bpair%28id%3A%5C%220x81e11a9374033d11cc7e7485a7192ae37d0795d6%5C%22%29%7Btoken1Price%7D%7D%22%7D")
  .parseJSONMap()
  .getMap("pair")
  .getFloat("token1Price") // Get the `Float` value associated to the `price` key
  .multiply(10 ** 6) // Use 6 digit precision
  .round() // Cast to integer

// Filters out any value that is more than 1.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [
    [Witnet.Types.FILTERS.deviationStandard, 1.5],
  ],
  reducer: Witnet.Types.REDUCERS.averageMean,
})

// Filters out any value that is more than 2.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [
    [Witnet.Types.FILTERS.deviationStandard, 2.5],
  ],
  reducer: Witnet.Types.REDUCERS.averageMean,
})

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(hotbit)
  .addSource(stellaswap)
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally) // Set the tally function
  .setQuorum(10, 51) // Set witness count and minimum consensus percentage
  .setFees(10 ** 6, 10 ** 6) // Set economic incentives
  .setCollateral(5 * 10 ** 9) // Require 5 wits as collateral

// Do not forget to export the request object
export { request as default }
