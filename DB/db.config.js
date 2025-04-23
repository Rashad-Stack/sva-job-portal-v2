<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query"],
  });
};

const prisma = prismaClientSingleton();

export default prisma;
=======
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query"],
  });
};

const prisma = prismaClientSingleton();

export default prisma;
>>>>>>> origin/main
