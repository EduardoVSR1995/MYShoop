import { notFoundError, notmatch } from "@/error";
import userRepository from "@/repositories/user-repositoy";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import storeRepositoy from "@/repositories/store-repository";

async function creatUser(user: CreateUserParams, url: string ) {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  const shoop = await storeRepositoy.findFirsName(url);

  const userComplet = await userRepository.findFirstUserMail(user.email, shoop.id);

  user["password"] = hashedPassword;

  if( userComplet ) {
    const verify = userComplet.StoreUser.find((value) => {
      return userRepository.findFirstTableUserMail(shoop.id, value.UserId);
    });

    if(verify) throw notFoundError(); 
    
    await userRepository.creatStorUser({ StoreId: shoop.id, UserId: userComplet.id } );

    await userRepository.creatSessionUser(userComplet.id, user.password);
    
    delete user.email;
    delete user.password;
    delete user.owner;
    delete user.name;
    
    return { ...user, token: hashedPassword }; 
  }

  await userRepository.creatUser( user, shoop.id );
  delete user.email;
  delete user.password;
  delete user.owner;
  delete user.name;
  
  return { ...user, token: hashedPassword };
}

export type CreateUserParams = Omit<User, "id" >;

async function signinUser(emailPass: Omit<User, "id" | "name" | "urlImage">, url: string ) {
  const shoop = await storeRepositoy.findFirsName(url);

  const user = await userRepository.findFirstUserMail(emailPass.email, shoop.id);

  if( user.StoreUser.length === 0 ) throw notmatch();

  const isPasswordValid = await bcrypt.compare(emailPass.password, user.password);

  if(!isPasswordValid) throw notmatch();

  const hashedPassword = await bcrypt.hash(user.password, 12);
  
  await userRepository.creatSessionUser(user.id, hashedPassword);
  
  return { name: user.name, urlImage: user.urlImage, token: hashedPassword };
}

async function autorize(UserId: number, nameStore: string) {
  const user = await userRepository.findFirstUserToken(UserId, nameStore);

  if( user.StoreUser.length === 0 || !user.StoreUser[0].User.owner) return false;
  
  return true; 
}

const userService = {
  autorize,
  creatUser,
  signinUser
};

export default userService;
