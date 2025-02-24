import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";

export default async function CreatorPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  
  

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
}
// import React from "react";
// import { currentUser } from "@clerk/nextjs/server";

// import { getUserByUsername } from "@/lib/user-service";
// import { StreamPlayer } from "@/components/stream-player";

// export default async function CreatorPage({
//   params: { username },
// }: {
//   params: { username: string };
// }) {
//   const externalUser = await currentUser();
//   const user = await getUserByUsername(username);

//   console.log("External User:", externalUser);
//   console.log("User:", user);
//   console.log("User Stream:", user?.stream);

//   if (!user) {
//     console.error("User not found");
//     throw new Error("Unauthorized");
//   }

//   if (user.externalUserId !== externalUser?.id) {
//     console.error("User externalUserId does not match externalUser id");
//     throw new Error("Unauthorized");
//   }

//   if (!user.stream) {
//     console.error("User stream not found");
//     throw new Error("Unauthorized");
//   }

//   return (
//     <div className="h-full">
//       <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
//     </div>
//   );
// }