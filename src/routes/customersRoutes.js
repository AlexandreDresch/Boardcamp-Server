import { Router } from "express";

import {
  getCustomerByID,
  getCustomers,
  postCustomer,
  updateCustomer,
} from "../controller/customersController.js";

import { customerValidation } from "../middleware/customerValidation.js";

import { customerSchema } from "../schema/customerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerByID);
customersRouter.post("/customers", customerValidation(customerSchema), postCustomer);
customersRouter.put("/customers/:id", customerValidation(customerSchema), updateCustomer);

export default customersRouter;
