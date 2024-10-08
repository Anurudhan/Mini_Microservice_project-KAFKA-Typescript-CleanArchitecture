import express ,{Application, NextFunction, Request, Response} from "express";
import  dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { addProduct } from "../infrastructure/route/addProduct";
import {dependencies} from '../config/dependencies'


dotenv.config();
const app: Application = express();
const PORT: number = Number(process.env.PORT)

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(cookieParser());

app.use(addProduct(dependencies))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const errorResponse = {
        errors : [{ message : err?.message || 'something went wrong'}]
    };
    return res.status(500).json(errorResponse);
    
});

app.listen(PORT,()=>{
    console.log(`The auth-service is listening to the port ${PORT}`);
    
});

export default app;