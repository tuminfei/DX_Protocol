# `DX_Protocol`

## Overview

`DX_Protocol` project aims to implement the 0x protocol on the DFINITY network for decentralized asset trading. The 0x protocol is a decentralized exchange protocol designed to facilitate the proliferation and transparency of decentralized trading, promoting the sharing of market information. We will support three types of orders: NFTs (ICRC7), ICRC1 tokens, and ICP native tokens, with plans to expand to more order types in the future. Through this project, users can create, match, and execute orders on the DFINITY network, enabling decentralized asset trading.

## Architecture

```
                          +------------------------------+
                          |    Frontend Interface        |
                          |------------------------------|
                          |   - User Interface (UI)      |
                          |   - Wallet Integration       |
                          |   - Query Interface          |
                          +--------------+---------------+
                                         |
                                         v
                          +--------------+---------------+
                          |        Backend Services      |
                          |------------------------------|
                          |   - Order Management         |
                          |   - Matching Engine          |
                          |   - Transaction Processor    |
                          +--------------+---------------+
                                         |
                                         v
+----------------------------------------+-----------------------------------------+
|                                DFINITY Network                                   |
|----------------------------------------------------------------------------------|
| +--------------------------+  +---------------------------+  +---------------+   |
| | DX Protocol Contract     |  | DX Protocol Contract      |  | DX Protocol   |   |
| | Sub Canisters            |  | Main Factory Canister     |  | Index Canister|   |
| |--------------------------|  |---------------------------|  |---------------|   |
| |  - Order Market Canister |  |  - Configure Parameters   |  | - Aggregates  |   |
| |  - Batch Order Canister  |  |  - Generate Contract      |  |   Order Info  |   |
| |  - RFQ Order Canister    |  |    Canisters              |  |   from Market |   |
| |                          |  |                           |  |   Canisters   |   |
| +--------+-----------------+  +-------------+-------------+  +---------------+   |
|          |                                  |                                    |
|          v                                  v                                    |
| +--------+------------------------------------------------+---------------------+|
| |                   Canister Smart Contracts on ICP Blockchain                   |
| +------------------------------------------------------+------------------------+|
+----------------------------------------+-----------------------------------------+
                                         |
                                         v
                          +--------------+----------------+
                          |        External Services      |
                          |-------------------------------|
                          |   - Price Oracles             |
                          |   - External APIs             |
                          +-------------------------------+

This architecture diagram offers a high-level view of how the DX Protocol will be implemented on the DFINITY network, showing the interactions between different components to support decentralized asset trading.
```

## DX Protocol Canisters Structure Diagram

### Main Protocol Canister

Main Protocol Canister
- APPROVED_ASSETS
- MODULES
- SUPPORTED_ORDER_TYPES
- SUPPORTED_ASSET_TYPES

+ approve_asset()
+ register_trading_module()
+ register_order_type()
+ register_asset_type()
+ get_trading_modules()
+ is_asset_approved()
+ get_supported_order_types()
+ get_supported_asset_types()
  
-----------


### Sub-Trade Canisters

#### Limit Order Canister
- ORDERS
- NEXT_ID

+ create_limit_order()
+ complete_order()
+ cancel_order()
+ get_order_status()
+ verify_signature()
  
+-----------------------------+
  
#### Market Order Canister
- ORDERS
- NEXT_ID

+ create_market_order()
+ complete_order()
+ cancel_order()
+ get_order_status()
+ verify_signature()

+-----------------------------+
  
#### Stop-Limit Order Canister
- ORDERS
- NEXT_ID

+ create_stop_limit_order()
+ complete_order()
+ cancel_order()
+ get_order_status()
+ verify_signature()

+-----------------------------+

#### RFQ Order Canister
- ORDERS
- NEXT_ID

+ request_quote()
+ create_rfq_order()
+ complete_order()
+ cancel_order()
+ get_order_status()
+ verify_signature()

-----------


### **Fields and Methods**

#### **Main Protocol Canister**

- **Fields**
  - `APPROVED_ASSETS`: `HashMap<Principal, bool>` — Stores approved assets.
  - `MODULES`: `HashMap<String, TradingModule>` — Stores registered trading modules.
  - `SUPPORTED_ORDER_TYPES`: `HashMap<String, SupportedOrderType>` — Stores supported order types.
  - `SUPPORTED_ASSET_TYPES`: `HashMap<String, SupportedAssetType>` — Stores supported asset types.

- **Methods**
  - `approve_asset(asset: Principal) -> Result<(), String>`: Approves an asset.
  - `register_trading_module(module_type: String, canister: Principal) -> Result<(), String>`: Registers a trading module.
  - `register_order_type(order_type: String, description: String) -> Result<(), String>`: Registers an order type.
  - `register_asset_type(asset_type: String, description: String) -> Result<(), String>`: Registers an asset type.
  - `get_trading_modules() -> HashMap<String, TradingModule>`: Retrieves all registered trading modules.
  - `is_asset_approved(asset: Principal) -> bool`: Checks if an asset is approved.
  - `get_supported_order_types() -> HashMap<String, SupportedOrderType>`: Retrieves supported order types.
  - `get_supported_asset_types() -> HashMap<String, SupportedAssetType>`: Retrieves supported asset types.

#### **Sub-Trade Canisters**

- **Fields**
  - `ORDERS`: `HashMap<u64, Order>` — Stores order information.
  - `NEXT_ID`: `u64` — The ID for the next order.

- **Methods**
  - `create_limit_order(asset: Principal, amount: u64, price: u64, signature: Vec<u8>) -> Result<u64, String>`: Creates a limit order.
  - `complete_order(order_id: u64) -> Result<(), String>`: Completes an order.
  - `cancel_order(order_id: u64) -> Result<(), String>`: Cancels an order.
  - `get_order_status(order_id: u64) -> Result<OrderStatus, String>`: Retrieves the status of an order.
  - `verify_signature(order: &Order) -> bool`: Verifies the signature of an order.

For Market Orders, Stop-Limit Orders, and RFQ Orders, similarly implement the specific order type handling methods.


### Frontend Interface

Provides users with a UI to interact with the DX Protocol, including creating, managing, and executing orders.
Integrates wallets for transaction signing.
Offers a query interface for real-time data and order information.

### Backend Services

Manages orders, processes matches, and handles transactions.
Ensures efficient operation and interaction with the DFINITY network.

### DX Protocol Contract Canisters

Includes different canisters for handling Order, Batch Order, and RFQ Order markets.
Manages the core functionalities for each order type.

### DX Protocol Contract Factory Canister

Configures basic DX Protocol parameters.
Generates new DX Protocol Contract Canisters as needed.

### DX Protocol Index Canister

Aggregates all order information from various market canisters.
Facilitates the aggregation of orders across different markets, enhancing market visibility and transparency.

### External Services

Provides additional data such as real-time prices through oracles.
Integrates external APIs for extended functionalities.

## Milestone

### Milestone 1: Protocol Canister Design and Basic Functionality Implementation

Objectives:

Design and implement a smart contract system that supports various asset transactions, including NFTs (ICRC7), ICRC1 tokens, and ICP native tokens.
Implement basic functionalities such as the creation, matching, and execution of Limit Orders.
Deploy smart contracts on the DFINITY network and conduct initial testing.

Tasks:

Design a generic order structure that supports standardized data formats and transaction logic.
Implement smart contract logic for the creation, matching, and execution of Limit Orders.
Integrate security features such as signature verification, permission control, and exception handling mechanisms.
Develop modular smart contract components for future expansion to support new order types and protocols.

### Milestone 2: Order Type Expansion and Protocol Optimization

Objectives:

Expand support for more complex order types, including Batch Orders and Request for Quote (RFQ) orders.
Optimize smart contracts to improve efficiency, reduce gas costs, and enhance security and reliability.
Conduct thorough testing and security audits to ensure the stability and resilience of smart contracts.

Tasks:

Research and implement smart contract logic to support various order types, including different trading strategies and execution rules.
Optimize smart contract code using best practices and optimization techniques to enhance transaction processing efficiency and user experience.
Develop a comprehensive testing suite to cover various scenarios and edge cases, including stress testing and security vulnerability detection.
Conduct external security audits to ensure the security and resilience of smart contracts, while implementing necessary improvements.

### Milestone 3: User Interface Development and Mainnet Deployment Preparation

Objectives:

Design an intuitive, user-friendly frontend interface that supports users in creating, managing, and executing various types of orders.
Provide an aggregated information query interface and integration with popular wallets to simplify user transaction processes and asset management.
Prepare for project deployment and promotion on the mainnet to ensure a smooth launch and user experience.

Tasks:

Design and develop a responsive frontend interface that supports multi-device access and real-time data updates.
Develop interfaces/integrations for easy asset and transaction management by users.
Write user documentation and tutorials to help users get started quickly and use the platform effectively.
Conduct final user acceptance testing and make final adjustments and optimizations before deployment.
Plan and execute the deployment of the project on the mainnet to ensure a smooth transition and system stability.

## Run Project

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `DX_Protocol`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd DX_Protocol/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
