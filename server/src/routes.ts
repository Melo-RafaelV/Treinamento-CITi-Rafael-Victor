import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import {createCalcado,getAllCalcados,updateCalcado,deleteCalcado, getCalcadoById,
    getCalcadosPorTamanho,getCalcadosPorMarca,getTotalEstoque} from "./controllers/CalcadosController";


const routes = express.Router();

routes.get("/users", readAllUsers);

routes.post("/calcados", createCalcado); 
routes.get("/calcados", getAllCalcados); 
routes.patch("/calcados/:id", updateCalcado); 
routes.delete("/calcados/:id", deleteCalcado); 
routes.get("/calcados/:id", getCalcadoById);


routes.get("/calcados/tamanho/:tamanho", getCalcadosPorTamanho);
routes.get("/calcados/marca/:marca", getCalcadosPorMarca);
routes.get("/calcados/estoque/total", getTotalEstoque);

export default routes;
