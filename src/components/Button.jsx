export default function Button({ onClick, children, style}) {
    const baseStyle = {
        border: "1px solid #007BFF",  
        backgroundColor: "#007BFF", 
        color: "#E6F0FF",  
        paddingTop: "6px",
        paddingBottom: "4px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "50px",
        fontSize: "14px",
        fontWeight: "bold",
    };

    return (
    <button
      onClick={onClick}
      style={{...baseStyle, ...style}}
    >
      {children}
    </button>
  );

    

}