import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class TagDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;
}
