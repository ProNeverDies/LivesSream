import React from "react";
import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
// import { Actions } from "./_components/actions";


interface UserPageProps {
  params: { username: string };
}

export async function generateMetadata({
  params: { username },
}: UserPageProps) {
  return {
    title: username,
  };
}

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  const user = await getUserByUsername(username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    // <div className="flex flex-col gap-y-4">
    //   <p>username:{user.username}</p>
    //   <p>user ID:{user.id}</p>
    //   <p>is following:{`${isFollowing}`}</p>
    //   <p>is blocked by this user:{`${isBlocked}`}</p>
    //   <Actions userId={user.id} isFollowing={isFollowing}/>
    // </div>
    <StreamPlayer user={user} isFollowing={isFollowing} stream={user.stream} />
  );
}
