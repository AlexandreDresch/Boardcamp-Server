import { Router } from "express";

import {
  getCustomerByID,
  getCustomers,
  postCustomer,
  updateCustomer,
} from "../controllers/customersController.js";

import { customerValidation } from "../middlewares/customerValidation.js";

import { customerSchema } from "../schemas/customerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerByID);
customersRouter.post("/customers", customerValidation(customerSchema), postCustomer);
customersRouter.put("/customers/:id", customerValidation(customerSchema), updateCustomer);

export default customersRouter;
