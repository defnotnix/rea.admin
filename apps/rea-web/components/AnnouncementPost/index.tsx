"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Popover,
  ActionIcon,
  Tooltip,
  CopyButton,
} from "@mantine/core";
import {
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  EnvelopeIcon,
  LinkIcon,
} from "@phosphor-icons/react";

interface AnnouncementPostProps {
  id: string;
  author: string;
  category: string;
  text: string;
  timestamp: string;
  image?: string;
  likes: number;
  dislikes: number;
}

export function AnnouncementPost({
  id,
  author,
  category,
  text,
  timestamp,
  image,
  likes: initialLikes,
  dislikes: initialDislikes,
}: AnnouncementPostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [shareOpened, setShareOpened] = useState(false);

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  const handleLike = () => {
    if (userLiked) {
      setLikes(likes - 1);
      setUserLiked(false);
    } else {
      setLikes(likes + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikes(dislikes - 1);
        setUserDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setDislikes(dislikes - 1);
      setUserDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikes(likes - 1);
        setUserLiked(false);
      }
    }
  };

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}?announcement=${id}`
    : "";

  const shareText = `Check out this announcement: "${text.substring(0, 100)}..."`;

  const handleShareEmail = () => {
    const subject = `Announcement: ${category}`;
    const body = `${text}\n\n${shareUrl}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  const handleShareWhatsApp = () => {
    const whatsappText = `${shareText}\n\n${shareUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleShareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  return (
    <>
      <div>
        <Stack gap="md">
          <Group justify="space-between" gap={0}>
            <Group>
              <Avatar size="sm" />
              <Text size="xs" opacity={0.5}>
                {author}
              </Text>
            </Group>

            <Group>
              <Text size="xs">{category}</Text>
              <Text size="xs" opacity={0.5}>
                {timestamp}
              </Text>
            </Group>
          </Group>

          <Text size="md">{text}</Text>

          {image && <Image src={image} />}

          <Group justify="space-between">
            <Group gap={0}>
              <Tooltip label={userLiked ? "Unlike" : "Like"}>
                <Button
                  variant="subtle"
                  color={userLiked ? "blue" : "white"}
                  leftSection={<ThumbsUpIcon />}
                  onClick={handleLike}
                  style={{
                    fontWeight: userLiked ? 600 : 400,
                  }}
                >
                  {formatCount(likes)}
                </Button>
              </Tooltip>
              <Tooltip label={userDisliked ? "Remove dislike" : "Dislike"}>
                <Button
                  variant="subtle"
                  color={userDisliked ? "red" : "white"}
                  leftSection={<ThumbsDownIcon />}
                  onClick={handleDislike}
                  style={{
                    fontWeight: userDisliked ? 600 : 400,
                  }}
                >
                  {formatCount(dislikes)}
                </Button>
              </Tooltip>
            </Group>

            <Popover
              opened={shareOpened}
              onClose={() => setShareOpened(false)}
              position="top"
              withArrow
            >
              <Popover.Target>
                <Button
                  variant="subtle"
                  color="white"
                  leftSection={<ShareIcon />}
                  onClick={() => setShareOpened(!shareOpened)}
                >
                  Share
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack gap="xs">
                  <Text size="sm" fw={600} mb="xs">
                    Share to:
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    <Tooltip label="Email">
                      <ActionIcon
                        variant="light"
                        color="gray"
                        onClick={handleShareEmail}
                        size="lg"
                      >
                        <EnvelopeIcon size={20} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="WhatsApp">
                      <ActionIcon
                        variant="light"
                        color="green"
                        onClick={handleShareWhatsApp}
                        size="lg"
                      >
                        <span style={{ fontSize: "20px" }}>💬</span>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Facebook">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={handleShareFacebook}
                        size="lg"
                      >
                        <span style={{ fontSize: "20px" }}>f</span>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Twitter">
                      <ActionIcon
                        variant="light"
                        color="cyan"
                        onClick={handleShareTwitter}
                        size="lg"
                      >
                        <span style={{ fontSize: "20px" }}>𝕏</span>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Telegram">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={handleShareTelegram}
                        size="lg"
                      >
                        <span style={{ fontSize: "20px" }}>✈️</span>
                      </ActionIcon>
                    </Tooltip>
                    <CopyButton value={shareUrl}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? "Copied!" : "Copy link"}>
                          <ActionIcon
                            variant="light"
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                            size="lg"
                          >
                            {copied ? (
                              <span style={{ fontSize: "20px" }}>✓</span>
                            ) : (
                              <LinkIcon size={20} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Stack>

        <Divider my="md" />
      </div>
    </>
  );
}
