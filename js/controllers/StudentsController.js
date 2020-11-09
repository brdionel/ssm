class StudentsController {
  
  selectedStudent = null;
  
  formCreate = {
    name: {
      element: document.getElementById('input-screate-fname'),
      status: false,
      validators: {
        required: true
      }
    },
    lastName: {
      element: document.getElementById('input-screate-lname'),
      status: false,
      validators: {
        required: true,
        minLength: 3,
        maxLength: 80,
      }
    },
    file: {
      element: document.getElementById('input-screate-file'),
      status: false,
      validators: {
        required: true,
        numeric:true,  
      }
    },
  };

  formUpdate = {
    name: {
      element: document.getElementById('input-supdate-fname'),
      status: false,
      validators: {
        required: true
      }
    },
    lastName: {
      element: document.getElementById('input-supdate-lname'),
      status: false,
      validators: {
        required: true,
        minLength: 3,
        maxLength: 80,
      }
    },
    file: {
      element: document.getElementById('input-supdate-file'),
      status: false,
      validators: {
        required: true,
        numeric:true,  
      }
    },
  };

  constructor(){
    $('#modal-create-student').on('hidden.bs.modal', () => {
      this.resetForm('create');
    });
  };

  listStudents() {

    studentsService.getAll()
    .then(response => {
      let studentsToShow = response.map(student => {
        return new Student(student.id_student, student.name, student.lastname, student.file)
      })
      
      var rowHtml = '';
    
      studentsToShow.forEach((item) => {
        rowHtml += `
          <tr>
            <td class="text-center">${item.id}</td>
            <td>${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.file}</td>
            <td>
              <div class="d-flex justify-content-around align-items-center bloque-iconos">
                <i class="fas fa-edit icono-update" data-toggle="modal" data-target="#modal-update-student" onclick="studentController.updateHandler(${item.id})"></i>
                <i class="fas fa-trash-alt icono-delete" data-toggle="modal" data-target="#modal-delete-student" class="borrar-student" onclick="studentController.studentSelected(${item.id})"></i> 
              </div>
            </td>
          </tr>
        `;
      });
      document.getElementById('tbody-student').innerHTML = rowHtml;
    })    
  }
 
  // add create function
  createStudent(){
    if ( ! this.validate(this.formCreate) ) return false;
    let name = this.formCreate.name.element.value;
    let lastName = this.formCreate.lastName.element.value;
    let file = this.formCreate.file.element.value;
    var student = new Student(null, name, lastName, file);
    
    studentsService.create(student)
    .then(response => {
      $('#modal-create-student').modal('hide');
      this.showMessage(response.message);

      this.listStudents();

      this.resetForm('create');
    })
    
  }

  // Select and load student's data
  updateHandler(idStudent){
    this.selectedStudent = idStudent;
    this.loadDataModalUpdate(idStudent);
  }

  loadDataModalUpdate(id){
    var indexStudentToUpdate = id;
    
    studentsService.getById(id)
    .then(studentToUpdate => {
      this.formUpdate.name.element.value =  studentToUpdate.name;
      this.formUpdate.lastName.element.value =  studentToUpdate.lastname;
      this.formUpdate.file.element.value =  studentToUpdate.file;
    })
  }

  // add update function
  updateStudent(){
    if ( ! this.validate(this.formUpdate) ) return false;
    var name = this.formUpdate.name.element.value;
    var lastName = this.formUpdate.lastName.element.value;
    var file = this.formUpdate.file.element.value;

    let student = { 
      name,
      lastName, 
      file
    }

    studentsService.update(this.selectedStudent, student)
    .then(response => {
      $('#modal-update-student').modal('hide');
      this.listStudents();
  
      this.showMessage(response.message)
      this.resetForm('update');
    })
    
  }

  studentSelected(idStudent){
    this.selectedStudent = idStudent;
  }

  // add delete function
  deleteStudent(){
    var indexStudentToDelete = this.selectedStudent;
    // studentList.splice(indexStudentToDelete, 1);
    console.log('el id a borrar es: '+ indexStudentToDelete)
    studentsService.delete(indexStudentToDelete)
    .then(res => {
      console.log('el res que voy a amndar a showmessage es: '+ JSON.stringify(res))
      $('#modal-delete-student').modal('hide');
      this.showMessage(res.message)
      
      this.listStudents();
    })
    
  }

  resetForm(formName){
    document.getElementById(`form-student-${formName}`).reset();
    var inputform = document.querySelectorAll(`#form-student-${formName} input`);
    inputform.forEach((item) =>{
      item.classList.remove('is-invalid','is-valid');  
    });
  }

  validate(form){
    var formKeys = Object.keys(form);
    var response = true;

    formKeys.forEach((field) => {

      var value = form[field].element.value;
      var validators = form[field].validators;
      var result = Validators.validate(value, validators);
      var error = Object.keys(result).map(validator => result[validator]).find(val => val === false);
      form[field].status = (error === undefined); 
      
      // it paints the fields according to the validation result
      if (!form[field].status) {
        form[field].element.classList.add("is-invalid");
        form[field].element.classList.remove("is-valid");
        response = false;
      } else {
        form[field].element.classList.add("is-valid");
        form[field].element.classList.remove("is-invalid");
      };
    })

    return response;
  };

  showMessage(message){
    $("#message-student").html(message)
    $('#modal-alert-student').modal('show');
    setTimeout(() => {
      $('#modal-alert-student').modal('hide');
    }, 3000)
  }

}