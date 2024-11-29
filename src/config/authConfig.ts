import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "99c56de6-0025-4ab6-bc18-676c90412ba5",
    authority: "https://login.microsoftonline.com/valaiscom-ag.ch",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    allowNativeBroker: false,
    windowHashTimeout: 9000,
    iframeHashTimeout: 9000,
    loadFrameTimeout: 9000,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
      logLevel: 3,
    }
  }
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "Calendars.Read.Shared",
    "Calendars.ReadWrite",
    "Calendars.ReadWrite.Shared",
    "Files.Read",
    "Files.ReadWrite",
    "Sites.Read.All",
    "Presence.Read.All",
    "Team.ReadBasic.All",
    "Channel.ReadBasic.All",
    "Directory.Read.All"
  ]
};