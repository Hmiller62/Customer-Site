const cardStyle = {
  border: "3px solid #007BFF",
  backgroundColor: "#E6F2FF",
  paddingLeft: "30px",
  marginBottom: "12px",
  marginTop: "12px",
  borderRadius: "15px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  width: "90%"
};

export default function CustomerCard({customer}) {
  return (
    <div style ={cardStyle} className="customer-card">
      <h2 style={{fontFamily: "Helvetica"}}>{customer.name}</h2>
      <p style={{fontFamily: "Helvetica"}}>Email: {customer.email}</p>
      <p style={{fontFamily: "Helvetica"}}>Phone: {customer.phone}</p>
    </div>
  );
}