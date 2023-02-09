import payMentRepository from "@/repositories/payment-repository";

async function listPayment(shoop: string) {

  const products = await payMentRepository.getPayMent(shoop)

  return products.PayMent;
}

async function createAffiliatPayment(code: string, value: number) {

  if(code) await payMentRepository.createAffiliatedPayment({code, value});

  return;
}

async function updatCodePayment(paymentId: number, code: string, send: boolean) {
  
  if(send) return payMentRepository.updatSendPayment(paymentId, send);

  return payMentRepository.updatCodePayment(paymentId, code); 
}

const paymentService = {
  createAffiliatPayment,
  listPayment,
  updatCodePayment,
};

export default paymentService;
