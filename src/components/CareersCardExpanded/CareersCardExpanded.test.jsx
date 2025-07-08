import {
    render,
    screen,
    fireEvent,
} from "@testing-library/react";
import { CareersCardExpanded } from "./CareersCardExpanded";

// describe block is used to group related tests
describe("CareersCardExpanded", () => {
    describe("Elementary School", () => {
        // elementary block
        const setup = () => {
            render(
                // renders components for each grade level
                <CareersCardExpanded
                    educationLevel="elementary-school"
                    category="category"
                    careerName="careerName"
                    description="description"
                    salary="salary"
                    skills="skills"
                    careerImages={[
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                    ]}
                    colleges={["ucsc", "stanford", "mit"]}
                    majors="majors"
                />
            );
        };

        // Tests the specific elements per grade level that are expected
        test("renders category", () => {
            setup();
            expect(screen.getByText("category")).toBeInTheDocument();
            expect(screen.getByText(/category/i)).toBeInTheDocument();
        });

        test("renders career name", () => {
            setup();
            expect(screen.getByText("careerName")).toBeInTheDocument();
            expect(screen.getByText(/careerName/i)).toBeInTheDocument();
        });

        test("renders description", () => {
            setup();
            expect(screen.getByText("Description:")).toBeInTheDocument();
            expect(screen.getByText("description")).toBeInTheDocument();
        });

        test("renders salary", () => {
            setup();
            expect(screen.getByText("Salary:")).toBeInTheDocument();
            expect(screen.getByText("salary")).toBeInTheDocument();
        });

        // elements with not tag aren't expected to be rendered at this grade level
        test("does not render skills", () => {
            setup();
            expect(screen.queryByText("Skills:")).not.toBeInTheDocument();
            expect(screen.queryByText("skill1")).not.toBeInTheDocument();
            expect(screen.queryByText("skill2")).not.toBeInTheDocument();
        });

        test("does not render colleges", () => {
            setup();
            expect(screen.queryByText("Colleges:")).not.toBeInTheDocument();
            expect(screen.queryByText("colleges")).not.toBeInTheDocument();
        });

        test("does not render majors", () => {
            setup();
            expect(screen.queryByText("Majors:")).not.toBeInTheDocument();
            expect(screen.queryByText("majors")).not.toBeInTheDocument();
        });

        // Header Color Test
        test("elementary school header color", () => {
            setup();
            expect(screen.getByTestId("careers-header")).toHaveStyle(
                "background-color:#4C78E7"
            );
        });

        // tests rendered images expected at elementary level
        test("rendering images at elementary-school level", () => {
            setup();
            const images = screen.getAllByTestId("career-image");
            expect(images.length).toBe(6);
        });
    });

    describe("Middle School", () => {
        // middle school block
        const setup = () => {
            render(
                <CareersCardExpanded
                    educationLevel="middle-school"
                    category="category"
                    careerName="careerName"
                    description="description"
                    salary="salary"
                    skills="skills"
                    careerImages={[
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                    ]}
                    colleges="colleges"
                    majors="majors"
                />
            );
        };

        test("renders description", () => {
            setup();
            expect(screen.getByText("Description:")).toBeInTheDocument();
        });

        test("renders salary", () => {
            setup();
            expect(screen.getByText("Salary:")).toBeInTheDocument();
        });

        test("renders skills", () => {
            setup();
            expect(screen.getByText("Skills:")).toBeInTheDocument();
            expect(screen.getByText("skills")).toBeInTheDocument();
        });

        // elements with not tag aren't expected to be rendered at this grade level
        test("does not render colleges", () => {
            setup();
            expect(screen.queryByText("Colleges:")).not.toBeInTheDocument();
        });

        test("does not render majors", () => {
            setup();
            expect(screen.queryByText("Majors:")).not.toBeInTheDocument();
        });

        // Header Color Test
        test("middle school header color", () => {
            setup();
            expect(screen.getByTestId("careers-header")).toHaveStyle(
                "background-color: #47B748"
            );
        });

        // tests rendered images expected at middle school level
        test("rendering images at middle-school level", () => {
            setup();
            const images = screen.getAllByTestId("career-image");
            expect(images.length).toBe(6);
        });
    });

    describe("High School", () => {
        // high school block
        const setup = () => {
            render(
                <CareersCardExpanded
                    educationLevel="high-school"
                    category="category"
                    careerName="careerName"
                    description="description"
                    salary="salary"
                    skills="skills"
                    careerImages={[
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                        "https://placehold.co/200x200",
                    ]}
                    colleges="colleges"
                    majors="majors"
                />
            );
        };

        test("renders description", () => {
            setup();
            expect(screen.getByText("Description:")).toBeInTheDocument();
        });

        test("renders salary", () => {
            setup();
            expect(screen.getByText("Salary:")).toBeInTheDocument();
        });

        test("renders colleges", () => {
            setup();
            expect(screen.getByText("Colleges:")).toBeInTheDocument();
        });

        test("renders skills", () => {
            setup();
            expect(screen.getByText("Skills:")).toBeInTheDocument();
            expect(screen.getByText("skills")).toBeInTheDocument();
        });

        test("renders majors", () => {
            setup();
            expect(screen.getByText("Majors:")).toBeInTheDocument();
            expect(screen.getByText("majors")).toBeInTheDocument();
        });

        test("does not render career name", () => {
            setup();
            expect(screen.queryByText(/careerName/i)).not.toBeInTheDocument();
        });

        // Test for scroll container, largest case, works for all levels
        test("scrollbar time", () => {
            setup();
            fireEvent.scroll(screen.getByTestId("careers-card-expanded-container"), {
                target: { scrollY: 500 },
            });
        });

        // Header Color Test
        test("high school header color", () => {
            setup();
            expect(screen.getByTestId("careers-header")).toHaveStyle(
                "background-color: #FF7022"
            );
        });

        // tests rendered images expected at high school level
        test("rendering images at high-school level", () => {
            setup();
            const images = screen.getAllByTestId("career-image");
            expect(images.length).toBe(6);
        });
    });
});
