export class Course {
    constructor(
        public id: number,
        public title: string,  
        public capacity: number | null,
        public level: string,
        public dayOfWeek: string,
        public timeSlot: string,
        public location: string
    ) {}
}
