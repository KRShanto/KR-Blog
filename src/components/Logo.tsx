import { SITE_NAME } from "@/lib/consts";
import { Kanit } from "next/font/google";

const font = Kanit({
  weight: "700",
});

export default function Logo() {
  return (
    <span className="logo-gradient font-bold" style={font.style}>
      {SITE_NAME}
    </span>
  );
}
