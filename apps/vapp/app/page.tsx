"use client";

import { Button, Center, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function () {
  const Router = useRouter();

  return (
    <>
      <Center h="100vh">
        <Button variant="subtle" c="dark.9">vee-framework</Button>
      </Center>
    </>
  );
}
