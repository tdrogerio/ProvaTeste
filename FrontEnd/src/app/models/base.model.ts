export abstract class BaseModel {
  id!: number;
  deleted?: boolean;
  createdBy?: number;
  createdAt?: Date;
  updatedBy?: number;
  updatedAt?: Date;
}
