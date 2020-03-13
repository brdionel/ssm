class Student extends User {
    file;
    constructor(name, lastName, user, file){
        super(name, lastName, user);
        this.file = file;
    }
}