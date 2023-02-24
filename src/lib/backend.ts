import { ConvexSvelteClient } from "./convexSvelteClient";
import type { OptimisticLocalStore } from "convex/browser";

const address = import.meta.env.VITE_CONVEX_URL;
const convex = new ConvexSvelteClient(address);

export const messages = convex.createQueryStore("getMessages", []);

export const addMessage = async (author: string, body: string) => {
  await convex.mutate(
    "addMessage",
    [author, body],
    (localStorage: OptimisticLocalStore, author: string, body: string) => {
      console.log("optimistic");
      const messages = localStorage.getQuery("getMessages", []) ?? [];
      messages.push({ author, body, optimistic: true });
      localStorage.setQuery("getMessages", [], messages);
    }
  );
};
