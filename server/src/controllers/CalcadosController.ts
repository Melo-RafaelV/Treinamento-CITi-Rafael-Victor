import { Request, Response } from "express";
import prisma from "@database";
import {contarTotalEstoque, buscarPorTamanho, buscarPorMarca}  from "../repositorie/CalcadosRepository";


export const createCalcado = async (req: Request, res: Response) => {
    try {
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;
        
        const novoCalcado = await prisma.calcado.create({
            data: { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque }
        });
        
        return res.status(201).json(novoCalcado);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao cadastrar calçado",
            error,
        });
    }
};


export const getCalcadoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const calcado = await prisma.calcado.findUnique({
            where: { 
                id: Number(id) 
            }
        });

        if (!calcado) {
            return res.status(404).json({
                message: "Calçado não encontrado no sistema."
            });
        }

        return res.status(200).json(calcado);

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao procurar o calçado pelo ID",
            error,
        });
    }
}

export const getAllCalcados = async (req: Request, res: Response) => {
    try {
        const calcados = await prisma.calcado.findMany();

        if (!calcados) {
            return res.status(404).json({
                message: "Nenhum calçado cadastrado ainda no estoque."
            });
        }

        return res.status(200).json(calcados);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados",
            error,
        });
    }
};

export const updateCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        const calcadoAtualizado = await prisma.calcado.update({
            where: { id: Number(id) },
            data
        });
        
        return res.status(200).json(calcadoAtualizado);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar o calçado",
            error,
        });
    }
};

export const deleteCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        await prisma.calcado.delete({
            where: { id: Number(id) }
        });
        
        return res.status(204).send(); 
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao excluir o calçado",
            error,
        });
    }
};


export const getCalcadosPorTamanho = async (req: Request, res: Response) => {
    try {
        const { tamanho } = req.params;
        const calcados = await buscarPorTamanho(Number(tamanho));
        
        return res.status(200).json(calcados);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar por tamanho",
            error,
        });
    }
};

export const getCalcadosPorMarca = async (req: Request, res: Response) => {
    try {
        const { marca } = req.params;
        const calcados = await buscarPorMarca(marca);
        
        return res.status(200).json(calcados);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar por marca",
            error,
        });
    }
};

export const getTotalEstoque = async (req: Request, res: Response) => {
    try {
        const total = await contarTotalEstoque();
        
        return res.status(200).json({ total_pares_estoque: total });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao contar o estoque",
            error,
        });
    }
};