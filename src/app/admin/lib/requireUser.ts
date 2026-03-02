import { getAuthenticatedUser } from "./getAuthenticatedUser";

/**
 * Returns the current authenticated user (any role), or null if not logged in.
 * Uses getAuthenticatedUser which handles silent token refresh automatically.
 */
export const requireUser = async () => {
  const user = await getAuthenticatedUser();
  if (!user) return null;
  return user;
};
