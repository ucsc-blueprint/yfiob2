import CareersCard from "./CareersCard";
import { render, fireEvent, screen } from "@testing-library/react";

test("Elementary-school page rendered", async () => {
    render(
        <CareersCard
            title={"Software engineer"}
            description={"Codes a lot"}
            grade={"elementary-school"}
            image={"https://placehold.co/600x400/EEE/31343C"}
            href="/careers/software-engineer"
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument();
    expect(screen.getByText("Codes a lot")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(image).toHaveStyle({ filter: "hue-rotate(180deg)" });
});

test("Middle-school page rendered", async () => {
    render(
        <CareersCard
            title={"Software engineer"}
            description={"Codes a lot"}
            grade={"middle-school"}
            image={"https://placehold.co/600x400/EEE/31343C"}
            href="/careers/software-engineer"
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument();
    expect(screen.getByText("Codes a lot")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(image).toHaveStyle({ filter: "hue-rotate(60deg)" });
});

test("High-school page rendered", async () => {
    render(
        <CareersCard
            title={"Software engineer"}
            description={"Codes a lot"}
            grade={"high-school"}
            image={"https://placehold.co/600x400/EEE/31343C"}
            href="/careers/software-engineer"
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument();
    expect(screen.getByText("Codes a lot")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("placehold.co"));
    expect(image).toHaveStyle({ filter: "hue-rotate(0deg)" });
});
test("Default values are used when optional props are not provided", async () => {
    render(
        <CareersCard
            title={"Software engineer"}
            grade={"high-school"}
            href="/careers/software-engineer"
        />
    );
    expect(screen.getByText("Software engineer")).toBeInTheDocument();
    expect(
        screen.getByText(
            "Consectetur esse non ipsum irure elit elit officia nisi cillum non cupidatat."
        )
    ).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("jigna.svg"));
});
