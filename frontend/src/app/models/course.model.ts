export class Course {
    constructor(
        public id: number,
        public title: string,  
        public description: string,
        public imageUrl: string,
        public capacity: number,
        public level: string,
        public ageBracket: string
    ) {}
}
