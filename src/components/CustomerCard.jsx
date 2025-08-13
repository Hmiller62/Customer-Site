import React from "react";
import Customer from "../utils/Customer"

export default function CustomerCard({customer}) {
  return (
    <div className="customer-card">
      <h2>{customer.name}</h2>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
}