export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface IChangeUserRole {
  username: string;
  email: string;
  role: string;
  onCloseModal: () => void;
  fetchAllUserData: () => Promise<void>;
}
