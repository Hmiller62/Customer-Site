import createCustomer from "./Customer";
import createVehicle from "./Vehicle";


const dummyCustomers = [
  createCustomer("Jeff Smith", "jeff.smith@example.com", "555-0001"),
  createCustomer("Alice Johnson", "alice.johnson@example.com", "555-0002"),
  createCustomer("Bob Williams", "bob.williams@example.com", "555-0003", [createVehicle("REW3434", "Toyota Prius", "Gray"), createVehicle("BBB9001", "Honda Civic", "White")]),
  createCustomer("Liam White", "liam.white@example.com", "555-0013"),
  createCustomer("Olivia Brown", "olivia.brown@example.com", "303-555-0124"),
  createCustomer("Noah Johnson", "noah.johnson@example.com", "212-555-0235"),
  createCustomer("Emma Davis", "emma.davis@example.net", "415-555-0346"),
  createCustomer("Oliver Smith", "oliver.smith@example.org", "617-555-0457"),
  createCustomer("Ava Miller", "ava.miller@example.com", "718-555-0568"),
  createCustomer("Elijah Wilson", "elijah.wilson@example.net", "202-555-0679"),
  createCustomer("Sophia Moore", "sophia.moore@example.org", "305-555-0780"),
  createCustomer("Lucas Taylor", "lucas.taylor@example.com", "503-555-0891"),
  createCustomer("Mia Anderson", "mia.anderson@example.net", "646-555-0902"),
  createCustomer("Ethan Thomas", "ethan.thomas@example.org", "312-555-1013"),
  createCustomer("Isabella Jackson", "isabella.jackson@example.com", "213-555-1124"),
  createCustomer("James White", "james.white@example.net", "404-555-1235"),
  createCustomer("Charlotte Brown", "charlotte.brown@example.org", "303-555-1346"),
  createCustomer("Benjamin Harris", "benjamin.harris@example.com", "212-555-1457"),
  createCustomer("Amelia Lewis", "amelia.lewis@example.net", "415-555-1568"),
  createCustomer("William Clark", "william.clark@example.org", "617-555-1679"),
  createCustomer("Harper Robinson", "harper.robinson@example.com", "718-555-1780"),
  createCustomer("Alexander Walker", "alexander.walker@example.net", "202-555-1891"),
  createCustomer("Evelyn Hall", "evelyn.hall@example.org", "305-555-1902"),
  createCustomer("Daniel Allen", "daniel.allen@example.com", "503-555-2013"),
  createCustomer("Abigail Young", "abigail.young@example.net", "646-555-2124"),
  createCustomer("Matthew King", "matthew.king@example.org", "312-555-2235"),
  createCustomer("Emily Wright", "emily.wright@example.com", "213-555-2346"),
  createCustomer("Joseph Scott", "joseph.scott@example.net", "404-555-2457")
  ];

  function loadDatabase() {
  const saved = localStorage.getItem("database");
  if (saved) {
    return JSON.parse(saved);
  }
  
  localStorage.setItem("database", JSON.stringify(dummyCustomers));
  return dummyCustomers;
}

  export default loadDatabase;