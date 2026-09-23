import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest
      .fn()
      .mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
  });
  HTMLElement.prototype.scrollIntoView = jest.fn();
  window.scrollTo = jest.fn();
}
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({ user: null, isLoaded: true }),
  useClerk: () => ({ signOut: jest.fn() }),
  SignedIn: () => null,
  SignedOut: ({ children }: { children: React.ReactNode }) => children,
  UserButton: () => null,
}));
