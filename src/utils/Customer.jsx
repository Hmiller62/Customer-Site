export default function createCustomer(name, email, phone, subscriptions = [], active = true, balance = 0) {
    return {name, email, phone, subscriptions, active, balance}
}

export function addSubscription(vehicle, subID) {
    return {vehicle, subID}
}