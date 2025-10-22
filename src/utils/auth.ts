// src/utils/auth.ts

export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const registerCustomer = (name: string, email: string, password: string): string => {
  const customers: Customer[] = JSON.parse(localStorage.getItem("customers") || "[]");

  if (customers.find((c) => c.email === email)) {
    return "Email already registered.";
  }

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
    password,
  };

  customers.push(newCustomer);
  localStorage.setItem("customers", JSON.stringify(customers));

  localStorage.setItem("loggedInCustomer", JSON.stringify(newCustomer));
  return "success";
};

export const loginCustomer = (email: string, password: string): string => {
  const customers: Customer[] = JSON.parse(localStorage.getItem("customers") || "[]");
  const found = customers.find((c) => c.email === email && c.password === password);

  if (!found) return "Invalid email or password.";

  localStorage.setItem("loggedInCustomer", JSON.stringify(found));
  return "success";
};

export const logoutCustomer = () => {
  localStorage.removeItem("loggedInCustomer");
};

export const getLoggedInCustomer = (): Customer | null => {
  return JSON.parse(localStorage.getItem("loggedInCustomer") || "null");
};
