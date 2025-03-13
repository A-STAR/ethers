// Import everything
import { ethers, formatEther, formatUnits, parseEther } from "ethers";

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
console.log('`feePerGas` in gwei', eth)
