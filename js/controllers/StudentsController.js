class StudentsController {
  
  ultimoId = studentList.length+1;
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

    var studentsToShow = studentList.map((item) => {
      return new Student(item.id, item.name, item.lastName, item.file);
    });
    
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
  }

  // add create function
  createStudent(){
    if ( ! this.validate(this.formCreate) ) return false;
    let name = this.formCreate.name.element.value;
    let lastName = this.formCreate.lastName.element.value;
    let file = this.formCreate.file.element.value;
    var student = new Student(this.ultimoId++, name, lastName, file);
    studentList.push(student);
    this.listStudents();
    
    $('#modal-create-student').modal('hide');
    $('#modal-alert-create').modal('show');
    setTimeout(() => {
      $('#modal-alert-create').modal('hide');
    }, 3000)
    this.resetForm('create');
  }

  // Select and load student's data
  updateHandler(idStudent){
    this.studentSelected(idStudent);
    this.loadDataModalUpdate();
  }

  loadDataModalUpdate(){
    var indexStudentToUpdate = this.indexStudent();
    var studentToUpdate = studentList[indexStudentToUpdate];
    this.formUpdate.name.element.value =  studentToUpdate.name;
    this.formUpdate.lastName.element.value =  studentToUpdate.lastName;
    this.formUpdate.file.element.value =  studentToUpdate.file;
  }

  // add update function
  updateStudent(){
    if ( ! this.validate(this.formUpdate) ) return false;
    var firstNameStudent = this.formUpdate.name.element.value;
    var lastNameStudent = this.formUpdate.lastName.element.value;
    var fileStudent = this.formUpdate.file.element.value;
    var indexToUpdate = this.indexStudent();
    var updatedStudent = studentList[indexToUpdate];
    updatedStudent.name = firstNameStudent;
    updatedStudent.lastName = lastNameStudent;
    updatedStudent.file = fileStudent;
    this.listStudents();

    $('#modal-update-student').modal('hide');
    $('#modal-alert-update').modal('show');
    setTimeout(() => {
      $('#modal-alert-update').modal('hide');
    }, 3000)
    this.resetForm('update');
  }

  studentSelected(idStudent){
    this.selectedStudent = idStudent;
  }

  // add delete function
  deleteStudent(){
    var indexStudentToDelete = this.indexStudent();
    studentList.splice(indexStudentToDelete, 1);
    
    $('#modal-delete-student').modal('hide');
    $('#modal-alert-delete').modal('show');
    setTimeout(() => {
      $('#modal-alert-delete').modal('hide');
    }, 3000)
    
    this.listStudents();
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

  indexStudent(){
    var idStudents = studentList.map(student => student.id);
    return idStudents.indexOf(this.selectedStudent);
  }

}

var studentList = [
  {
    id: 1,
    name: 'Bruno',
    lastName: 'Vicente',
    file: 23213
  },
  {
    id: 2,
    name: 'Marco',
    lastName: 'Cuchian',
    file: 1235132
  },
  {
    id: 3,
    name: 'Maxi',
    lastName: 'Longoni',
    file: 1325
  },
];

