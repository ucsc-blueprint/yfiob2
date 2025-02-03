import React from "react";
import { render, screen } from "@testing-library/react";
import { CareersCardExpanded } from "./CareersCardExpanded";

// describe block is used to group related tests
describe("CareersCardExpanded", () => {
  describe("Elementary School", () => { // elementary block
    beforeEach(() => {
      render(
        <CareersCardExpanded
          educationLevel="elementary-school"
          category="category"
          careerName="careerName"
          description="description"
          salary="salary"
          skills={["skill1", "skill2"]}
          careerImages={["image1", "image2"]}
          colleges="colleges"
          majors="majors"
        />
      );
    });

    test("renders category", () => {
      expect(screen.getByText(/category/i)).toBeInTheDocument();
    });

    test("renders career name", () => {
      expect(screen.getByText(/careerName/i)).toBeInTheDocument();
    });

    test("renders description", () => {
      expect(screen.getByText("Description:")).toBeInTheDocument();
    });

    test("renders salary", () => {
      expect(screen.getByText("Salary:")).toBeInTheDocument();
    });

    test("does not render skills", () => {
      expect(screen.queryByText("Skills:")).not.toBeInTheDocument();
    });

    test("does not render colleges", () => {
      expect(screen.queryByText("Colleges:")).not.toBeInTheDocument();
    });

    test("does not render majors", () => {
      expect(screen.queryByText("Majors:")).not.toBeInTheDocument();
    });
  });

  describe("Middle School", () => { // middle school block
    beforeEach(() => {
      render(
        <CareersCardExpanded
          educationLevel="middle-school"
          category="category"
          careerName="careerName"
          description="description"
          salary="salary"
          skills={["skill1", "skill2"]}
          careerImages={["image1", "image2"]}
          colleges="colleges"
          majors="majors"
        />
      );
    });

    test("renders description", () => {
      expect(screen.getByText("Description:")).toBeInTheDocument();
    });

    test("renders salary", () => {
      expect(screen.getByText("Salary:")).toBeInTheDocument();
    });

    test("renders skills", () => {
      expect(screen.getByText("Skills:")).toBeInTheDocument();
    });

    test("does not render colleges", () => {
      expect(screen.queryByText("Colleges:")).not.toBeInTheDocument();
    });

    test("does not render majors", () => {
      expect(screen.queryByText("Majors:")).not.toBeInTheDocument();
    });
  });

  describe("High School", () => { // high school block
    beforeEach(() => {
      render(
        <CareersCardExpanded
          educationLevel="high-school"
          category="category"
          careerName="careerName"
          description="description"
          salary="salary"
          skills={["skill1", "skill2"]}
          careerImages={["image1", "image2"]}
          colleges="colleges"
          majors="majors"
        />
      );
    });

    test("renders description", () => {
      expect(screen.getByText("Description:")).toBeInTheDocument();
    });

    test("renders salary", () => {
      expect(screen.getByText("Salary:")).toBeInTheDocument();
    });

    test("renders colleges", () => {
      expect(screen.getByText("Colleges:")).toBeInTheDocument();
    });

    test("renders skills", () => {
      expect(screen.getByText("Skills:")).toBeInTheDocument();
    });

    test("renders majors", () => {
      expect(screen.getByText("Majors:")).toBeInTheDocument();
    });

    test("does not render career name", () => {
      expect(screen.queryByText(/careerName/i)).not.toBeInTheDocument();
    });
  });
});
