import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePageLayout from "@/app/home-page/layout";
import resizeWindow from "@/lib/resizeWindow";
import { waitFor } from "@testing-library/react";
describe("SidebarSearchBar tests", () => {
  it("should appear on main screen when searchbar button is clicked", async () => {
    render(
      <HomePageLayout>
        <></>
      </HomePageLayout>
    );
    const searchButtonWideScreen = screen.getByTestId(
      "sidebarWideScreen__searchButton"
    );
    resizeWindow(641, 480);
    userEvent.click(searchButtonWideScreen);
    await waitFor(() => {
      const sidebarSearchbar = screen.getByTestId("sidebarSearchbar");
      expect(sidebarSearchbar).toBeInTheDocument();
    });
  });
});
