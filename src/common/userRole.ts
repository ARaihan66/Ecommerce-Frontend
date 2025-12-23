const UserRole = {
  Admin: "ADMIN",
  User: "USER",
} as const;

// export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export default UserRole;
