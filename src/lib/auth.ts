import { redirect } from "@tanstack/react-router";
import { pb } from "./pocketbase";

const REDIRECT_PARAM = "redirect";

const getDashboardPath = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "mentor":
      return "/mentor/dashboard";
    case "mentee":
      return "/mentee/dashboard";
    default:
      return "/";
  }
};

export const protectPage = (location, allowedRoles = []) => {
  if (!pb.authStore.isValid) {
    throw redirect({
      to: "/signin",
      search: {
        [REDIRECT_PARAM]: location.href,
      },
    });
  }

  console.log("test", pb.authStore.model);
  console.log("alowedRoles", allowedRoles);
  // User is authenticated, check for role authorization if required
  if (allowedRoles.length > 0) {
    // console.log("test", pb.authStore.model);
    const user = pb.authStore.model;
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      // User does not have the required role, redirect to their dashboard
      const userRole = user?.role;
      const dashboardPath = userRole ? getDashboardPath(userRole) : "/";
      throw redirect({
        to: dashboardPath,
      });
    }
  }
};
