// Import everything
import { Contract, ethers, formatEther, formatUnits, parseEther } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";




// Convert user-provided strings in ether to wei for a value
let eth: bigint | string = parseEther("1.0")
console.log('wei', eth)

// Convert user-provided strings in gwei to wei for max base fee
const feePerGas = parseUnits("4.5", "gwei")
console.log('`feePerGas`', feePerGas)

// Convert a value in wei to a string in ether to display in a UI
eth = formatEther(eth)
console.log('ether', eth)

// Convert a value in wei to a string in gwei to display in a UI
eth = formatUnits(feePerGas, "gwei")
console.log('`feePerGas` in gwei', eth, '\n')




const provider = ethers.getDefaultProvider()

// Look up the current block number (i.e. height)
const block = await provider.getBlockNumber()
console.log('block', block);

// Get the current balance of an account (by address or ENS name)
let balance = await provider.getBalance("ethers.eth")
console.log('balance', balance)

// Since the balance is in wei, you may wish to display it
// in ether instead.
eth = formatEther(balance)
console.log('ether', eth)

// Get the next nonce required to send a transaction
const nonce = await provider.getTransactionCount("ethers.eth")
console.log('nonce', nonce, '\n')




// The contract ABI (fragments we care about)
const abi = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function balanceOf(address a) view returns (uint)"
]

// Create a contract; connected to a Provider, so it may
// only access read-only methods (like view and pure)
const contract = new Contract("dai.tokens.ethers.eth", abi, provider)

// The symbol name for the token
const sym = await contract.symbol()
console.log('symbol', sym)

// The number of decimals the token uses
const decimals = await contract.decimals()
console.log('decimals', decimals)

// Read the token balance for an account
balance = await contract.balanceOf("ethers.eth")
console.log('balance', balance)

// Format the balance for humans, such as in a UI
eth = formatUnits(balance, decimals)
console.log('ether', eth)
