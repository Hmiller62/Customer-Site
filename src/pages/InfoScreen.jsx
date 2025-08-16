import React, { useEffect, useState } from "react";
import loadDatabase from "../utils/database.jsx"
import SubscriptionCard from "../components/SubscriptionCard.jsx"
import { createSubscription } from "../utils/Customer.jsx";
import {useParams } from 'react-router-dom';
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

export default function InfoScreen() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(loadDatabase);
  const currCustomer = customers.find(customer => customer.id === id)

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(customers));
  }, [customers]);

  
  const updateCustomer = (updatedCustomer) => {     //use this to put a new customer into the database upon changing info
    setCustomers(prev =>
      prev.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer)
    );
  };


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

  const [addingSub, setAddingSub] = useState(false);   //logic for adding/editing subscription
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ licenseNum: "", model: "", color: "" });
  const [editVData, setEditVData] = useState({ licenseNum: "", color: "", model: "" });


  const addSubscription = (newVehicle) => {  //to add a subscription to the car list using save button
  if (!(newVehicle.licenseNum)|| !(newVehicle.model) || !(newVehicle.color)) {
    alert("Please fill out all fields");
    return;
  }
  const newSub = createSubscription(newVehicle);
  updateCustomer({...currCustomer, subscriptions: [...currCustomer.subscriptions, newSub]})
  setAddingSub(false);
  setNewVehicle({ licenseNum: "", model: "", color: "" });
  console.log("Observe:", currCustomer.subscriptions)
  }


  const deleteSubscription = (vehicle) => {
    console.log("verified")
    updateCustomer({...currCustomer, subscriptions: currCustomer.subscriptions.filter(item => item !== vehicle)
  });
  }

  const startEditing = (vehicle) => {
    setEditingVehicle(vehicle);
    setEditVData(vehicle); // preload form with existing values
  };

  const saveEdit = () => {
    updateCustomer({
      ...currCustomer,
      subscriptions: currCustomer.subscriptions.map(v =>
        v === editingVehicle ? editVData : v
      ),
    });
    setEditingVehicle(null); // close form
  };

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
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "100px",
              marginBottom: "100px"
              }}>
                <div style={{display: "flex",alignItems: "center", gap: "150px"}}>
                  <h1>{currCustomer.name}</h1>
                  <p>{currCustomer.active ? "Active Customer" : "Inactive"}</p>
                </div>
                <Button style={{ marginLeft: "auto"}} onClick={() => {
                navigate(`/`)}}>Return to Dashboard</Button>

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
                        updateCustomer({...currCustomer, email})
                      } else {
                        alert("Email must include an @ symbol and may not include spaces.")
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
                      const isValid = phoneNum.length >= 7 && !(/[a-zA-Z]/.test(phoneNum));
                      if (isValid) {
                        updateCustomer({...currCustomer, phone: phoneNum})
                      } else {
                        alert("Phone number must be at minimum 7 digits and may not include letters.")
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
                  {!addingSub &&
                  <Button onClick={() => setAddingSub(true)}>+ Add</Button>
                  }
                  {addingSub && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <input 
                        type="text" 
                        placeholder="License Plate" 
                        value={newVehicle.licenseNum} 
                        onChange={(e) => setNewVehicle({...newVehicle, licenseNum: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Make" 
                        value={newVehicle.model} 
                        onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Color" 
                        value={newVehicle.color} 
                        onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})} 
                      />
                      <Button onClick={() => addSubscription(newVehicle)}>Save</Button>
                      <Button onClick={() => setAddingSub(false)}>Cancel</Button>
                    </div>
                  )}
              </div>  

              <div>
                {editingVehicle && ( //box that pops up when you edit vehicle
                      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray" }}>
                        <h3>Edit Vehicle</h3>
                        <input
                          type="text"
                          value={editVData.licenseNum}
                          onChange={(e) => setEditVData({ ...editVData, licenseNum: e.target.value })}
                          placeholder="License Number"
                        />
                        <input
                          type="text"
                          value={editVData.model}
                          onChange={(e) => setEditVData({ ...editVData, model: e.target.value })}
                          placeholder="Model"
                        />
                        <input
                          type="text"
                          value={editVData.color}
                          onChange={(e) => setEditVData({ ...editVData, color: e.target.value })}
                          placeholder="Color"
                        />
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={() => setEditingVehicle(null)}>Cancel</button>
                      </div>
                    )}
                <div style={{   //style for subscriptionList
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
                          <SubscriptionCard 
                          key={subscription.licenseNum} 
                          vehicle={subscription} 
                          editSubscription={startEditing}
                          deleteSubscription={deleteSubscription}
                          />
                          </div>
                        ))}
                      </div>
                      
              </div>
        </div>
      </div>
    </div>
)}

