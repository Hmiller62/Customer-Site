export default function Button({ onClick, children}) {
    const baseStyle = {
        border: "1px solid #007BFF",  
        backgroundColor: "#007BFF", 
        color: "#E6F0FF",  
        paddingTop: "6px",
        paddingBottom: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "bold",
    };

    return (
    <button
      onClick={onClick}
      style={baseStyle}
    >
      {children}
    </button>
  );

    

}