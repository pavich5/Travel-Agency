"use client";
import { createContext, useContext, useEffect, useState } from "react";
const SavedContext = createContext({
  saved: [] as number[],
  toggle: (_id: number) => {},
  ready: false,
});
export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        const value = JSON.parse(
          localStorage.getItem("globetrotter-saved") || "[]",
        );
        setSaved(
          Array.isArray(value)
            ? value.filter((id: unknown) => typeof id === "number")
            : [],
        );
      } catch {
        setSaved([]);
      }
    };
    read();
    setReady(true);
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  const toggle = (id: number) =>
    setSaved((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      try {
        localStorage.setItem("globetrotter-saved", JSON.stringify(next));
      } catch {}
      return next;
    });
  return (
    <SavedContext.Provider value={{ saved, toggle, ready }}>
      {children}
    </SavedContext.Provider>
  );
}
export const useSavedTrips = () => useContext(SavedContext);
