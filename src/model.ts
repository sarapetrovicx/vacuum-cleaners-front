export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  permissions: string;
}

export interface User {
  userId: string,
  firstName: string;
  lastName: string;
  email: string;
  password:string;
  permissions: string;
}


export interface VacuumCleaner {
  vacuumId: string;
  name: string;
  status: string;
  addedBy: User;
  active: boolean;
  createdAt: Date;
}

export interface VacuumRequest {
  name: string;
}



export interface LoginResponse {
  jwt: string;
}

export interface ErrorMessage{
  id: string;
  vacuumId: string;
  operation: string;
  error: string;
  date: Date;
}
