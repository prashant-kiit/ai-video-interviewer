export const Routes : Record<string, { name: string; isProtected: boolean; header: string; headerSize: number }> = {
  "/": {
    name: "Dashboard",
    isProtected: true,
    header: "Welcome to the Video Chat Application",
    headerSize: 2
  },
  "/signin": {
    name: "SignIn",
    isProtected: false,
    header: "Sign In",
    headerSize: 2
  },
  "/signup": {
    name: "SignUp",
    isProtected: false,
    header: "Sign Up",
    headerSize: 2
  },
  "/onboarding": {
    name: "Onboarding",
    isProtected: true,
    header: "Onboarding",
    headerSize: 2
  },
  "/createmeeting": {
    name: "CreateMeeting",
    isProtected: true,
    header: "Create Meeting",
    headerSize: 2
  },
};
