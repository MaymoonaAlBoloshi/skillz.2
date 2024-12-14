export type User = {
  avatar: string;
  bio: string;
  collectionId: string;
  collectionName: string;
  created: string;
  domains: string[];
  email: string;
  emailVisibility: boolean;
  id: string;
  mentee_list: string[];
  mentor: string;
  name: string;
  proficiency: string;
  role: "mentor" | "mentee" | "admin";
  updated: string;
  username: string;
  verified: boolean;
};
