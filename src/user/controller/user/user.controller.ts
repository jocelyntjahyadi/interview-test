import { Controller, Post, Get, Put, Delete, Body, Request, Param, Query, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/service/user/user.service';
import { UserDto } from 'src/user/dto/user.dto/user.dto';
import { User } from 'src/user/entity/user.entity/user.entity';
import { UpdateResult } from 'typeorm';
import {getConnection} from "typeorm";
import { Interface } from 'readline';
import { Logger } from '@nestjs/common';


@Controller('user')
export class UserController {

    constructor(private usersService: UserService){}

    @Post()
    // @UserExist()
    create(@Body() user: UserDto): Promise<UserDto> {
        return this.usersService.create(user);
    }

    @Get()
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get('/fetch/')
    fetchUser(@Query('page') page:number): Promise<UserDto[]> {
        if (page === undefined) {
           throw new BadRequestException('parameter page is required');
        }
        return this.usersService.fetchUser(+page);
    }

    @Get(':id')
    findByID(@Param('id') id:string): Promise<UserDto> {
        return this.usersService.findByID(+id);
    }

    @Put()
    update(@Body() user: UserDto): Promise<UpdateResult> {

        var isExist = this.usersService.userExistByEmail(user.email)

        if (isExist){
             throw new BadRequestException(`user with email ${user.email} already exists`);
        }

        return this.usersService.update(user);
    }

    @Delete(':id')
    delete(@Param('id') id:string, @Request() req): Promise<UpdateResult> {
        const auth = req.headers.get('Authorization')
        if (auth != '3cdcnTiBs'){
            throw new HttpException('Header Authorization is invalid', HttpStatus.UNAUTHORIZED)
        }
        return this.usersService.delete(+id);
    }

    
    // UserExist (){
    //     return function(target, propertyKey : string, descriptor: PropertyDescriptor){
    
    //     var isExist = this.usersService.userExistByEmail(user.email)
    
    //     if (isExist){
    //         throw new BadRequestException(`user with email ${user.email} already exists`);
    //     }
    // }
    // }

}



