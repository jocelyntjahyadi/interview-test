import {IsDefined, IsString} from "class-validator";
import {Expose} from "class-transformer";

export class HeadersDto {

    @IsString()
    @IsDefined()
    @Expose({name : 'Authorization'})
    Authorization: string
}
