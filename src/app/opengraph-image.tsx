/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "ES Contabilidade, Elenice Sousa: contabilidade especializada em profissionais da saúde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "src/app/fonts");
const serif = readFile(join(fontsDir, "newsreader-regular.ttf"));
const sans = readFile(join(fontsDir, "manrope-medium.ttf"));
const portrait = readFile(join(process.cwd(), "public/images/elenice/elenice-sentada.jpg"));
const monogram = readFile(join(process.cwd(), "public/brand/es-monogram.png"));

export default async function OpenGraphImage() {
  const [serifData, sansData, portraitData, monogramData] = await Promise.all([serif, sans, portrait, monogram]);
  const portraitSrc = `data:image/jpeg;base64,${portraitData.toString("base64")}`;
  const monogramSrc = `data:image/png;base64,${monogramData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f2ebd8",
          color: "#2b1912",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 740,
            padding: "64px 56px 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={monogramSrc} width={72} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Newsreader", fontSize: 30, lineHeight: 1 }}>Elenice Sousa</span>
              <span style={{ fontSize: 14, letterSpacing: 4, color: "#a07a2c", marginTop: 8 }}>
                ES CONTABILIDADE
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 16, letterSpacing: 4, color: "#a07a2c", marginBottom: 22 }}>
              CONTABILIDADE ESPECIALIZADA EM SAÚDE
            </span>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Newsreader", fontSize: 58, lineHeight: 1.04, letterSpacing: -1.2 }}>
              <span>Contabilidade para quem</span>
              <span>fez da saúde a sua profissão.</span>
            </div>
            <span style={{ fontSize: 22, lineHeight: 1.4, color: "#6b5a51", marginTop: 26, maxWidth: 560 }}>
              Médicos, dentistas, clínicas e demais profissionais da saúde. Mais de 15 anos de experiência.
            </span>
          </div>
          <span style={{ fontSize: 18, color: "#6b5a51" }}>{site.phoneDisplay} · WhatsApp</span>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 0, top: 0, width: 460, height: 630 }}>
          <img
            src={portraitSrc}
            width={460}
            height={630}
            alt=""
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #f2ebd8 0%, rgba(242,235,216,0) 22%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 22,
              right: 22,
              bottom: 22,
              border: "1px solid rgba(224,184,96,0.9)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serifData, weight: 400, style: "normal" },
        { name: "Manrope", data: sansData, weight: 500, style: "normal" },
      ],
    },
  );
}
