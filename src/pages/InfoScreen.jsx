import React, { useState } from "react";
import Database from "../utils/database.jsx"
import SubscriptionCard from "../components/SubscriptionCard.jsx"
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../components/Button";

export default function InfoScreen() {

  const { id } = useParams();
  const currCustomer = Database.find(customer => customer.id === id)
  return (
      <div
      style={{
        paddingLeft: "50px",
        paddingRight: "50px"
      }}
      >
        <div 
        style={{ 
          padding: "20px", 
           }}>
            <div 
            style={{ 
              display: "flex",
              justifyContent: "space-between", 
              alignItems: "center",
              paddingRight: "200px"
              }}>
                  <h1>{currCustomer.name}</h1>
                  <span>{currCustomer.active ? "Active Customer" : "Inactive"}</span>
            </div>
            <div 
            style={{ 
              display: "flex", 
              flexDirection: "column",
               gap: "8px",
              marginTop: "20px"
               }}>
              <h3>Customer Information</h3>   
              <div style={{ 
                display: "flex",   //customer info with buttons
                alignItems: "center", 
                gap: "10px", 
                marginBottom: "8px" 
                }}>
                  <p style={{ margin: 0 }}>Email: {currCustomer.email}</p>
                  <Button onClick={() => console.log("Edit Email")}>Edit</Button>
              </div>

              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px"
                }}>
                  <p style={{ margin: 0 }}>Phone: {currCustomer.phone}</p>
                  <Button onClick={() => console.log("Edit Phone")}>Edit</Button>
              </div>
              <p>Active Balance: ${currCustomer.balance.toFixed(2)}</p>
              

              <div style={{ 
                display: "flex", //button to add subscription
                justifyContent: "space-between", 
                alignItems: "center" 
                }}> 
                  <h3>Active Subscriptions</h3>     
                  <Button onClick={() => console.log("Add subscription")}>+ Add</Button>    
              </div>    

              <div style={{ 
              
                      justifyContent: "center",
                      display: "flex", 
                      alignItems: "center",
                      flexWrap: "wrap",
                      overflowY: "auto",
                      maxHeight: "600px",
                      gap: "7px"
                      }}>                     
                      {currCustomer.subscriptions.map((subscription) => (
                        <div style={{ 
                          minWidth: "400px",
                          flex: "1 1 calc(33%)"    //style for 3-column view
                      }} 
                        >
                        <SubscriptionCard key={subscription.licenseNum} vehicle={subscription} />
                        </div>
                      ))}
                    </div>

        </div>
      </div>
    </div>
)}
