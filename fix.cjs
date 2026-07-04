const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("./src");
files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let original = content;

  content = content.replace(
    /@\/components\/portfolio\/(About|AboutOverlay|Contact|Experience|Projects|Showcase|Skills)/g,
    "@/features/portfolio/$1",
  );
  content = content.replace(/@\/components\/portfolio\/(Hero|Nav|CubeNav)/g, "@/features/core/$1");
  content = content.replace(
    /@\/components\/portfolio\/(LazyMount|MotionToggle|ParallaxCanvas|ParallaxScene|PerfGuard|Preloader|TechStack|Tilt3D)/g,
    "@/components/shared/$1",
  );

  content = content.replace(/from ["']\.\/Tilt3D["']/g, 'from "@/components/shared/Tilt3D"');
  content = content.replace(/from ["']\.\/TechStack["']/g, 'from "@/components/shared/TechStack"');

  if (file.replace(/\\/g, "/").endsWith("app/router.tsx")) {
    content = content.replace(/from ["']\.\/routeTree\.gen["']/g, 'from "../routeTree.gen"');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log("Updated " + file);
  }
});
