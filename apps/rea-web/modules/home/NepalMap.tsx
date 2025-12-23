"use client";

import React, { useEffect, useState } from "react";
import { useMantineColorScheme, Overlay, Stack, Text, Center } from "@mantine/core";
import "leaflet/dist/leaflet.css";

interface NepalMapProps {
  isInteractive?: boolean;
  onInteractiveChange?: (interactive: boolean) => void;
}

function NepalMapContent({ isInteractive, onInteractiveChange }: NepalMapProps) {
  const mapRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamically import leaflet to avoid server-side rendering issues
    import("leaflet").then((L) => {
      // Double-check that map hasn't been initialized during async import
      if (mapRef.current) return;

      // Initialize map
      const map = L.map(containerRef.current as HTMLElement, {
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
      }).setView([29.5, 84.0], 8);

      // Add OSM tiles with revert filter for dark mode
      const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      });

      tileLayer.addTo(map);

      // Apply filter based on theme
      const applyThemeFilter = () => {
        const tileLayerContainer = tileLayer.getContainer();
        if (tileLayerContainer) {
          const el = tileLayerContainer as HTMLElement;
          if (isDark) {
            el.style.filter = "invert(1) hue-rotate(180deg) brightness(0.95)";
          } else {
            el.style.filter = "none";
          }
        }
      };

      applyThemeFilter();

      // Add GeoJSON for Nepal borders
      fetch(
        "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson"
      )
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data, {
            filter: (feature: any) => feature.properties.ADMIN === "Nepal",
            style: {
              color: "#c53030",
              weight: 3,
              opacity: 1,
              fillColor: "#c53030",
              fillOpacity: 0.2,
            },
          }).addTo(map);
        })
        .catch((error) => console.error("Error loading GeoJSON:", error));

      // Handle double-click to enable interaction
      const enableInteraction = () => {
        if (!isInteractive) {
          map.dragging.enable();
          map.touchZoom.enable();
          map.doubleClickZoom.enable();
          map.scrollWheelZoom.enable();
          onInteractiveChange?.(true);
        }
      };

      map.on("dblclick", enableInteraction);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDark]);

  // Update interactive state
  useEffect(() => {
    if (!mapRef.current) return;

    if (isInteractive) {
      mapRef.current.dragging.enable();
      mapRef.current.touchZoom.enable();
      mapRef.current.doubleClickZoom.enable();
      mapRef.current.scrollWheelZoom.enable();
    } else {
      mapRef.current.dragging.disable();
      mapRef.current.touchZoom.disable();
      mapRef.current.doubleClickZoom.disable();
      mapRef.current.scrollWheelZoom.disable();
    }
  }, [isInteractive]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {!isInteractive && (
        <Overlay
          opacity={0.3}
          zIndex={5}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            pointerEvents: "none",
          }}
        >
          <Stack align="center" gap="sm">
            <Text size="lg" fw={600} c="white" ta="center">
              Double-click to interact
            </Text>
            <Text size="sm" c="white" opacity={0.8} ta="center">
              Drag • Zoom • Scroll
            </Text>
          </Stack>
        </Overlay>
      )}
    </div>
  );
}

export default function NepalMap({ isInteractive, onInteractiveChange }: NepalMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "#f5f5f5",
        }}
      />
    );
  }

  return (
    <NepalMapContent
      isInteractive={isInteractive}
      onInteractiveChange={onInteractiveChange}
    />
  );
}
