import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx"
import CustomerCard from "../components/CustomerCard.jsx"
import { useNavigate } from 'react-router-dom';

export default function Dashboard({customers, setCustomers}) {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");


  const firstPassCustomers = customers //logic to sort based on search term and remove inactive users
      .filter(customer => customer.active)
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
            onChange={setSearchTerm}   //customer search bar
            placeholder="Search customers..." 
          />
        </div>

      <div style={{   //customer card style

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