import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import Roulette from "../src/components/Roulette"
import * as Gatsby from "gatsby"
import "@testing-library/jest-dom"

const useStaticQuerySpy = jest.spyOn(Gatsby, "useStaticQuery")

// StaticQueryとuseStaticQueryのモック化
beforeEach(() => {
  useStaticQuerySpy.mockReturnValueOnce({
    site: {
      siteMetadata: {
        title: "Test Title",
      },
    },
  })
})

const data = {
  site: {
    siteMetadata: {
      title: "Test Title",
    },
  },
}

// localStorageのモック化
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value
    },
    removeItem: key => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

test("1. Roulette component renders correctly", () => {
  render(<Roulette data={data} />)
  expect(screen.getByText("Roulette App")).toBeInTheDocument()
})

test("2. handles input change and sets the new value", () => {
  render(<Roulette data={data} />)
  const input = screen.getByLabelText("Input items (separate by line)")
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } })
  expect(input.value).toBe("Item1\nItem2\nItem3")
})

test("3. spins and displays a random item", async () => {
  render(<Roulette data={data} />)
  const input = screen.getByLabelText("Input items (separate by line)")
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } })
  const spinButton = screen.getByText("Spin")
  fireEvent.click(spinButton)

  // 選択されたアイテムが表示されることを確認
  await waitFor(() => {
    expect(screen.getByText(/Item[1-3]/)).toBeInTheDocument()
  })
})

test("4. shuffle changes the order of items", () => {
  render(<Roulette />)
  const input = screen.getByLabelText("Input items (separate by line)")
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3\nItem4" } })
  const shuffleButton = screen.getByText("Shuffle")

  const initialListOrder = input.value
  let prevListOrder = initialListOrder
  let isOrderChanged = false

  // シャッフルボタンを5回クリックして、ランダムに並び替える
  for (let i = 0; i < 5; i++) {
    fireEvent.click(shuffleButton)
    const currentListOrder = input.value

    if (currentListOrder !== prevListOrder) {
      isOrderChanged = true
      break
    }

    prevListOrder = currentListOrder
  }

  // 元の順序と異なる順序が表示されることを確認
  expect(isOrderChanged).toBe(true)
})

// ...

// スピンを押すとスピンが開始されること
test("5. spin button starts the spin", async () => {
  render(<Roulette data={data} />)
  const input = screen.getByLabelText("Input items (separate by line)")
  fireEvent.change(input, { target: { value: "Item1\nItem2\nItem3" } })
  const spinButton = screen.getByText("Spin")
  fireEvent.click(spinButton)

  await waitFor(() => {
    expect(screen.getByText(/Item[1-3]/)).toBeInTheDocument()
  })
})

// リストに2バイト文字が入ってもエラーが発生しないこと
test("6. 2-byte characters in the list do not cause errors", () => {
  render(<Roulette data={data} />)
  const input = screen.getByLabelText("Input items (separate by line)")
  fireEvent.change(input, {
    target: { value: "こんにちは\nさようなら\nありがとう" },
  })
  expect(input.value).toBe("こんにちは\nさようなら\nありがとう")
})

// それぞれのボタンを押したときにリストの内容がlocalStorageに保存されること
test("7. list data is saved to localStorage when buttons are clicked", () => {
  render(<Roulette />)
  fireEvent.change(screen.getByLabelText("Input items (separate by line)"), {
    target: { value: "Item1\nItem2\nItem3" },
  })
  const spinButton = screen.getByText("Spin")
  fireEvent.click(spinButton)
  expect(localStorage.getItem("rouletteItems")).toBe("Item1,Item2,Item3")

  const shuffleButton = screen.getByText("Shuffle")
  fireEvent.click(shuffleButton)
  expect(localStorage.getItem("rouletteItems")).toBe("Item1,Item2,Item3")
})

// localStorageにデータがある場合、リストの情報を読み込めること
test("8. loads list data from localStorage if available", () => {
  localStorage.setItem("roulette_list", "Item1\nItem2\nItem3")
  render(<Roulette data={data} />)
  const input = screen.getByLabelText("Input items (separate by line)")
  expect(input.value).toBe("Item1\nItem2\nItem3")
})
