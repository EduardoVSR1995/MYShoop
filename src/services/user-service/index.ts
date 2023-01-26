import { notFoundError, notmatch } from "@/error";
import userRepository from "@/repositories/user-repositoy";
import sessionRepository from "@/repositories/store-repository";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";


async function findFirstUserMail(mail:string) {
  const user = await userRepository.findFirstUserMail(mail);
  
  if(user) throw notFoundError();

  return user;
}

async function creatUser(user: CreateUserParams ) {
  
  const hashedPassword = await bcrypt.hash(user.password, 12);

  await userRepository.creatUser({ data: user, hashedPassword:hashedPassword });

  return {token: hashedPassword};
}

export type CreateUserParams = Omit<User, "id" >;

async function signinUser(emailPass: Omit<User, "id" | "name" > ) {
  const user =  await findFirstUserMail(emailPass.email);

  const isPasswordValid = await bcrypt.compare(user.password, emailPass.password);

  if(isPasswordValid) throw notmatch();

  const hashedPassword = await bcrypt.hash(user.password, 12);

  await userRepository.creatSessionUser(user.id, hashedPassword);

  const useMaster = await sessionRepository.findFirstStoreUserId(user.id)

  if(useMaster){
    return {token: hashedPassword, valid: true}
  }

  return {token: hashedPassword};
}

const userService = {
    findFirstUserMail,
    creatUser,
    signinUser
};

export default userService;
