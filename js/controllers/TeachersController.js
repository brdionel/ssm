class TeachersController {
    ultimoId = 0;
    selectedTeacher = null;
    formCreate = {
      name: {
        element: document.getElementById('input-name'),
        status: false,
        validators: {
          required: true,
          minLength: 3,
          maxLength: 80
        }
      },
      lastName: {
        element: document.getElementById('input-last-name'),
        status: false,
        validators: {
          required: true,
          minLength: 3,
          maxLength: 80,
        }
      },
      registration: {
        element: document.getElementById('input-registration'),
        status: false,
        validators: {
          required: true,
          numeric:true,  
        }
      },
    };
    formUpdate = {
      name: {
        element: document.getElementById('input-name-update'),
        status: false,
        validators: {
          required: true,
          minLength: 3,
          maxLength: 80
        }
      },
      lastName: {
        element: document.getElementById('input-last-name-update'),
        status: false,
        validators: {
          required: true,
          minLength: 3,
          maxLength: 80,
        }
      },
      registration: {
        element: document.getElementById('input-registration-update'),
        status: false,
        validators: {
          required: true,
          numeric:true,  
        }
      },
    };

    constructor(){
      $('#new-teacher').on('hidden.bs.modal', () => {
        this.resetForm('create');
      });
      $('#update-teacher').on('hidden.bs.modal', () => {
        this.resetForm('update');
      });
    };

    listTeachers() {
      var teachersToShow = teacherList.map((item, i) => {
        return new Teacher(item.id, item.name, item.lastName, item.registration);
      });
  
      var rowHtml = '';
      
      teachersToShow.forEach((item, i) => {
        
        rowHtml += `
          <tr>
            <td><b id="id-mostrado">${item.id}</b></td>
            <td id="id-name">${item.name}</td>
            <td id="id-lastName">${item.lastName}</td>
            <td id="id-registration">${item.registration}</td>
            <td>
              <div class="d-flex justify-content-around">
                <a href="#!" class="action-icon" data-toggle="modal" data-target="#update-teacher" onclick="teacherController.TeacherSelect(${item.id})"><i class="fas fa-edit "></i></a>
                <a href="#!" class="action-icon" data-toggle="modal" data-target="#delete-teacher" onclick="teacherController.TeacherSelect(${item.id})"><i class="fas fa-trash-alt"></i></a>
              </div>    
            </td>
          </tr>
        `;
      });
  
      document.getElementById('table-teacher').innerHTML = rowHtml;
      
    };

    createdTeacher(){
      if ( ! this.validate(this.formCreate) ) return false;
      var id = teacherList[teacherList.length-1].id+1;
      var name = document.getElementById('input-name').value;
      var lastName = document.getElementById('input-last-name').value;
      var registration = document.getElementById('input-registration').value;
      var newTeacher = new Teacher(id,name,lastName, registration);
      teacherList.push(newTeacher);
      this.listTeachers();

      $('#new-teacher').modal('toggle');
      $('#save-create').modal('show');
      setTimeout(() => {
        $('#save-create').modal('hide');
      }, 1000);
      this.resetForm('create');
    };

    TeacherSelect(id){
      var idselect = id;
      this.selectedTeacher = idselect;
    };

    updateTeacher(){
      if ( ! this.validate(this.formUpdate) ) return false;
      teacherList.forEach((teacher, i) => {
        if(teacher.id === this.selectedTeacher){
          var arrayTeacher = teacherList.indexOf(teacher);
          var name = document.getElementById('input-name-update').value;
          var lastName = document.getElementById('input-last-name-update').value;
          var registration = document.getElementById('input-registration-update').value;
          teacherList[arrayTeacher].name = name;
          teacherList[arrayTeacher].lastName = lastName;
          teacherList[arrayTeacher].registration = registration;


          $('#update-teacher').modal('toggle');
          $('#save-update').modal('show');
          setTimeout(() => {
            $('#save-update').modal('hide');
          }, 1000);
          this.resetForm("update");
          return true;
        }
      });
      
      this.listTeachers();
    };

    resetForm(formName){
      document.getElementById(`id-form-${formName}`).reset();
      var inputform = document.querySelectorAll(`#id-form-${formName} input`);
      inputform.forEach((item) =>{
        item.classList.remove('is-invalid','is-valid');  
      });
    }

    deleteTeacherok(){  
      var arrayId = teacherList.map(teacher => teacher.id);
      var indexTeacher = arrayId.indexOf(this.selectedTeacher);
      teacherList.splice(indexTeacher,1);
      $('#delete-teacher').modal('toggle');
      $('#save-delete').modal('show');
      setTimeout(() => {
        $('#save-delete').modal('hide');
      }, 1000);
      this.listTeachers();
    };
    
    validate(form){
      var formKeys = Object.keys(form);
      var response = true;
  
      formKeys.forEach((field) => {

        var value = form[field].element.value;
        var validators = form[field].validators;
        var result = Validators.validate(value, validators);
        var error = Object.keys(result).map(validator => result[validator]).find(val => val === false);
        form[field].status = (error === undefined); 
        



        if (!form[field].status) {
          form[field].element.classList.add("is-invalid");
          form[field].element.classList.remove("is-valid");
          response = false;
          
        } 
        else {
          form[field].element.classList.add("is-valid");
          form[field].element.classList.remove("is-invalid");

        };
      })
  
      return response;
    };


  };
 
 
  var teacherList = [
    {
      id: 1,
      name: 'JORGE',
      lastName: 'noni',
      registration: '0305566'
    },
    {
      id: 2,
      name: 'pepo',
      lastName: 'juarez',
      registration:'0233035'
    },
    {
      id: 3,
      name: 'juan',
      lastName: 'lope',
      registration: '6454555'
    },
    {
      id: 4,
      name: 'juan',
      lastName: 'lope',
      registration: '6454555'
    },
   
  ];
  