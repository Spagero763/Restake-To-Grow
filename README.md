Restake-to-Grow Vault

“Don’t just stake, restake to grow.”
Built for Octant v2 DeFi Hackathon

Overview
Restake-to-Grow Vault is a yield-donating DeFi vault built on Octant v2, designed to help DAOs and L2 treasuries channel their staking yield directly into ecosystem growth automatically, transparently, and onchain.
Instead of yield sitting idle in a treasury, this vault splits and routes staking returns between the DAO treasury and a GrowthPool, which can fund grants, hackathons, developer incentives, or public goods all governed by DAO voting.

Built with:
• Octant v2 Vault architecture
• ERC-4626 standard
• LST yield sources (stETH, eETH)
• Onchain governance (snapshot-compatible voting)
• Transparent analytics dashboard (React + Tailwind frontend)

Getting Started
1. Clone the repo
git clone https://github.com/JohnOluB/restake-to-grow-vault.git

2. cd restake-to-grow-vault

3. Install dependencies
npm install
4. Run the frontend
npm run dev
5. Deploy smart contracts (Hardhat)
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
6. Configure vault
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

