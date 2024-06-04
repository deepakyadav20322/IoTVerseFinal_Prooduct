"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Local = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }
  return (
    <>
      <div>Dashboard page</div>
      {session ? (
        <>
          {status === "authenticated"
            ? `Signed in as ${session?.user?.email} with ${session?.user?.name}`
            : " Not sign In"}
        </>
      ) : (
        "Loading.........."
      )}
    </>
  );
};

export default Local;
