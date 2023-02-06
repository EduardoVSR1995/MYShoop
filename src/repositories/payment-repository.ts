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
    include: {
      User: {
        select: {
          StoreUser: {
            where: {
              Store: {
                nameStore
              }
            }
          }
        }
      },
      Product:{
        include: {
          UrlImage: true
        },
      },
      Addres:true
    },
  });
}

const payMentRepository = {
  getPayMent,
  creatPayMent,
};

export default payMentRepository;

