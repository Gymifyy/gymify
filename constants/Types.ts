import { GymType, CourseType } from "./GymTypes";

// User Role
export enum UserRoleEnum {
  // Default
  NOT_ASSIGNED,
  // Simple poor Member
  MEMBER,
  // Coach
  COACH,
  // admin higher precedence
  ADMIN,
  // developer over everyone
  SYSTEM_ADMIN,
}
// Signup Page Multistep form
export type UserInfoType = {
  id: string,
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  bmi: number,
  weight: number,
  height: number,
  selectedPlan: "PREMIUM" | "FREE",
  enrolledCourse: Array<CourseType>,
  enrolledGyms: Array<GymType>,
  role: UserRoleEnum.NOT_ASSIGNED | UserRoleEnum.ADMIN | UserRoleEnum.COACH | UserRoleEnum.MEMBER,
}

export class User {
  // properties
  private _id: string = "";
  private _username: string = "";
  private _firstName: string = "";
  private _lastName: string = "";
  private _email: string = "";
  private _phoneNumber: string = "";
  private _role: UserRoleEnum = UserRoleEnum.NOT_ASSIGNED;

  constructor(id: string, username: string, firstName: string, lastName: string, email: string, phoneNumber: string, role: UserRoleEnum) {
    this._id = id;
    this._username = username;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._role = role;
  }
  // Getters
  get id(): string { return this._id; }
  get username(): string { return this._username; }
  get firstName(): string { return this._firstName; }
  get lastName(): string { return this._lastName; }
  get role(): UserRoleEnum { return this._role; }
  get phoneNumber(): string { return this._phoneNumber; }
  get email(): string { return this._email; }
  // Setters
  set id(newId: string) { this._id = newId }
  set username(newUsername: string) { this._username = newUsername }
  set firstName(newFirstName: string) { this._firstName = newFirstName }
  set lastName(newLastName: string) { this._lastName = newLastName }
  set email(newEmail: string) { this._email = newEmail }
  set phoneNumber(newPhoneNumber: string) { this._phoneNumber = newPhoneNumber }
  set role(newRole: UserRoleEnum) { this._role = newRole }
}
