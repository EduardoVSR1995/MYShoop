import { prisma } from "@/config";
import { PayMent } from "@prisma/client";

async function creatPayMent(data: Omit<PayMent, "id">) {
  return prisma.payMent.create({
    data
  });
}

const payMentRepository = {
  creatPayMent,
};

export default payMentRepository;

