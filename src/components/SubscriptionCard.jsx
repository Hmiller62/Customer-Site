import Button from "./Button"

const cardStyle = {
  border: "3px solid #007BFF",
  backgroundColor: "#E6F2FF",
  paddingLeft: "30px",
  marginBottom: "12px",
  marginTop: "12px",
  borderRadius: "15px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  width: "90%",
  position: "relative"
};

export default function SubscriptionCard({vehicle, editSubscription, deleteSubscription}) {
  return (
    <div style ={cardStyle} className="vehicle-card">
      <h2>{vehicle.licenseNum}</h2>
      <p>{vehicle.color} {vehicle.model}</p>
      <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "5px" }}>
        <Button onClick={() => editSubscription(vehicle)}>Edit</Button>
        <Button onClick={() => deleteSubscription(vehicle)}>Delete</Button>
      </div>
    </div>
    
  );
}