"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Place certificate image files here:
 *   public/certificates/certificate-1.jpg
 *   public/certificates/certificate-2.jpg
 *   public/certificates/certificate-3.jpg
 *   public/certificates/certificate-4.jpg
 *   public/certificates/certificate-5.jpg
 *
 * Supported formats: .jpg, .jpeg, .png, .webp
 */
export const CERTIFICATES = [
  {
    src: "/certificates/certificate-1.jpg",
    title: "D.H.M.S. Qualification",
    description: "Diploma in Homeopathic Medicine & Surgery",
  },
  {
    src: "/certificates/certificate-2.jpg",
    title: "Canadian Registration",
    description: "Registered Homeopathic Practitioner in Canada",
  },
  {
    src: "/certificates/certificate-3.jpg",
    title: "OHMA Membership",
    description: "Ontario Homeopathic Medical Association",
  },
  {
    src: "/certificates/certificate-4.jpg",
    title: "Professional Credentials",
    description: "Verified professional certification",
  },
  {
    src: "/certificates/certificate-5.jpg",
    title: "Additional Certification",
    description: "Professional homeopathic qualification & training",
  },
];
interface CertificatesSectionProps {
  variant?: "light" | "dark";
}

function CertificateCard({
  cert,
  isDark,
}: {
  cert: (typeof CERTIFICATES)[number];
  isDark: boolean;
}) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl overflow-hidden h-full flex flex-col"
      style={{
        background: isDark ? "rgba(255,252,248,0.08)" : "#FFFCF8",
        border: "1px solid rgba(247,168,196,0.25)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.2)"
          : "0 8px 32px rgba(122,31,61,0.08)",
      }}
    >
      <div
        className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(145deg, rgba(75,16,37,0.6), rgba(122,31,61,0.4))"
            : "linear-gradient(145deg, #FFE8F0, #FFF8EF)",
        }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cert.src}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-contain p-3"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: isDark ? "rgba(246,200,95,0.15)" : "rgba(122,31,61,0.08)",
                border: `1px solid ${isDark ? "rgba(246,200,95,0.35)" : "rgba(122,31,61,0.15)"}`,
              }}
            >
              <Award className="w-7 h-7" style={{ color: isDark ? "#F6C85F" : "#7A1F3D" }} />
            </div>
            <p
              className="text-xs text-center"
              style={{
                color: isDark ? "rgba(255,240,245,0.55)" : "#9B6878",
                fontFamily: "Nunito Sans, sans-serif",
              }}
            >
              Certificate image
            </p>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: isDark ? "#F6C85F" : "#7A1F3D" }} />
          <h3
            className="text-lg font-medium leading-snug"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color: isDark ? "#FFFCF8" : "#7A1F3D",
            }}
          >
            {cert.title}
          </h3>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: isDark ? "rgba(255,240,245,0.75)" : "#8A6070",
            fontFamily: "Nunito Sans, sans-serif",
          }}
        >
          {cert.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CertificatesSection({ variant = "light" }: CertificatesSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #4B1025 0%, #6B1835 40%, #7A1F3D 100%)"
          : "linear-gradient(180deg, #FFF8EF 0%, #FFE8F0 50%, #FFFCF8 100%)",
      }}
    >
      {isDark && (
        <>
          <div className="absolute top-10 right-10 text-5xl opacity-15 pointer-events-none select-none" style={{ color: "#F7A8C4" }}>✿</div>
          <div className="absolute bottom-16 left-8 text-4xl opacity-10 pointer-events-none select-none" style={{ color: "#F6C85F" }}>✦</div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14">
          <SectionHeading
            label="Credentials"
            title="Certificates & Qualifications"
            subtitle="Dr. Afreen Saeed D.H.M.S — Registered in Canada with membership in the Ontario Homeopathic Medical Association."
            light={isDark}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.08}>
              <CertificateCard cert={cert} isDark={isDark} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
