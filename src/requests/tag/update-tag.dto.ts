import { PartialType } from "@nestjs/mapped-types";
import { CreateTagDbInput } from "./create-tag-db.input";

export class UpdateTagDto extends PartialType(CreateTagDbInput) {}
