import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== username) {
    throw new Error("Unauthorized");
  }

  return user;
};


//2nd code


// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export const checkDatabaseConnection = async () => {
//   try {
//     await db.$queryRaw`SELECT 1`;
//     console.log("Database connection is successful");
//   } catch (error) {
//     console.error("Database connection failed", error);
//   }
// };

// export const getSelf = async () => {
//   await checkDatabaseConnection(); // Check database connection

//   const self = await currentUser();
//   console.log("Current user:", self);

//   if (!self || !self.username) {
//     throw new Error("Unauthorized");
//   }

//   const user = await db.user.findUnique({
//     where: {
//       externalUserId: self.id,
//     },
//   });
//   console.log("User found:", user);

//   if (!user) {
//     throw new Error("Not found");
//   }

//   return user;
// };

// export const getSelfByUsername = async (username: string) => {
//   await checkDatabaseConnection(); // Check database connection

//   const self = await currentUser();
//   console.log("Current user:", self);

//   if (!self || !self.username) {
//     throw new Error("Unauthorized");
//   }

//   console.log(`Searching for user with username: ${username}`);

//   const user = await db.user.findUnique({
//     where: {
//       username,
//     },
//   });
//   console.log("User found:", user);

//   if (!user) {
//     console.error(`User with username ${username} not found`);
//     throw new Error("User not found");
//   }

//   if (self.username !== username) {
//     throw new Error("Unauthorized");
//   }

//   return user;
// };

