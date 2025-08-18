export default function SearchBar({ value, onChange, placeholder }) {

  const searchStyle = {
    border: "2px solid black",
    height: "30px",
    width: "400px",
    paddingLeft: "10px",
  }

  return (
    <input style ={searchStyle}
        type="text"
        value={value}                     
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder || "Search..."}  
    />
  );
}
