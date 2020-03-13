class Schedule {
    id;
    time;
    day;
    course;
    subject;
    teacher;
    students;
    constructor(time, day, course, subject, teacher){
        this.time = time;
        this.day = day;
        this.course = course;
        this.subject = subject;
        this.teacher = teacher;
    }
}