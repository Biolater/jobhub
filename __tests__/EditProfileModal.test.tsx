import { render, screen, waitFor } from "@testing-library/react";
import MyProfile from "@/app/home-page/my-profile/page";
import userEvent from "@testing-library/user-event";
jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    userDetails: { username: "testuser", email: "test@example.com" }, // Mock user data
    userDetailsLoading: false,
  })),
}));

describe("EditProfileModal", () => {
  it("should render EditProfileModal when edit profile button is clicked", () => {
    render(<MyProfile />);
    const editProfileButton = screen.getByTestId("editProfileButton");
    userEvent.click(editProfileButton);
    waitFor(() => {
      const editProfileModal = screen.getByTestId("editProfileModal");
      expect(editProfileModal).toBeInTheDocument();
    });
  });
});
