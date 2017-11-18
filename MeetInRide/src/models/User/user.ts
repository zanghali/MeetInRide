import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class User {
    private username: string;
    private name: string;
    private age: number;
    private description: string;
    private email: string;

    constructor(data) {
        this.username = data.username;
        this.name = data.surname + ' ' + data.lastname;

        let birthdate = new Date(data.birthdate.replace(' ', 'T'));
        this.age = Math.floor((Math.abs(Date.now() - birthdate.getDate()) / (1000 * 3600 * 24))/365);
        
        this.description = '';
        this.email = data.email;
    }

    public getUsername(): string {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }

    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }

    public getAge(): number {
        return this.age;
    }
    public setAge(age: number): void {
        this.age = age;
    }

    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): void {
        this.description = description;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
}
