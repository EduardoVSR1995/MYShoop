import payMentRepository from "@/repositories/payment-repository";

async function listPayment(shoop: string) {
  const products = await payMentRepository.getPayMent(shoop);

  return products ;
}

const paymentService = {
    listPayment,
};

export default paymentService;
