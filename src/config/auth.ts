export const msalConfig = {
  auth: {
    clientId: "99c56de6-0025-4ab6-bc18-676c90412ba5",
    authority: "https://login.microsoftonline.com/valaiscom-ag.ch",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
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
    "Channel.ReadBasic.All",
    "Team.ReadBasic.All"
  ],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphCalendarEndpoint: "https://graph.microsoft.com/v1.0/me/calendar/events",
  graphSharedCalendarEndpoint: "https://graph.microsoft.com/v1.0/users/sitzungszimmer@valaiscom-ag.ch/calendar/events"
};