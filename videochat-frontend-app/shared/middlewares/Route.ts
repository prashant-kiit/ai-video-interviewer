type TRoute = {
  route: string;
  routeRegex: RegExp;
  name: string;
  isProtected: boolean;
  subHeader: string;
  headerSize: number;
}

export const Routes: TRoute[] = [
  {
    route: "/",
    routeRegex: /^\/$/,
    name: "Dashboard",
    subHeader: "Welcome to the Video Chat Application",
    headerSize: 2,
    isProtected: true,
  },
  {
    route: "/signin",
    routeRegex: /^\/signin$/,
    name: "SignIn",
    subHeader: "Sign In",
    headerSize: 2,
    isProtected: false,
  },
  {
    route: "/signup",
    routeRegex: /^\/signup$/,
    name: "SignUp",
    subHeader: "Sign Up",
    headerSize: 2,
    isProtected: false,
  },
  {
    route: "/createmeeting",
    routeRegex: /^\/createmeeting$/,
    name: "CreateMeeting",
    subHeader: "Create Meeting",
    headerSize: 2,
    isProtected: true,
  },
  {
    route: "/onboarding",
    routeRegex: /^\/onboarding$/,
    name: "Onboarding",
    subHeader: "Get Onboarded",
    headerSize: 2,
    isProtected: false,
  },
  {
    route: "/meeting/[0-9]+",
    routeRegex: /^\/meeting\/[0-9]+$/,
    name: "Meeting",
    subHeader: "Meeting",
    headerSize: 2,
    isProtected: true,
  },
  {
    route: "/ownedmeetings",
    routeRegex: /^\/ownedmeetings$/,
    name: "OwnedMeetings",
    subHeader: "Owned Meetings",
    headerSize: 2,
    isProtected: true,
  },
];

export const NotFoundRoute: TRoute = {
  route: "/notfound",
  routeRegex: /^\/notfound$/,
  name: "NotFound",
  subHeader: "404 Page Not Found",
  headerSize: 2,
  isProtected: false,
};
