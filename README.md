Restake-to-Grow Vault
“Don’t just stake — restake to grow.”
Built for Octant v2 DeFi Hackathon

Overview
Restake-to-Grow Vault is a yield-donating DeFi vault built on Octant v2, designed to help DAOs and L2 treasuries channel their staking yield directly into ecosystem growth — automatically, transparently, and onchain.
Instead of yield sitting idle in a treasury, this vault splits and routes staking returns between the DAO treasury and a GrowthPool, which can fund grants, hackathons, developer incentives, or public goods — all governed by DAO voting.

The Problem
DAOs often stake large amounts of ETH or LSTs (like stETH, eETH, or rETH) to earn yield.
However, that yield is usually auto-compounded into the treasury, with no direct link to ecosystem growth.
•	💤 Idle yield compounds silently
•	💰 Builders and public goods go underfunded
•	🧭 There’s no automated treasury-to-ecosystem flow

The Solution
Restake-to-Grow Vault introduces programmable yield routing through Octant v2 vaults.
Here’s how it works:
1.	DAO deposits ETH, stETH, or eETH into the vault
2.	The vault allocates funds to yield strategies (Aave, EigenLayer, Yearn v3, etc.)
3.	When yield is harvested:
o	70% auto-compounds back to the treasury
o	30% flows into a GrowthPool smart contract
4.	DAO governance votes on how GrowthPool funds are used (grants, incentives, bounties, etc.)
This creates a flywheel — staking yield continuously funds ecosystem growth, attracting more users and developers, and ultimately more deposits.

Architecture
High-level design:
DAO Treasury
     │
     ▼
Restake-to-Grow Vault (ERC-4626)
     │
     ├──> Yield Strategies (stETH / Aave / EigenLayer)
     │
     └──> GrowthPool (Governance-controlled)
              ├── Grants
              ├── Hackathon Rewards
              ├── Developer Incentives
              └── Public Goods Funding
Built with:
• Octant v2 Vault architecture
•	ERC-4626 standard
•	LST yield sources (stETH, eETH)
•	Onchain governance (snapshot-compatible voting)
•	Transparent analytics dashboard (React + Tailwind frontend)

Getting Started
1. Clone the repo
git clone https://github.com/<JohnOluB>/restake-to-grow-vault.git
cd restake-to-grow-vault
2. Install dependencies
npm install
3. Run the frontend
npm run dev
4. Deploy smart contracts (Hardhat)
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
5. Configure vault
Edit .env with your strategy addresses and treasury wallet.

Link to the live project: https://restake-to-grow.vercel.app/

Features
•	Automated Yield Routing — split staking returns between treasury & GrowthPool
•	DAO Governance — decide where yield goes
•	ERC-4626 Compatible — plug-and-play with Octant vaults
•	Multi-strategy Support — restake across protocols
•	Transparent Dashboard — view growth allocations in real time

Why It Matters
This vault model aligns incentives between:
•	Treasuries — still earn yield
•	Builders — receive consistent support
•	Communities — see transparent onchain funding
It transforms passive staking into an active growth engine for any ecosystem.

Don’t just stake — restake to grow.”

