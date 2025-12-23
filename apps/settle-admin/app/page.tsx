"use client";

import { Button, Center, Stack, Text } from "@mantine/core";

export default function () {
  return (
    <>
      <Center h="100vh">
        <Stack>
          <Button size="xl" variant="subtle" c="dark.9" style={{}} fw={800}>
            <span style={{ opacity: 0.3 }}>don't</span>
            {"\u00A0"}settle{"\u00A0"}
            <span style={{ opacity: 0.3 }}>for less.</span>
          </Button>
        </Stack>
      </Center>
    </>
  );
}
