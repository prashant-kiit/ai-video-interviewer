export const Routes: Record<
  string,
  {
    route: string;
    name: string;
    isProtected: boolean;
    subHeader: string;
    headerSize: number;
  }
> = {
  "/": {
    route: "/",
    name: "Dashboard",
    subHeader: "Welcome to the Video Chat Application",
    headerSize: 2,
    isProtected: true,
  },
  "/signin": {
    route: "/signin",
    name: "SignIn",
    subHeader: "Sign In",
    headerSize: 2,
    isProtected: false,
  },
  "/signup": {
    route: "/signup",
    name: "SignUp",
    subHeader: "Sign Up",
    headerSize: 2,
    isProtected: false,
  },
  "/createmeeting": {
    route: "/createmeeting",
    name: "CreateMeeting",
    subHeader: "Create Meeting",
    headerSize: 2,
    isProtected: true,
  },
  "/onboarding": {
    route: "/onboarding",
    name: "Onboarding",
    subHeader: "Get Onboarded",
    headerSize: 2,
    isProtected: false,
  },
  "/meetings": {
    route: "/meetings",
    name: "Meetings",
    subHeader: "Meetings",
    headerSize: 2,
    isProtected: true,
  },
  "/ownedmeetings": {
    route: "/ownedmeetings",
    name: "OwnedMeetings",
    subHeader: "Owned Meetings",
    headerSize: 2,
    isProtected: true,
  },
  "/notfound": {
    route: "/notfound",
    name: "NotFound",
    subHeader: "404 Page Not Found",
    headerSize: 2,
    isProtected: false,
  },
};
