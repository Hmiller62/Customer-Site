import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx"
import CustomerCard from "../components/CustomerCard.jsx"
import createCustomer from "../utils/Customer";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const dummyCustomers = [
  createCustomer("Jeff", "jeff@example.com", "555-1234"),
  createCustomer("Alice", "alice@example.com", "555-5678"),
  createCustomer("Bob", "bob@example.com", "555-9012")
  ];
  const [customers, setCustomers] = useState(dummyCustomers);
  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <p>This is your first custom component.</p>
      <SearchBar
        value={searchTerm}        // controlled input: current state
        onChange={setSearchTerm}  // callback to update state
        placeholder="Search users..." // optional text
      />
      <div className="customer-list">
        {customers.map((customer) => (
          <CustomerCard key={customer.email} customer={customer} />
        ))}
      </div>

    </div>
  );
}