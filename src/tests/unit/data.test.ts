import { describe, it, expect } from "vitest";
import { projects, certificates, stack } from "@/data/showcase";
import { roles } from "@/data/experience";

describe("Data Integrity", () => {
  it("validates projects array structure", () => {
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);

    projects.forEach((project) => {
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("blurb");
      expect(project).toHaveProperty("tags");
      expect(Array.isArray(project.tags)).toBe(true);
    });
  });

  it("validates experience roles array structure", () => {
    expect(roles).toBeInstanceOf(Array);
    expect(roles.length).toBeGreaterThan(0);

    roles.forEach((role) => {
      expect(role).toHaveProperty("role");
      expect(role).toHaveProperty("company");
      expect(role).toHaveProperty("period");
      expect(role).toHaveProperty("bullets");
      expect(Array.isArray(role.bullets)).toBe(true);
    });
  });

  it("validates certificates array structure", () => {
    expect(certificates).toBeInstanceOf(Array);

    certificates.forEach((cert) => {
      expect(cert).toHaveProperty("title");
      expect(cert).toHaveProperty("issuer");
      expect(cert).toHaveProperty("year");
    });
  });

  it("validates tech stack array structure", () => {
    expect(stack).toBeInstanceOf(Array);
    expect(stack.length).toBeGreaterThan(0);
  });
});
