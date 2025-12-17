"use client";

import { Button, Center, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function () {
  const Router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          Router.push("/sustained");
        }}
      >
        Sustained Module
      </button>
    </>
  );
}
