import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ThemeProvider } from "../context/ThemeContext";

describe("LoginPage", () => {
  it("renders login demo cards and manual login option", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(
      screen.getByText(/выберите роль для демонстрации/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /вход с email/i }),
    ).toBeInTheDocument();
  });
});
