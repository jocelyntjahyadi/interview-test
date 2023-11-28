import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, IsNull, Column } from 'typeorm';
import { UserDto } from 'src/user/dto/user.dto/user.dto'
import { User } from 'src/user/entity/user.entity/user.entity';
import axios from 'axios';
import { Logger } from '@nestjs/common';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    create(user: UserDto): Promise<UserDto> {
        return this.userRepository.save(user);
    }

    findAll(): Promise<UserDto[]> {
        return this.userRepository.find({where : {deletedAt : IsNull()}});
    }

    findByID(id :number): Promise<User | undefined> {
        return this.userRepository.findOne({where:{id:id, deletedAt : IsNull()}});
    }

    userExistByEmail(email :string): Promise<Boolean> {
        return this.userRepository.exist({where:{ email:email, deletedAt : IsNull()}});
    }

    update (user: UserDto): Promise<UpdateResult> {

        return this.userRepository.
        createQueryBuilder().
        update(User).
        set({
            firstName:user.firstName, 
            lastName: user.lastName, 
            avatar: user.avatar, 
            email: user.email, 
            updatedAt: new Date()
        }).where({id : user.id}).execute()

    }

    delete (id :number): Promise<UpdateResult> {
        return this.userRepository.
        createQueryBuilder().
        update(User).
        set({ 
            deletedAt: new Date()
        }).where({id : id}).execute()
    }

    async fetchUser(page:number): Promise<UserDto[]>{
        var users : UserDto[] = [];
        var userRes : any

        const api = axios.create({
            baseURL : 'https://reqres.in',
            headers : {
                'Content-Type': 'application/json'
            },
            timeout : 6000000,
        })

        await api.get(`/api/users?page=${page}`).then(responses => {

            if(responses){

                const filtered = responses.data?.data
               

                filtered.map(res => {
                    var user :UserDto = {
                        id : res.id,
                        email : res.email,
                        firstName : res.first_name,
                        lastName : res.last_name,
                        avatar : res.avatar,
                    }

                    users.push(user);
                })
                
                userRes =  this.userRepository.createQueryBuilder()
                .insert()
                .into(User)
                .values(users)
                .orUpdate({conflict_target : ['email'], overwrite : ['last_name', 'first_name', 'avatar']})
                .execute();

                Logger.log("MASUK SINI 1",users)

                return users
            }
        })

        Logger.log("MASUK SINI 2",users)

        return users
    }
}

