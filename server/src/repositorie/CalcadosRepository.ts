import prisma from "@database";

export const buscarPorTamanho = async (tamanho: number) => {
  return await prisma.calcado.findMany({
    where: { tamanho }
  });
};

export const buscarPorMarca = async (marca: string) => {
  return await prisma.calcado.findMany({
    where: { marca }
  });
};

export const contarTotalEstoque = async () => {
  const result = await prisma.calcado.aggregate({
    _sum: {
      quantidade_em_estoque: true
    }
  });
  return result._sum.quantidade_em_estoque || 0; 
};