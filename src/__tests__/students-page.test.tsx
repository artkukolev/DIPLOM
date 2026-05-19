import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { StudentsPage } from "../pages/StudentsPage";
import { ThemeProvider } from "../components/ThemeProvider";

const queryClient = new QueryClient();

describe("StudentsPage", () => {
  it("renders header and search input", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter>
            <StudentsPage />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByText(/управление учащимися/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/фио, контакт родителя или компетенция/i),
    ).toBeInTheDocument();
  });
});
