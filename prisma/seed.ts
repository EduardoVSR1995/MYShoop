import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import axios from "axios"

const prisma = new PrismaClient();

type data = {
   data:{ 
  results:[
    {
      title: string,
      id:string,
      price: number,
    }
  ]
}
} 
type picture = {
  data: [{
    body: {
      pictures: [{
        secure_url:string
        }]
      }
    }
  ]
}

async function main() {
  await prisma.urlImage.deleteMany({})
  await prisma.cart.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.categori.deleteMany({})
  await prisma.store.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})

  const data =  await axios.get("https://api.mercadolibre.com/sites/MLB/search?category=MLB3937&listing_type_id=gold_special&condition=new", {headers: {"Authorization":`Bearer ${process.env.TOKEN}` }}) as unknown
  const list = data as data
  const listOu = list.data;
  
  const hashedPassword = await bcrypt .hash("dudu", 12);

  const owner = await prisma.user.create({
    data:{
      name: "Dudu",
      email: "eduardvitor7@gmail.com",
      password: hashedPassword,
      urlImage: "https://lh3.googleusercontent.com/ogw/AAEL6sg1I7IEWU2qlQHfNZcz0SiJ4oSa6lZcrCBCta7EpQ=s32-c-mo",
      owner: true
    }
  })

  const shop = await prisma.store.create({
    data: {
      nameStore: "MYShoop"
    }
  })

  await prisma.storeUser.create({
    data: {
      UserId: owner.id,
      StoreId: shop.id
    }
  })
  
  const categori = await prisma.categori.create({
    data: {
      name: "Joias e Relógios", 
    }
  })

  for(let i =0 ; i< listOu.results.length ; i++){
    const product =  await axios.get(`https://api.mercadolibre.com/items?ids=${listOu.results[i].id}`, {method: "GET"}) as unknown
    const one = product as picture;
    const pictures = one.data[0].body.pictures;

    let event = await prisma.product.create({
    data:{
      name: listOu.results[i].title,
      price: (listOu.results[i].price * 100)%1===0 ? listOu.results[i].price * 100: Math.round(listOu.results[i].price * 100)   , 
      description: "Melhor produto do mundo",
      StoreId: shop.id,
      packingSize: i%2===0 ? "10" : "20",
      CategoriId: categori.id      
    }})

    for (let r = 0; r < pictures.length; r++) {
      await prisma.urlImage.create({
        data:{
          ProductId: event.id,
          urlImage: pictures[r].secure_url          
        }
      })  
    }
    
  };
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

