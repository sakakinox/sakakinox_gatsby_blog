import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Roulette from "../src/components/Roulette";
import { graphql, useStaticQuery } from "gatsby";
import * as Gatsby from "gatsby";

global.__PATH_PREFIX__ = "";
const useStaticQuerySpy = jest.spyOn(Gatsby, "useStaticQuery");

// StaticQueryとuseStaticQueryのモック化
beforeEach(() => {
  useStaticQuerySpy.mockImplementation(() => ({
    site: {
      siteMetadata: {
        title: "Test Title",
      },
    },
  }));
});

const data = {
  site: {
    siteMetadata: {
      title: "Test Title",
    },
  },
};

// localStorageのモック化
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

test("Roulette component renders correctly", () => {
  render(<Roulette data={data} />);
  expect(screen.getByText("Roulette App")).toBeInTheDocument();
});

test("handles input change and sets the new value", () => {
  render(<Roulette data={data} />);
  const input = screen.getByLabelText("Input items (separate by line)");
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } });
  expect(input.value).toBe("Item1\nItem2\nItem3");
});

test("spins and displays a random item", async () => {
  render(<Roulette data={data} />);
  const input = screen.getByLabelText("Input items (separate by line)");
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } });
  const spinButton = screen.getByText("Spin");
  fireEvent.click(spinButton);

  // 選択されたアイテムが表示されることを確認
  await waitFor(() => {
    expect(screen.getByText(/Item[1-3]/)).toBeInTheDocument();
  });
});

test("shuffle changes the order of items", () => {
  render(<Roulette data={data} />);
  const input = screen.getByLabelText("Input items (separate by line)");
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } });
  const shuffleButton = screen.getByText("Shuffle");
  fireEvent.click(shuffleButton);

  // 順番が変わっていることを確認
  expect(input.value).not.toBe("Item1\nItem2\nItem3");
});

