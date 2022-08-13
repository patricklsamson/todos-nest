import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  body?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
