import { User } from '@microsoft/microsoft-graph-types';

export interface UserProfile extends User {
  department?: string;
  jobTitle?: string;
}
