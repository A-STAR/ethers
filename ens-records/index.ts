import { EventLog, ethers } from "ethers";
import { MulticallProvider } from "@ethers-ext/provider-multicall";

async function getTextRecords(_provider, name) {
  // Prepare a multicall-based provider to batch all the call operations
  const provider = new MulticallProvider(_provider);

  // Get the resolver for the given name
  const resolver = await provider.getResolver(name);

  // A contract instance; used filter and parse logs
  const contract = new ethers.Contract(resolver!.address, [
    "event TextChanged(bytes32 indexed node, string indexed _key, string key)"
  ], provider);

  // A filter for the given name
  const filter = contract.filters.TextChanged(ethers.namehash(name));

  // Get the matching logs
  const logs = await contract.queryFilter(filter);

  // Filter the *unique* keys
  const keys = [ ...(new Set(logs.map((log) => (log as EventLog).args.key))) ];

  // Get the values for the keys; failures are discarded
  const values = await Promise.all(keys.map((key) => {
      try {
          return resolver?.getText(key);
      } catch (error) { }
      return null;
  }));

  // Return a `Map` of the key/value pairs
  return keys.reduce((accum, key, index) => {
      const value = values[index];
      if (value != null) { accum.set(key, value); }
      return accum;
  }, new Map());
}

// Example usage
(async function() {
  const provider = new ethers.InfuraProvider();
  console.log(await getTextRecords(provider, "ricmoo.eth"));
})();
