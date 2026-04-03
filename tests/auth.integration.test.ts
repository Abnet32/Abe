import { describe, expect, it } from "vitest";
import { auth } from "@/lib/auth";

describe("Better Auth route handlers", () => {
  it("exposes the auth handler and session API", async () => {
    expect(auth.handler).toBeTypeOf("function");
    expect(auth.api.getSession).toBeTypeOf("function");
  });
});
