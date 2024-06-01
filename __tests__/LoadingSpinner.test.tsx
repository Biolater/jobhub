import { render, screen, waitFor } from "@testing-library/react";
import MyProfile from "@/app/home-page/my-profile/page";

jest.mock("../contexts/AuthContext.tsx", () => ({
  useAuth: jest.fn(() => ({
    userDetails: { username: "testuser", email: "test@example.com" },
    userDetailsLoading: true,
  })),
}));

describe("LoadingSpinner for my profile section", () => {
  it("should render loading spinner when loading is true", () => {
    render(<MyProfile />);
    const loadingSpinner = screen.getByTestId("loadingIndicator");
    waitFor(() => {
      expect(loadingSpinner).toBeInTheDocument();
    });
  });
});
