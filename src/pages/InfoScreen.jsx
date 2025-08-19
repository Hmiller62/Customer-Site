import { useEffect, useState } from "react";
import SubscriptionCard from "../components/SubscriptionCard.jsx"
import TransactionCard from "../components/TransactionCard";
import { createSubscription } from "../utils/Customer.jsx";
import {useParams } from 'react-router-dom';
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

export default function InfoScreen({customers, setCustomers}) {

  const { id } = useParams();
  const navigate = useNavigate();
  const currCustomer = customers.find(customer => customer.id === id)

  
  const updateCustomer = (updatedCustomer) => {   //use this to put a new customer into the database upon changing info
    setCustomers(prev =>
      prev.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer)
    );
  };

  const deleteCustomer = (id) => {              //removes a customer from database
      setCustomers(prev => {
    const updated = prev.filter(customer => customer.id !== id);
    return updated;
  })
  }



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


  const [editingName, setEditingName] = useState(false);
  const [disName, setDisName] = useState(currCustomer.name);

  let displayName = " "; //same logic for name
  if (editingName) {
    displayName = (
    <input
    type="text"
    value={disName}
    onChange={(inp) => setDisName(inp.target.value)}
    />)
  } else {
    displayName = currCustomer.name
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



  const [editPay, setEditPay] = useState(false);

  const [addingSub, setAddingSub] = useState(false);   //logic for adding/editing subscription
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ licenseNum: "", model: "", color: "" });
  const [editVData, setEditVData] = useState({ licenseNum: "", color: "", model: "" });


  const addSubscription = (newVehicle) => {  //to add a subscription to the car list using save button
  if (!(newVehicle.licenseNum)|| !(newVehicle.model) || !(newVehicle.color)) {
    alert("Please fill out all fields.");
    return;
  }
  const newSub = createSubscription(newVehicle);
  updateCustomer({...currCustomer, subscriptions: [...currCustomer.subscriptions, newSub]})
  setAddingSub(false);
  setNewVehicle({ licenseNum: "", model: "", color: "" });
  }


  const deleteSubscription = (vehicle) => {    //delete a subscription
    updateCustomer({...currCustomer, subscriptions: currCustomer.subscriptions.filter(item => item !== vehicle)
  });
  }

  const startEditing = (vehicle) => {  //edit and save (transfer) subscription
    setEditingVehicle(vehicle);
    setEditVData(vehicle); 
  };

  const saveEdit = () => {
    updateCustomer({
      ...currCustomer,
      subscriptions: currCustomer.subscriptions.map(v =>
        v === editingVehicle ? editVData : v
      ),
    });
    setEditingVehicle(null); 
  };





  const [addingTransaction, setAddingTransaction] = useState(false);   //logic for adding/editing transactions
  const [newTransaction, setNewTransaction] = useState({amount: "", description: "", date: ""})

  const addTransaction = () => {
    if (!(newTransaction.amount)|| !(newTransaction.description) || !(newTransaction.date)) {
    alert("Please fill out all fields.");
    return;
  }
  const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount)) {
    return alert("Transaction amount must be a number.");
  }
    updateCustomer({...currCustomer, transactions: [...currCustomer.transactions, newTransaction]})
    setNewTransaction({amount: "", description: "", date: ""})
    setAddingTransaction(false)
  }

  const deleteTransaction = (transaction) => {
    updateCustomer({...currCustomer, transactions: currCustomer.transactions.filter(item => item !== transaction)
  });
  }

  useEffect(() => {        //display new balance based on saved transactions
    if (!currCustomer || !currCustomer.transactions) return;
    const newBalance = currCustomer.transactions.reduce(
      (total, transaction) => total + parseFloat(transaction.amount || 0),
      0
    );

    if (newBalance !== currCustomer.balance) {
      updateCustomer({ ...currCustomer, balance: newBalance });
    }
  }, [currCustomer.transactions]); 

  const [addingCoupon, setAddingCoupon] = useState(false);   //add a coupon as a transaction
  const [newCoupon, setNewCoupon] = useState("")

  const addCoupon = () => {
        const couponValue = parseFloat(newCoupon);
        if (isNaN(couponValue) || couponValue <= 0) {
          alert("Please enter the amount of money subtracted by the coupon, as a positive integer.");
          return;
        }
        let couponTA = {amount: -(couponValue), description: "Coupon submitted by admin", date: "N/A"}
        updateCustomer({...currCustomer, transactions: [...currCustomer.transactions, couponTA]})
        setNewCoupon("");
        setAddingCoupon(false);
      }




  return (     //style and elements on the screen
      <div>
        <div 
        style={{ 
          marginLeft: "20px", 
          fontFamily: "Helvetica"
           }}>
            <div 
            style={{ 
              marginLeft: "-40px",
              marginRight: "-40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "50px",
              paddingRight: "100px",
              marginTop: "30px",
              marginBottom: "50px",
              backgroundColor: "#EDEBEB",
              }}>
                <div style={{display: "flex",alignItems: "center", gap: "150px"}}>
                  <h1 style={{color: "#024e9fff"}}>{currCustomer.name}</h1>
                  <p>{currCustomer.active ? "Active Customer" : "Inactive"}</p> 
                </div>
                <Button style={{ marginLeft: "auto" }} onClick={() => { //display customer name, activity, and main buttons
                navigate(`/`)}}>Return to Dashboard</Button>
                <Button style={{
                  ...Button.baseStyle,
                  backgroundColor: "#c51717ff",
                  border: "#B82A2A",
                  marginLeft: "20px"
                }} onClick={() => {
                  if (!window.confirm(`Are you sure you want to delete ${currCustomer.name}'s account?`)) {
                    return;
                  }    
                  navigate(`/`);
                  deleteCustomer(currCustomer.id);
                }}>Delete Customer Account</Button>
            </div>






            <div        //display for customer info, option to edit name/phone/email
            style={{ 
              display: "flex", 
              flexDirection: "column",
              gap: "8px",
              marginTop: "20px",
              marginLeft: "30px",
              marginRight: "30px"
               }}>
              <h2 style={{color: "#024e9fff"}}>Customer Information</h2> 
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px", 
                marginBottom: "8px" 
                }}>
                  <p style={{ margin: 0 }}>Name: {displayName}</p>
                  <Button onClick={() => {        //name section
                    if (editingName) {
                      updateCustomer({...currCustomer, name: disName})
                    }
                    setEditingName(!(editingName))
                    }
                    }>{editingName? "Save" : "Edit"}</Button>
              </div>  
              <div style={{ 
                display: "flex",   
                alignItems: "center", 
                gap: "10px", 
                marginBottom: "8px" 
                }}>
                  <p style={{ margin: 0 }}>Email: {emailDisplay}</p>
                  <Button onClick={() => {              //email section
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
                  <Button onClick={() => {       //phone section
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
              </div>




              <div style={{
                display: "flex", 
              flexDirection: "column",
              gap: "8px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "45px"
              }}>
              <p>Active Balance: ${currCustomer.balance.toFixed(2)}</p>
              <div style={{
                display: "flex",
                flexDirection: "column",   
                alignItems: "stretch",              //display and editing for transactions
                width: "100%"
              }}>
                <div style= {{alignItems: "flex-start"}}>
                  <Button onClick={() => setEditPay(!editPay)}>{editPay ? "Close Payment Info" : "View Payment Info"}</Button>
                </div>


                  {editPay && (                         //only visible when view button clicked 
                    <div style={{marginTop: "10px"}}>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        backgroundColor: "#EDEBEB",
                        marginBottom: "10px", 
                        paddingLeft: "30px",
                        paddingRight: "30px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        marginLeft: "-40px",
                        marginRight: "-20px"
                        }}>
                        <h2 style={{ color: "#024e9fff" }}>Transactions</h2>
                        <div style={{
                          display: "flex",
                          gap: "10px"
                        }}>
                          {!addingTransaction && (
                          <Button onClick={() => setAddingTransaction(true)}>+ Add Charge</Button>
                          )}
                          {!addingCoupon && (
                          <Button onClick={() => setAddingCoupon(true)}>Submit Coupon</Button>
                          )}
                        </div>
                      </div>

                      {addingTransaction && ( //text boxes for adding transaction
                        <div style={{ 
                          display: "flex", 
                          gap: "8px", 
                          marginBottom: "10px",
                          }}>
                          <input
                            type="text"
                            placeholder="Amount"
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={newTransaction.description}
                            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                          />
                          <input
                            type="date"
                            value={newTransaction.date}
                            onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                          />
                          <Button onClick={addTransaction}>Submit</Button>
                          <Button onClick={() => setAddingTransaction(false)}>Cancel</Button>
                        </div>
                      )}

                      {addingCoupon &&           //logic for adding a coupon
                      <div style={{ 
                          display: "flex", 
                          gap: "8px", 
                          marginBottom: "10px" 
                          }}>
                          <input
                            type="text"
                            placeholder="Coupon Amount"
                            value={newCoupon}
                            onChange={(e) => setNewCoupon(e.target.value)}
                          />
                          <Button onClick={addCoupon}>Submit</Button>
                          <Button onClick={() => setAddingCoupon(false)}>Cancel</Button>
                        </div>
                      }

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "60%" }}>
                            {currCustomer.transactions.length === 0 && (
                              <p style={{ marginTop: "10px" }}>No transactions found.</p>
                            )}

                            {currCustomer.transactions.length > 0 &&        //transaction cards
                              currCustomer.transactions.map((transaction, index) => (
                                <TransactionCard
                                  key={index}
                                  transaction={transaction}
                                  deleteTransaction={deleteTransaction}
                                />
                              ))
                            }
                      </div>
                    </div>
                  )}
              </div>
              </div>
              





              <div style={{ 
                display: "flex", //logic for viewing/altering subscriptions
                justifyContent: "space-between", 
                alignItems: "center",
                backgroundColor: "#EDEBEB",
                paddingLeft: "15px", 
                paddingRight: "15px", 
                marginRight: "30px"
                }}> 
                  <h3 style={{color: "#024e9fff"}}>Active Subscriptions</h3>     
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
                {editingVehicle && (        //logic for fields to edit subscription
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
                <div style={{                   //subscriptions card display
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
)}

