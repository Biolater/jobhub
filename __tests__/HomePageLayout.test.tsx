import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePageLayout from "@/app/home-page/layout";
import resizeWindow from "@/lib/resizeWindow";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: jest.fn(() => "/"),
}));

describe("HomePageLayout", () => {
  it("should render navbar and sidebar", () => {
    render(
      <HomePageLayout>
        <></>
      </HomePageLayout>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("should render sidebar after clicking menu button", async () => {
    render(
      <HomePageLayout>
        <></>
      </HomePageLayout>
    );
    const menuButton = screen.getByTestId("navbar__hamburgerBtn");
    userEvent.click(menuButton);
    await waitFor(() =>
      expect(screen.getByTestId("sidebar")).toBeInTheDocument()
    );
  });

  it("should render second sidebar if screen width is bigger than 640px", async () => {
    render(
      <HomePageLayout>
        <></>
      </HomePageLayout>
    );

    resizeWindow(641, 480);
    await waitFor(() => {
      const sidebar = screen.getByTestId("sidebarWideScreen");
      expect(sidebar).toBeInTheDocument();
    });
  });
});
