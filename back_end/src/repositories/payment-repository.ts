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
      send: false
    },
    include: {
      User: {
        select: {
          email: true,
          name: true,
          StoreUser: {
            where: {
              Store: {
                nameStore
              }
            },
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

async function updatCodePayment(id: number, code: string) {
  return prisma.payMent.update({
    where: {
      id
    },
    data: {
      code
    }
  });
}

async function updatSendPayment(id:number, send: boolean) {
  return prisma.payMent.update({
    where: {
      id
    },
    data: {
      send
    }
  });
}

const payMentRepository = {
  getPayMent,
  creatPayMent,
  updatSendPayment,
  updatCodePayment,
};

export default payMentRepository;

