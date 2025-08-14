import createCustomer from "./Customer";
import createVehicle from "./Vehicle";


const dummyCustomers = [
  createCustomer("Jeff Smith", "jeff.smith@example.com", "555-0001"),
  createCustomer("Alice Johnson", "alice.johnson@example.com", "555-0002"),
  createCustomer("Bob Williams", "bob.williams@example.com", "555-0003", [createVehicle("REW3434", "Toyota Prius", "Gray"), createVehicle("BBB9001", "Honda Civic", "White")]),
  createCustomer("Cathy Brown", "cathy.brown@example.com", "555-0004"),
  createCustomer("David Lee", "david.lee@example.com", "555-0005"), 
  createCustomer("Ella Davis", "ella.davis@example.com", "555-0006"),
  createCustomer("Frank Miller", "frank.miller@example.com", "555-0007"),
  createCustomer("Grace Wilson", "grace.wilson@example.com", "555-0008"),
  createCustomer("Henry Moore", "henry.moore@example.com", "555-0009"),
  createCustomer("Isla Taylor", "isla.taylor@example.com", "555-0010"),
  createCustomer("Jack Anderson", "jack.anderson@example.com", "555-0011"),
  createCustomer("Kara Thomas", "kara.thomas@example.com", "555-0012"),
  createCustomer("Liam White", "liam.white@example.com", "555-0013"),
  createCustomer("Mia Harris", "mia.harris@example.com", "555-0014"),
  createCustomer("Noah Martin", "noah.martin@example.com", "555-0015")
  ];

  export default dummyCustomers;