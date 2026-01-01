"use client";

import { Text, Group, ActionIcon } from "@mantine/core";
import {
  CaretLeft,
  CaretLeftIcon,
  CaretRight,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export interface Announcement {
  id: string;
  text: string;
}

interface AnnouncementShowcaseProps {
  announcements?: Announcement[];
  autoRotateInterval?: number;
}

export function AnnouncementShowcase({
  announcements = [],
  autoRotateInterval = 5000,
}: AnnouncementShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate announcements
  useEffect(() => {
    if (announcements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [announcements.length, autoRotateInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  if (announcements.length === 0) {
    return (
      <Text size="xs" c="dimmed" style={{ flex: 1, textAlign: "left" }}>
        Nepal is coming together and rising anew.
      </Text>
    );
  }

  const currentAnnouncement = announcements[currentIndex];

  return (
    <Group gap="sm" justify="center" flex={1} wrap="nowrap">
      {announcements.length > 1 && (
        <ActionIcon
          size="xs"
          variant="subtle"
          color="gray"
          onClick={handlePrevious}
          title="Previous announcement"
        >
          <CaretLeftIcon size={14} />
        </ActionIcon>
      )}

      <Text
        size="xs"
        fw={500}
        style={{
          flex: 1,
          textAlign: "left",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={currentAnnouncement.text}
      >
        {currentAnnouncement.text}
      </Text>

      {announcements.length > 1 && (
        <>
          <ActionIcon
            size="xs"
            variant="subtle"
            color="gray"
            onClick={handleNext}
            title="Next announcement"
          >
            <CaretRightIcon size={14} />
          </ActionIcon>

          <Text size="xs" c="dimmed" style={{ minWidth: "fit-content" }}>
            {currentIndex + 1} / {announcements.length}
          </Text>
        </>
      )}
    </Group>
  );
}
