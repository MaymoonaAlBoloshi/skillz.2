import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthMethodsList, RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/lib/pocketbase";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { UsersResponse } from "@/lib/pocketbase-types";

// Define the route for the sign-in page
export const Route = createLazyFileRoute("/signin")({
  component: LoginForm,
});

/**
 * Function to map user roles to their respective dashboard paths.
 *
 * @param {string} role - The role of the user ('admin', 'mentor', 'mentee').
 * @returns {string} - The dashboard path corresponding to the user's role.
 */
const getDashboardPath = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dash";
    case "mentor":
      return "/mentor/dash";
    case "mentee":
      return "/mentee/dash";
    default:
      return "/";
  }
};

/**
 * Update the user's profile with data from OAuth2 provider.
 *
 * @param {RecordAuthResponse<UsersResponse>} authData - The authentication data returned from OAuth2.
 */
const updateProfileFromOAuth2 = async (
  authData: RecordAuthResponse<UsersResponse>,
) => {
  const meta = authData.meta;

  if (!meta) {
    return;
  }

  const formData = new FormData();

  if (meta.avatarUrl) {
    const response = await fetch(meta.avatarUrl);

    if (response.ok) {
      const file = await response.blob();
      formData.append("avatar", file);
    }
  }

  if (meta.name) {
    formData.append("name", meta.name);
  }

  await pb.collection("users").update(authData.record.id, formData);
};

/**
 * Base Login Form Component
 *
 * @param {Object} props - Component props.
 * @param {string} props.role - The role associated with this login form.
 */
const BaseLoginForm = ({ role }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already authenticated
    if (pb.authStore.isValid) {
      const user = pb.authStore.model;
      if (user && user.role) {
        navigate({ to: getDashboardPath(user.role) });
      }
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Authenticate using the users collection
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      // Check if the user's role matches the selected role
      const userRole = authData.record.role;
      if (userRole !== role) {
        await pb.authStore.clear();
        setError(`User does not have the role: ${role}`);
        return;
      }

      // Update profile from OAuth2 if needed
      await updateProfileFromOAuth2(authData);

      // Navigate to the respective dashboard
      navigate({ to: getDashboardPath(userRole) });
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" className="w-full">
        Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
      </Button>
    </form>
  );
};

/**
 * Main Login Form with Tabs
 */
function LoginForm() {
  const navigate = useNavigate();

  const [authProviders, setAuthProviders] = useState<AuthMethodsList | null>(
    null,
  );

  const hasPasswordAuth: boolean = !!(
    authProviders?.emailPassword || authProviders?.usernamePassword
  );
  const hasSocialAuth: boolean = !!authProviders?.authProviders?.length;

  const [activeTab, setActiveTab] = useState("mentee"); // Default to Mentee
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch auth methods from the users collection
    pb.collection("users")
      .listAuthMethods()
      .then((result) => {
        setAuthProviders(result);
      })
      .catch((error) => {
        console.error("Error fetching auth methods:", error);
      });

    // Check if user is already authenticated and redirect accordingly
    if (pb.authStore.isValid) {
      const user = pb.authStore.model;
      if (user && user.role) {
        navigate({ to: getDashboardPath(user.role) });
      }
    }
  }, [navigate]);

  /**
   * Handle social login based on the active tab's role.
   *
   * @param {Object} provider - The OAuth2 provider information.
   */
  const handleSocialLogin = async (provider) => {
    setError("");
    try {
      const authData = await pb.collection("users").authWithOAuth2({
        provider: provider.name,
      });

      // Check if the user's role matches the selected role
      const userRole = authData.record.role;
      if (userRole !== activeTab) {
        // If roles don't match, log out and show error
        await pb.authStore.clear();
        setError(`User does not have the role: ${activeTab}`);
        return;
      }

      await updateProfileFromOAuth2(authData);

      // Navigate to the respective dashboard
      navigate({ to: getDashboardPath(userRole) });
    } catch (error) {
      console.error("Social Authentication error:", error);
      setError("Social authentication failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-4">
            {["admin", "mentor", "mentee"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab);
                  setError("");
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>

          {/* Social Authentication */}
          {hasSocialAuth && (
            <>
              <CardDescription>
                Login with one of the following providers.
              </CardDescription>

              {authProviders?.authProviders.map((provider) => (
                <Button
                  key={provider.name}
                  className="w-full"
                  variant="outline"
                  onClick={() => handleSocialLogin(provider)}
                >
                  <img
                    src={`${pb.baseUrl}_/images/oauth2/${provider.name}.svg`}
                    className="h-4 w-4 mr-4"
                    alt={`${provider.name} icon`}
                  />
                  Sign in with {provider.displayName}
                </Button>
              ))}

              <Separator />
            </>
          )}

          {/* Display Error if Any */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Role-Specific Login Form */}
          {hasPasswordAuth && <BaseLoginForm role={activeTab} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default Route;
