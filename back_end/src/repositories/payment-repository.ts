import { prisma } from "@/config";
import { PayMent, SalesAffiliated } from "@prisma/client";

async function creatPayMent(data: Omit<PayMent, "id" | "code" | "send">) {
  return prisma.payMent.create({
    data
  });
}

async function getPayMent(nameStore: string ) {
  return prisma.store.findFirst({
    where: {
      nameStore,
      },
    select:{
      PayMent: {
        where:{
          send: false,
          payd: true
        },
        select: {
          id: true,
          code: true,
          User: {
            select:{
              name: true,
              email: true
            },
          },
          Product: {
            select: {
              name: true,
              UrlImage: true
            },
          },
          Addres:true
        }
      }
    }
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

async function createAffiliatedPayment(data: Omit<SalesAffiliated, "id">) {
  return prisma.salesAffiliated.create({
    data
  })

}

const payMentRepository = {
  createAffiliatedPayment,
  getPayMent,
  creatPayMent,
  updatSendPayment,
  updatCodePayment,
};

export default payMentRepository;

