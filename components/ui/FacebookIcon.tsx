import { SVGProps } from "react";

export default function FacebookIcon({ className, style, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
      {...props}
    >
      <path d="M14 8.16V6.14c0-.64.13-.98.98-.98H16V3h-2.2C11.3 3 10 4.48 10 6.82v1.34H8v2.86h2V21h3.2v-9.98h2.14l.46-2.86H13.2z" />
    </svg>
  );
}
