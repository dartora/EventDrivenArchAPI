export class UserResponseDto {
  id: string;
  email: string;
  consents: string[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
