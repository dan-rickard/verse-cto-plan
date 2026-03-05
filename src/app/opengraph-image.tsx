import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "90-Day CTO Plan – Verse Wealth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1e3d",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Subtle dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            display: "flex",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(100,140,255,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#6ea8fe",
            }}
          />
          <span
            style={{
              color: "#a8bcd8",
              fontSize: 18,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "Georgia, serif",
            }}
          >
            Verse Wealth
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(110, 168, 254, 0.15)",
                border: "1px solid rgba(110, 168, 254, 0.3)",
                borderRadius: 6,
                padding: "6px 14px",
                color: "#6ea8fe",
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "Georgia, serif",
              }}
            >
              Confidential
            </div>
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              fontFamily: "Georgia, serif",
            }}
          >
            90-Day CTO Plan
          </div>

          <div
            style={{
              color: "#7a93b8",
              fontSize: 22,
              lineHeight: 1.5,
              maxWidth: 680,
              fontFamily: "Georgia, serif",
            }}
          >
            Workflow visibility · Data integrity · Security posture
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 32,
            }}
          >
            {["Days 1–30", "Days 31–60", "Days 61–90"].map((label, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor:
                      i === 0 ? "#6ea8fe" : i === 1 ? "#4a7fd4" : "#2d5aab",
                  }}
                />
                <span
                  style={{
                    color: "#5a7a9e",
                    fontSize: 13,
                    letterSpacing: "0.05em",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              color: "#3d5a7a",
              fontSize: 14,
              fontFamily: "Georgia, serif",
            }}
          >
            versewealth.com.au
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
