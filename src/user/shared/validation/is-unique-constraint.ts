import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { IsUniqueConstraintInput } from './is-unique';
  import { EntityManager } from 'typeorm';
  import { Injectable } from '@nestjs/common';
  import { Logger } from '@nestjs/common';
import { table } from 'console';
  
  @ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
  @Injectable()
  export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
  
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
      const { tableName, column, action }: IsUniqueConstraintInput = args.constraints[0];
      Logger.log(action)
      Logger.log(tableName)
      Logger.log(value)
      if (action === 'INSERT'){
        const exists = await this.entityManager
        .getRepository(tableName)
        .createQueryBuilder(tableName)
        .where({ [column]: value })
        .getExists();

        
        return exists ? false : true;
      }else{
        return false;
      }
  
    }
  
    defaultMessage?(validationArguments?: ValidationArguments): string {
      return `email already exist`;
    }
  }