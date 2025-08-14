import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx"
import CustomerCard from "../components/CustomerCard.jsx"
import createCustomer from "../utils/Customer";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const dummyCustomers = [
  createCustomer("Jeff Smith", "jeff.smith@example.com", "555-0001"),
  createCustomer("Alice Johnson", "alice.johnson@example.com", "555-0002"),
  createCustomer("Bob Williams", "bob.williams@example.com", "555-0003"),
  createCustomer("Cathy Brown", "cathy.brown@example.com", "555-0004"),
  createCustomer("David Lee", "david.lee@example.com", "555-0005"), //later, make a file to store this mess
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

  const firstPassCustomers = customers //logic to sort based on search term
      .filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) //remove non-matching customers
        || customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        || customer.phone.includes(searchTerm)  
        )
      .map(c => {
        let priority = 3;  //map that assigns priority, name comes first, followed by email -> phone
        if (c.name.toLowerCase().includes(searchTerm.toLowerCase())) priority = 1;
        else if (c.email.toLowerCase().includes(searchTerm.toLowerCase())) priority = 2;
        else if (c.phone.includes(searchTerm)) priority = 3;
        return { ...c, priority };
        });

  const filterCustomers = firstPassCustomers.sort((a, b) => {  
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
        }
      return a.name.localeCompare(b.name); //final alphabetical sort for the case of matches
  });      



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




      <div style= {{ 
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        overflowY: "auto",
        maxHeight: "600px",
        gap: "7px"
        }}>                     
        {filterCustomers.map((customer) => (
          <div style={{ 
            minWidth: "400px",
            flex: "1 1 calc(33%)"    //style for 3-column view
        }}
        onClick={() => {
          navigate(`/customer/${customer.id}`)}} //click to transport to customer screen
        >
          <CustomerCard key={customer.email} customer={customer} />
          </div>
        ))}
      </div>
    </div>
  );
}