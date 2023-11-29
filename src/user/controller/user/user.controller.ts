import { Controller, Post, Get, Put, Delete, Body, Headers, Param, Query, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { UserDto, CreateUserDto } from 'src/user/dto/user.dto/user.dto';
import { UpdateResult } from 'typeorm';


@Controller('user')
export class UserController {

    constructor(private usersService: UserService){}

    @Post()
     create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return this.usersService.create(user).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });;
    }

    @Get()
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll().catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });;
    }

    @Get('/fetch/')
    fetchUser(@Query('page') page:number): Promise<UserDto[]> {
        if (page === undefined) {
           throw new BadRequestException('parameter page is required');
        }
        return this.usersService.fetchUser(+page).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });;
    }

    @Get(':id')
    async findByID(@Param('id') id:string): Promise<UserDto> {
        var isExist = await this.usersService.userExistByID(+id)

        if (!isExist){
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        return  this.usersService.findByID(+id).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });;
    }

    @Put()
    update(@Body() user: UserDto): Promise<UpdateResult> {
        return this.usersService.update(user).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });
    }

    @Delete(':id')
    delete(@Param('id') id:string, @Headers('Authorization') headers: string): Promise<UpdateResult> {
        if (headers != '3cdcnTiBs'){
            throw new HttpException('Header Authorization is invalid', HttpStatus.UNAUTHORIZED)
        }
        return this.usersService.delete(+id).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
          });;
    }


}




