import React, { useState } from "react";
import Database from "../utils/database.jsx"
import SubscriptionCard from "../components/SubscriptionCard.jsx"
import { useNavigate, useParams } from 'react-router-dom';

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
              <div>Email: {currCustomer.email}</div>
              <div>Phone: {currCustomer.phone}</div>
              <h3>Active Subscriptions</h3> 

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
