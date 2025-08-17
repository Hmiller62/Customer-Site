import Button from "./Button"


const cardStyle = {
  border: "3px solid #007BFF",
  backgroundColor: "#E6F2FF",
  paddingLeft: "30px",
  marginBottom: "12px",
  marginTop: "12px",
  borderRadius: "15px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  width: "50%",
  position: "relative"
};

export default function TransactionCard({transaction, deleteTransaction}) {
  return (
    <div style ={cardStyle} className="transaction-card">
          <p>Amount: ${transaction.amount}</p>
          <p>Type: {transaction.description}</p> 
          <p>Date: {transaction.date}</p>
          <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "5px" }}>
            <Button onClick={() => deleteTransaction(transaction)}>Delete</Button>
          </div>
        </div>
  );
}