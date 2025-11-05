export class Course {
    id: string;
    
    constructor(public title: String,  
        public description: String,
        public imageUrl: String,
        public capacity: number,
        public level: String,
        public ageBracket: String ) {
            this.id = crypto.randomUUID().substring(0, 8);
        }

}
