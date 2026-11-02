import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F6F1E7";
const FOREST = "#1F4D3A";
const TERRA = "#C4622D";
const INK = "#1A1A17";
const RULE = "#D9D1C1";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, color: INK, fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px solid ${INK}`, paddingBottom: 18, fontFamily: "sans-serif", fontSize: 18, letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ display: "flex" }}>Annual Report · Results 2025</div>
            <div style={{ display: "flex", color: "#6A655A" }}>Registered not-for-profit</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <div style={{ display: "flex", fontSize: 26, color: TERRA, fontStyle: "italic", marginBottom: 16 }}>No. 01 — {siteConfig.brand.meaning}</div>
            <div style={{ display: "flex", fontSize: 108, lineHeight: 1, letterSpacing: -3, fontStyle: "italic", color: FOREST }}>Ìrètí Foundation</div>
            <div style={{ display: "flex", fontSize: 38, lineHeight: 1.25, marginTop: 26, maxWidth: 900 }}>{siteConfig.brand.tagline}</div>
          </div>
          <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${RULE}`, paddingTop: 20, fontFamily: "sans-serif" }}>
            {[
              ["71,400", "people with safe water"],
              ["68%", "skilled birth attendance"],
              ["4,310", "women in cooperatives"],
              ["82%", "of spending on programmes"],
            ].map(([v, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 20 }}>
                <div style={{ display: "flex", fontSize: 40, fontFamily: "serif", color: FOREST }}>{v}</div>
                <div style={{ display: "flex", fontSize: 17, color: "#6A655A" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 22, background: FOREST, display: "flex" }}>
          <div style={{ width: 22, height: 160, background: TERRA, display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
