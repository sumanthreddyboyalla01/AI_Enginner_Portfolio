import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/features/core/Hero";

describe("Hero Component", () => {
  it("renders main heading", () => {
    render(<Hero />);

    // Using test ID or text match. Given it's a styled h1 with multiple parts, we can check for text.
    expect(screen.getByText(/SUMANTH/i)).toBeInTheDocument();
    expect(screen.getByText(/Applied AI Engineer/i)).toBeInTheDocument();
  });

  it("renders call to action buttons", () => {
    render(<Hero />);

    expect(screen.getByText(/Resume/i)).toBeInTheDocument();
  });
});
