class Teacher extends User {
    registration;
    constructor(name, lastName, user, registration){
        super(name, lastName, user);
        this.registration = registration;
    }
}
