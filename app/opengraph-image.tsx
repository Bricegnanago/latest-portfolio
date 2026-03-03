import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Brice GNANAGO — Ingénieur Logiciel Full-Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#8875e8",
            borderRadius: "2px",
            marginBottom: "40px",
          }}
        />

        {/* Label */}
        <div
          style={{
            color: "#8875e8",
            fontSize: "18px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Portfolio
        </div>

        {/* Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "80px",
            fontWeight: 700,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Brice GNANAGO
        </div>

        {/* Title */}
        <div
          style={{
            color: "#a0a0b0",
            fontSize: "32px",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Ingénieur Logiciel Full-Stack
        </div>

        {/* Domain badge */}
        <div
          style={{
            color: "#8875e8",
            fontSize: "20px",
            padding: "10px 28px",
            border: "1px solid #8875e8",
            borderRadius: "4px",
          }}
        >
          bricegnanago.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
