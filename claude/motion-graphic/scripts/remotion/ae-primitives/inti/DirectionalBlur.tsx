// DirectionalBlur.tsx — blur searah (AE "Directional Blur") + pemisahan kanal RGB tipis, lewat satu filter SVG.
// CSS `filter: blur()` selalu ke segala arah; gerak cepat butuh jejak searah gerak. Arah sumbu (0/90/180/270°)
// memakai blur satu sumbu; arah miring memakai trik putar:
// bungkus diputar θ, filter blur-X di ruang terputar, isi diputar balik −θ, sehingga isi tetap di tempat.
import React, { useId } from "react";
import { idAman } from "./acak";

export type DirectionalBlurProps = {
  /** arah gerak dalam derajat (0 = ke kanan, 90 = ke bawah) */
  angle: number;
  /** simpangan baku blur searah gerak, px */
  amount: number;
  /** geser kanal merah/biru berlawanan arah searah gerak, px (0 = mati) */
  chroma?: number;
  /** true: mengisi induk (position absolute, inset 0). false: ikut ukuran isi */
  fill?: boolean;
  /**
   * true: isi dianggap buram penuh (adegan, foto). Tepi hasil blur dinormalkan ke warna isi sehingga tidak ada
   * pinggiran tembus pandang/gelap di tepi kotak. Jangan untuk objek ber-alpha (kata, ikon): bagian kosong jadi hitam.
   */
  opaque?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const MIN = 0.05;

export const DirectionalBlur: React.FC<DirectionalBlurProps> = ({ angle, amount, chroma = 0, fill = true, opaque = false, style, children }) => {
  const id = "ae-db-" + idAman(useId());
  const base: React.CSSProperties = fill ? { position: "absolute", inset: 0 } : { position: "relative", display: "inline-block" };
  if (amount < MIN && chroma < MIN) return <div style={{ ...base, ...style }}>{children}</div>;

  const a = ((angle % 360) + 360) % 360;
  const sumbu = Math.abs(Math.sin((a * Math.PI) / 180)) < 0.017 ? "x" : Math.abs(Math.cos((a * Math.PI) / 180)) < 0.017 ? "y" : null;
  const sx = sumbu === "y" ? 0 : amount;
  const sy = sumbu === "y" ? amount : 0;
  // arah chroma searah gerak (di ruang lokal filter): sumbu x → (c,0); sumbu y → (0,c); miring → (c,0) di ruang terputar
  const cx = sumbu === "y" ? 0 : chroma, cy = sumbu === "y" ? chroma : 0;
  // Objek ber-alpha: wilayah filter diperlebar supaya jejak blur tidak terpotong kotak elemen.
  // Isi buram penuh: tepi kotak diberi bantalan salinan bergeser ±pad searah blur, diblur, lalu dipotong kembali ke
  // bentuk isi (SourceAlpha). Hasilnya setara "repeat edge pixels" AE: tanpa pinggiran gelap atau tembus pandang.
  const region = sumbu === "x" ? { x: "-100%", y: "-5%", width: "300%", height: "110%" }
    : sumbu === "y" ? { x: "-5%", y: "-100%", width: "110%", height: "300%" }
    : { x: "-100%", y: "-100%", width: "300%", height: "300%" };
  const pad = Math.ceil(amount * 3 + chroma + 2);
  const px = sumbu === "y" ? 0 : pad, py = sumbu === "y" ? pad : 0;
  const masuk = opaque ? "pad" : "SourceGraphic";
  const akhir = chroma >= MIN ? "c" : "b";

  const filter = (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
      <filter id={id} {...region} colorInterpolationFilters="sRGB">
        {opaque ? (
          <>
            <feOffset in="SourceGraphic" dx={-px} dy={-py} result="l" />
            <feOffset in="SourceGraphic" dx={px} dy={py} result="r" />
            <feMerge result="pad"><feMergeNode in="l" /><feMergeNode in="r" /><feMergeNode in="SourceGraphic" /></feMerge>
          </>
        ) : null}
        <feGaussianBlur in={masuk} stdDeviation={`${sx} ${sy}`} result="b" />
        {chroma >= MIN ? (
          <>
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx={cx} dy={cy} result="r2" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bl" />
            <feOffset in="bl" dx={-cx} dy={-cy} result="b2" />
            <feBlend in="r2" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b2" mode="screen" result="c" />
          </>
        ) : null}
        {opaque ? <feComposite in={akhir} in2="SourceAlpha" operator="in" /> : null}
      </filter>
    </svg>
  );

  if (sumbu) {
    return (
      <div style={{ ...base, ...style }}>
        {filter}
        <div style={{ position: fill ? "absolute" : "relative", inset: fill ? 0 : undefined, filter: `url(#${id})` }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ ...base, ...style }}>
      {filter}
      <div style={{ position: fill ? "absolute" : "relative", inset: fill ? 0 : undefined, transform: `rotate(${a}deg)`, filter: `url(#${id})` }}>
        <div style={{ position: fill ? "absolute" : "relative", inset: fill ? 0 : undefined, transform: `rotate(${-a}deg)` }}>{children}</div>
      </div>
    </div>
  );
};
