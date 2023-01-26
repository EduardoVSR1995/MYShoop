import { prisma } from "@/config";
import { User } from "@prisma/client";

async function findFirstUserMail(email: string) {
  return prisma.user.findFirst({
    where: {
        email
    }
  });
}

type CreatUserHash = {
  data: Omit<User, "id">,
  hashedPassword: string
}

async function creatUser( CreatUserHash: CreatUserHash ) {
  const user = await prisma.user.create({
    data: CreatUserHash.data
  });

  return creatSessionUser(user.id, CreatUserHash.hashedPassword)
};

async function creatSessionUser(id: number,token: string) {
  return prisma.session.create({
    data:{
      userId:id,
      token
    }
    }
  );
}

const userRepository = {
  creatSessionUser,
  findFirstUserMail,
  creatUser
};

export default userRepository;
