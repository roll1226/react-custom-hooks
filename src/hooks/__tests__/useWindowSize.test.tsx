import { act, render } from "@testing-library/react";
import React from "react";
import { useWindowSize } from "../useWindowSize";

const TestComponent: React.FC = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
};

describe("useWindowSize", () => {
  it("should render with initial window size", () => {
    // Mock initial window size
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { getByText } = render(<TestComponent />);

    expect(getByText("Width: 1024")).toBeInTheDocument();
    expect(getByText("Height: 768")).toBeInTheDocument();
  });

  it("should update window size on resize", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      // Mock window resize
      window.innerWidth = 640;
      window.innerHeight = 480;
      window.dispatchEvent(new Event("resize"));
    });

    expect(getByText("Width: 640")).toBeInTheDocument();
    expect(getByText("Height: 480")).toBeInTheDocument();
  });
});
