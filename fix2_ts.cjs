const fs = require("fs");

let file;

// Fix exactOptionalPropertyTypes for Radix items
file = fs.readFileSync("src/components/ui/context-menu.tsx", "utf8");
file = file.replace(/checked=\{checked \?\? undefined\}/g, "checked={checked ?? false}");
fs.writeFileSync("src/components/ui/context-menu.tsx", file);

file = fs.readFileSync("src/components/ui/dropdown-menu.tsx", "utf8");
file = file.replace(/checked=\{checked \?\? undefined\}/g, "checked={checked ?? false}");
fs.writeFileSync("src/components/ui/dropdown-menu.tsx", file);

file = fs.readFileSync("src/components/ui/menubar.tsx", "utf8");
file = file.replace(/checked=\{checked \?\? undefined\}/g, "checked={checked ?? false}");
fs.writeFileSync("src/components/ui/menubar.tsx", file);

// Fix ParallaxCanvas.tsx
file = fs.readFileSync("src/components/shared/ParallaxCanvas.tsx", "utf8");
file = file.replace(/\/\/ @ts-ignore\nconst Satellite = /g, "");
file = file.replace(/\/\/ @ts-ignore\nconst Ring = /g, "");
fs.writeFileSync("src/components/shared/ParallaxCanvas.tsx", file);

// Fix CubeNav.tsx
file = fs.readFileSync("src/features/core/CubeNav.tsx", "utf8");
file = file.replace(
  /containerRef\.current\?\.style/g,
  "if(containerRef.current) containerRef.current.style",
);
file = file.replace(
  /cameraRef\.current\?\.rotation/g,
  "if(cameraRef.current) cameraRef.current.rotation",
);
fs.writeFileSync("src/features/core/CubeNav.tsx", file);

// input-otp.tsx
file = fs.readFileSync("src/components/ui/input-otp.tsx", "utf8");
file = file.replace(
  /const \{ char = "", hasFakeCaret = false, isActive = false \} = slot;/,
  "const { char, hasFakeCaret, isActive } = slot || {};",
);
fs.writeFileSync("src/components/ui/input-otp.tsx", file);
