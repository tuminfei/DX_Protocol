use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use std::vec::Vec;

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub enum OrderStatus {
    Invalid,
    Fillable,
    Unfillable,
    Expired,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub enum TradeDirection {
    SellNFT,
    BuyNFT,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct Property {
    property_validator: Option<Principal>,
    property_data: Vec<u8>,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct Fee {
    recipient: Principal,
    amount: u128,
    fee_data: Vec<u8>,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub enum Account {
    Principal(Principal),
    ICRCAccount {
        principal: Principal,
        subaccount: Option<[u8; 32]>, // Optional subaccount
    },
}

// "Base struct" for ExtNFTOrder and ICRC7Order, used by the canister
#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct NFTOrder {
    direction: TradeDirection,
    maker: Account,
    taker: Option<Account>,
    expiry: u64,
    nonce: u64,
    icrc1_token: Principal,
    icrc1_token_amount: u128,
    fees: Vec<Fee>,
    nft: Principal,
    nft_id: u64,
    nft_properties: Vec<Property>,
}

// ExtNFTOrder aligns with NFTOrder
#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct ExtNFTOrder {
    direction: TradeDirection,
    maker: Account,
    taker: Option<Account>,
    expiry: u64,
    nonce: u64,
    icrc1_token: Principal,
    icrc1_token_amount: u128,
    fees: Vec<Fee>,
    ext_nft_token: Principal,
    ext_nft_token_id: u64,
    ext_nft_token_properties: Vec<Property>,
}

// ICRC7Order aligns with NFTOrder except `icrc7_token_amount`
#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct ICRC7Order {
    direction: TradeDirection,
    maker: Account,
    taker: Option<Account>,
    expiry: u64,
    nonce: u64,
    icrc1_token: Principal,
    icrc1_token_amount: u128,
    fees: Vec<Fee>,
    icrc7_token: Principal,
    icrc7_token_id: u64,
    icrc7_token_properties: Vec<Property>,
    icrc7_token_amount: u128,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct OrderInfo {
    order_hash: Vec<u8>,
    status: OrderStatus,
    order_amount: u128,
    remaining_amount: u128,
}
