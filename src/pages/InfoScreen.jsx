import React, { useState } from "react";
import Database from "../utils/database.jsx"
import SubscriptionCard from "../components/SubscriptionCard.jsx"
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../components/Button";

export default function InfoScreen() {

  const { id } = useParams();
  const currCustomer = Database.find(customer => customer.id === id)


  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneNum, setPhoneNum] = useState(currCustomer.phone);

  let phoneDisplay = " "; //logic to set phone number using text input
  if (editingPhone) {
    phoneDisplay = (
    <input
    type="text"
    value={phoneNum}
    onChange={(inp) => setPhoneNum(inp.target.value)}
    />)
  } else {
    phoneDisplay = currCustomer.phone
  }

  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState(currCustomer.email);

  let emailDisplay = " "; //same logic for email
  if (editingEmail) {
    emailDisplay = (
    <input
    type="text"
    value={email}
    onChange={(inp) => setEmail(inp.target.value)}
    />)
  } else {
    emailDisplay = currCustomer.email
  }

  const [addingSub, setAddingSub] = useState(false);   //logic for adding subscription
  const [newVehicle, setNewVehicle] = useState({ license: "", make: "", color: "" });



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
                  <p style={{ margin: 0 }}>Email: {emailDisplay}</p>
                  <Button onClick={() => {
                    if (editingEmail) {
                      const isValid = email.includes("@") && !(email.includes(" "));
                      if (isValid) {
                        currCustomer.email = email;
                      } else {
                        setEmail(currCustomer.email);
                      }
                    }
                    setEditingEmail(!(editingEmail))
                    }
                    }>{editingEmail ? "Save" : "Edit"}</Button>
              </div>


              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px"
                }}>
                  <p style={{ margin: 0 }}>Phone: {phoneDisplay}
                  </p>
                  <Button onClick={() => {
                    if (editingPhone) {
                      const isValid = phoneNum.length >= 7 && !/[a-zA-Z]/.test(phoneNum);
                      if (isValid) {
                        currCustomer.phone = phoneNum;
                      } else {
                        setPhoneNum(currCustomer.phone);
                      }
                    }
                    setEditingPhone(!(editingPhone))
                  }
                  }>{editingPhone ? "Save" : "Edit"}</Button>
              </div>
              <p>Active Balance: ${currCustomer.balance.toFixed(2)}</p>
              

              <div style={{ 
                display: "flex", //button to add subscription
                justifyContent: "space-between", 
                alignItems: "center" 
                }}> 
                  <h3>Active Subscriptions</h3>     
                  <Button onClick={() => setAddingSub(true)}>+ Add</Button>

                  {addingSub && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <input 
                        type="text" 
                        placeholder="License Plate" 
                        value={newVehicle.license} 
                        onChange={(e) => setNewVehicle({...newVehicle, license: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Make" 
                        value={newVehicle.make} 
                        onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Color" 
                        value={newVehicle.color} 
                        onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})} 
                      />
                      <Button onClick={handleAddSubscription}>Add</Button>
                      <Button onClick={() => setAddingSub(false)}>Cancel</Button>
                    </div>
                  )}
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

function handleAddSubscription() {
  const newSub = addSubscription(newVehicle, uuidv4());
  currCustomer.subscriptions.push(newSub);
  setAddingSub(false);
  setNewVehicle({ license: "", make: "", color: "" });
}
