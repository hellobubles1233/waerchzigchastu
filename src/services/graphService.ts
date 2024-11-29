import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { IPublicClientApplication } from "@azure/msal-browser";
import { format } from "date-fns";

export class GraphService {
  private client: Client;

  constructor(pca: IPublicClientApplication) {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
      account: pca.getAllAccounts()[0],
      scopes: ["Calendars.Read.Shared", "Calendars.ReadWrite", "Files.Read", "Files.ReadWrite"],
    });

    this.client = Client.initWithMiddleware({ authProvider });
  }

  async getMyEvents(startDate: Date, endDate: Date) {
    const formattedStart = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const formattedEnd = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    const response = await this.client
      .api("/me/calendar/events")
      .filter(`start/dateTime ge '${formattedStart}' and end/dateTime le '${formattedEnd}'`)
      .select("subject,start,end,location,bodyPreview")
      .orderby("start/dateTime")
      .get();

    return response.value;
  }

  async getRoomEvents(startDate: Date, endDate: Date) {
    const formattedStart = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const formattedEnd = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    const response = await this.client
      .api("/users/sitzungszimmer@valaiscom-ag.ch/calendar/events")
      .filter(`start/dateTime ge '${formattedStart}' and end/dateTime le '${formattedEnd}'`)
      .select("subject,start,end,location,bodyPreview,organizer")
      .orderby("start/dateTime")
      .get();

    return response.value;
  }

  async getMyDriveFiles(folderId?: string) {
    const endpoint = folderId
      ? `/me/drive/items/${folderId}/children`
      : "/me/drive/root/children";

    const response = await this.client
      .api(endpoint)
      .select("id,name,size,lastModifiedDateTime,folder,webUrl")
      .orderby("name")
      .get();

    return response.value;
  }

  async downloadFile(fileId: string): Promise<string> {
    const response = await this.client
      .api(`/me/drive/items/${fileId}`)
      .select("@microsoft.graph.downloadUrl")
      .get();

    return response["@microsoft.graph.downloadUrl"];
  }

  async createFolder(name: string, parentFolderId?: string) {
    const driveItem = {
      name,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    };

    const endpoint = parentFolderId
      ? `/me/drive/items/${parentFolderId}/children`
      : "/me/drive/root/children";

    return await this.client.api(endpoint).post(driveItem);
  }
}