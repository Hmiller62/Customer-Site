import { v4 as uuidv4 } from 'uuid';  //generator for unique id

export default function createCustomer(name, email, phone, subscriptions = [], transactions = [], active = true, balance = 0) {
    return {id: uuidv4(), name, email, phone, subscriptions, transactions, active, balance};
}


export function createSubscription(vehicle) {
    return vehicle;
}

export function createTransaction(transaction) {
    return transaction;
}
