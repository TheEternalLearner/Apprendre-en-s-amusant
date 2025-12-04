
export class User {
    constructor(public id: number,
        public firstName: string,  
        public lastName: number | null,
        public email: string,
        public telephone?: string,
        public address ?: string) {};
}