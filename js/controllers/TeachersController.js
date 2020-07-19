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
      teachersService.listall().then(res => {
        var teachersToShow = res.map((item, i) => {
          return new Teacher(item.id_teacher, item.name, item.lastname, item.registration);
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
                <a href="#!" class="action-icon" data-toggle="modal" data-target="#update-teacher" onclick="teacherController.teacherSelect(${item.id})"><i class="fas fa-edit "></i></a>
                <a href="#!" class="action-icon" data-toggle="modal" data-target="#delete-teacher" onclick="teacherController.teacherSelect(${item.id})"><i class="fas fa-trash-alt"></i></a>
              </div>    
            </td>
          </tr>
        `;
      });
      document.getElementById('table-teacher').innerHTML = rowHtml;
      })
    };

    createdTeacher(){
      if ( ! this.validate(this.formCreate) ) return false;
      var name = this.formCreate.name.element.value;
      var lastName = this.formCreate.lastName.element.value;
      var registration = this.formCreate.registration.element.value;
      var newTeacher = new Teacher(null,name,lastName, registration);

      teachersService.create(newTeacher).then(res => {
        this.listTeachers();
        $('#new-teacher').modal('toggle');
        this.showMessage(res);
        this.resetForm('create');
      })
    };

    teacherSelect(id){
      teachersService.getById(id).then(res => {
        this.selectedTeacher = new Teacher(res.id_teacher, res.name, res.lastname, res.registration);
        this.formUpdate.name.element.value = res.name;
        this.formUpdate.lastName.element.value = res.lastname;
        this.formUpdate.registration.element.value = res.registration;
      });
    };

    updateTeacher(){
      if ( ! this.validate(this.formUpdate) ) return false;
        if(this.selectedTeacher){
          this.selectedTeacher.name = this.formUpdate.name.element.value;
          this.selectedTeacher.lastName= this.formUpdate.lastName.element.value;
          this.selectedTeacher.registration= this.formUpdate.registration.element.value;

          teachersService.update(this.selectedTeacher).then(res => {
            this.listTeachers();
            $('#update-teacher').modal('toggle');
            this.showMessage(res);
            this.resetForm("update");
            this.selectedTeacher = null
          })
        }
    };

    resetForm(formName){
      document.getElementById(`id-form-${formName}`).reset();
      var inputform = document.querySelectorAll(`#id-form-${formName} input`);
      inputform.forEach((item) =>{
        item.classList.remove('is-invalid','is-valid');  
      });
    }

    deleteTeacherok(){  
       teachersService.delete(this.selectedTeacher).then(res => {
        $('#delete-teacher').modal('toggle');
        this.showMessage(res);
        this.listTeachers();
       })
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

    showMessage(data) {
      $('#save-message-teacher .alert')
        .removeClass('alert-danger')  
        .removeClass('alert-success')  
        .addClass(data.error? 'alert-danger' : 'alert-success')
        .text(data.message);
      $('#save-message-teacher').modal('show');
      setTimeout(() => {
        $('#save-message-teacher').modal('hide');
      }, 3000);
    }


  };