import { IsNotEmpty } from "class-validator";

// createClassDto.ts
export class CreateClassDto {
    @IsNotEmpty()
    className: string;
    slug?: string
}

// updateClassDto.ts
export class UpdateClassDto {
    @IsNotEmpty()
    className: string;

    slug?: string
}
