import express, { Request, Response } from "express";
import userRoutes from "./handlers/users";
import orderRoutes from "./handlers/orders";
import productRoutes from "./handlers/products";
import bodyParser from "body-parser";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("store backend api");
});

userRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
