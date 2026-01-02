export const Routes : Record<string, { name: string; isProtected: boolean; header: string; headerSize: number }> = {
  "/": {
    name: "Home",
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
  "/dashboard": {
    name: "Dashboard",
    isProtected: true,
    header: "Dashboard",
    headerSize: 2
  },
  "/createmeeting": {
    name: "CreateMeeting",
    isProtected: true,
    header: "Create Meeting",
    headerSize: 2
  },
};
