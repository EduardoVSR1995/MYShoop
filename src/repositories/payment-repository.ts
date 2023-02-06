import { prisma } from "@/config";
import { PayMent } from "@prisma/client";

async function creatPayMent(data: Omit<PayMent, "id" | "code" | "send">) {
  return prisma.payMent.create({
    data
  });
}

async function getPayMent(nameStore: string ) {
  return prisma.payMent.findMany({
    where: {
      payd: true,
    },
    select: {
      User: {
        select: {
          StoreUser: {
            where: {
              Store: {
                nameStore,
              },
            },
            select: {
              User:{
                select: {
                  name: true,
                  email: true,
                  urlImage: true,  
                  Addres: true
                },
              },
            },
          },
        }
      },
      Product: {        
        select: {
          id: true,
          name: true,          
          UrlImage: true  
        }
      },
    }
  });
}

const payMentRepository = {
  getPayMent,
  creatPayMent,
};

export default payMentRepository;

