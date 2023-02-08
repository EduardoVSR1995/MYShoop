import payMentRepository from "@/repositories/payment-repository";

async function listPayment(shoop: string) {
  const products = await payMentRepository.getPayMent(shoop);

  return products ;
}

async function updatCodePayment(paymentId: number, code: string, send: boolean) {
  
  if(send) return payMentRepository.updatSendPayment(paymentId, send);

  return payMentRepository.updatCodePayment(paymentId, code); 
}

const paymentService = {
  listPayment,
  updatCodePayment,
};

export default paymentService;
