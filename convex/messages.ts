import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    messageText: v.string(),
  },
  handler: async ({ db }, { messageText }) => {
    const message = { messageText };
    await db.insert("messages", message);
  },
});
export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async ({ db }, { messageId }) => {
    await db.delete(messageId);
  },
});

export const get = query(async ({ db }) => {
  return await db.query("messages").collect();
});
