import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsNumber()
  id: number;

  @IsString()
  body?: string;

  @IsBoolean()
  done?: boolean;
}
