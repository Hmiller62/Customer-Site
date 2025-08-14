import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx"
import CustomerCard from "../components/CustomerCard.jsx"
import createCustomer from "../utils/Customer";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const dummyCustomers = [
  createCustomer("Jeff Smith", "jeff.smith@example.com", "555-0001"),
  createCustomer("Alice Johnson", "alice.johnson@example.com", "555-0002"),
  createCustomer("Bob Williams", "bob.williams@example.com", "555-0003"),
  createCustomer("Cathy Brown", "cathy.brown@example.com", "555-0004"),
  createCustomer("David Lee", "david.lee@example.com", "555-0005"),
  createCustomer("Ella Davis", "ella.davis@example.com", "555-0006"),
  createCustomer("Frank Miller", "frank.miller@example.com", "555-0007"),
  createCustomer("Grace Wilson", "grace.wilson@example.com", "555-0008"),
  createCustomer("Henry Moore", "henry.moore@example.com", "555-0009"),
  createCustomer("Isla Taylor", "isla.taylor@example.com", "555-0010"),
  createCustomer("Jack Anderson", "jack.anderson@example.com", "555-0011"),
  createCustomer("Kara Thomas", "kara.thomas@example.com", "555-0012"),
  createCustomer("Liam White", "liam.white@example.com", "555-0013"),
  createCustomer("Mia Harris", "mia.harris@example.com", "555-0014"),
  createCustomer("Noah Martin", "noah.martin@example.com", "555-0015")
  ];
  const [customers, setCustomers] = useState(dummyCustomers);
  return (
    <div
      style={{  //style for whole screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
      }}
    >
      <h1>Customer Dashboard</h1>
        <div
          style={{
            marginBottom: "20px"       
          }}
        >
          <SearchBar
            value={searchTerm}        
            onChange={setSearchTerm}  
            placeholder="Search customers..." 
          />
        </div>
      <div style={{ 
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap"
        }}>                     
        {customers.map((customer) => (
          <div style={{ 
            flex: "1 1 calc(33%)",
            maxWidth: "calc(33%)",
            display: "flex",
            justifyContent: "center" //style for 3-column view
        }}>
          <CustomerCard key={customer.email} customer={customer} />
          </div>
        ))}
      </div>
    </div>
  );
}