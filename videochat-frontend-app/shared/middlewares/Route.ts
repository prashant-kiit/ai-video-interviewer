export const Routes: Record<
  string,
  { name: string; isProtected: boolean; subHeader: string; headerSize: number }
> = {
  "/": {
    name: "Dashboard",
    subHeader: "Welcome to the Video Chat Application",
    headerSize: 2,
    isProtected: true,
  },
  "/signin": {
    name: "SignIn",
    subHeader: "Sign In",
    headerSize: 2,
    isProtected: false,
  },
  "/signup": {
    name: "SignUp",
    subHeader: "Sign Up",
    headerSize: 2,
    isProtected: false,
  },
  "/createmeeting": {
    name: "CreateMeeting",
    subHeader: "Create Meeting",
    headerSize: 2,
    isProtected: true,
  },
  "/onboarding": {
    name: "Onboarding",
    subHeader: "Get Onboarded",
    headerSize: 2,
    isProtected: false,
  },
  "/meetings": {
    name: "Meetings",
    subHeader: "Meetings",
    headerSize: 2,
    isProtected: true,
  },
  "/notfound": {
    name: "NotFound",
    subHeader: "404 Page Not Found",
    headerSize: 2,
    isProtected: false,
  },
};
