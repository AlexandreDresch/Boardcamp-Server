import { Router } from "express";

import {
  getCustomerByID,
  getCustomers,
  postCustomer,
} from "../controller/customersController.js";

import { customerValidation } from "../middleware/customerValidation.js";

import { customerSchema } from "../schema/customerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerByID);
customersRouter.post("/customers", customerValidation(customerSchema), postCustomer);

export default customersRouter;
