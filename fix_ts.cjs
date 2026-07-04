const fs = require("fs");

let file;

// Fix exactOptionalPropertyTypes for Radix items
file = fs.readFileSync("src/components/ui/context-menu.tsx", "utf8");
file = file.replace(/checked=\{checked\}/g, "checked={checked ?? undefined}");
fs.writeFileSync("src/components/ui/context-menu.tsx", file);

file = fs.readFileSync("src/components/ui/dropdown-menu.tsx", "utf8");
file = file.replace(/checked=\{checked\}/g, "checked={checked ?? undefined}");
fs.writeFileSync("src/components/ui/dropdown-menu.tsx", file);

file = fs.readFileSync("src/components/ui/menubar.tsx", "utf8");
file = file.replace(/checked=\{checked\}/g, "checked={checked ?? undefined}");
fs.writeFileSync("src/components/ui/menubar.tsx", file);

// Fix unused imports in showcase.ts
file = fs.readFileSync("src/data/showcase.ts", "utf8");
file = file.replace(/import evalImg from [^;]+;\r?\n/g, "");
file = file.replace(/import ft from [^;]+;\r?\n/g, "");
fs.writeFileSync("src/data/showcase.ts", file);

// Fix unused imports in Experience.tsx
file = fs.readFileSync("src/features/portfolio/Experience.tsx", "utf8");
file = file.replace(/import type \{ LucideIcon \} from "lucide-react";\r?\n/g, "");
file = file.replace(/import \{ Award \} from "lucide-react";\r?\n/g, "");
fs.writeFileSync("src/features/portfolio/Experience.tsx", file);

// Fix unused vars in use-low-power.ts
file = fs.readFileSync("src/hooks/use-low-power.ts", "utf8");
file = file.replace(/const raf = requestAnimationFrame/, "requestAnimationFrame");
fs.writeFileSync("src/hooks/use-low-power.ts", file);

// Fix unused vars in __root.tsx
file = fs.readFileSync("src/routes/__root.tsx", "utf8");
file = file.replace(/useEffect, /g, "");
fs.writeFileSync("src/routes/__root.tsx", file);

// Fix ParallaxCanvas.tsx
file = fs.readFileSync("src/components/shared/ParallaxCanvas.tsx", "utf8");
file = file.replace(/const Satellite = /g, "// @ts-ignore\nconst Satellite = ");
file = file.replace(/const Ring = /g, "// @ts-ignore\nconst Ring = ");
file = file.replace(
  /material\.uniforms\.uTime\.value =/g,
  "if (material.uniforms.uTime) material.uniforms.uTime.value =",
);
fs.writeFileSync("src/components/shared/ParallaxCanvas.tsx", file);

// Fix CubeNav.tsx
file = fs.readFileSync("src/features/core/CubeNav.tsx", "utf8");
file = file.replace(/containerRef\.current\.style/g, "containerRef.current?.style");
file = file.replace(/cameraRef\.current\.rotation/g, "cameraRef.current?.rotation");
fs.writeFileSync("src/features/core/CubeNav.tsx", file);

// input-otp.tsx
file = fs.readFileSync("src/components/ui/input-otp.tsx", "utf8");
file = file.replace(
  /char, hasFakeCaret, isActive/g,
  'char = "", hasFakeCaret = false, isActive = false',
);
fs.writeFileSync("src/components/ui/input-otp.tsx", file);

console.log("TS fixes applied");
