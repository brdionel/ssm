class CoursesController {
    ultimoId = 0;
    selectedCourse = null;
    formCreate = {
      name: {
        element: document.getElementById('input-name-create'),
        status: false,
        validators: {
          required: true,
          minLength: 3,
          maxLength: 80
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
    };
    constructor(){
        $('#modal-create-course').on('hidden.bs.modal', () => {
          this.resetForm('create');
        });
        $('#modal-update-course').on('hidden.bs.modal', () => {
          this.resetForm('update');
        });
    };
  

    listCourses() {
      coursesService.listAll().then(courseList => {
        var courseToShow = courseList.map((item, i) => {
          return new Course(item.id_course, item.name);
        });
    
        var rowHtml = '';
        
        courseToShow.forEach((item, i) => {
          
          rowHtml += `
            <tr>
              <td><b id="id-mostrado">${item.id}</b></td>
              <td id="id-name">${item.name}</td>
              <td>
                <div class="d-flex justify-content-around">
                  <a href="#!" class="action-icon" data-toggle="modal" data-target="#modal-update-course" onclick="courseController.courseSelect(${item.id})"><i class="fas fa-edit "></i></a>
                  <a href="#!" class="action-icon" data-toggle="modal" data-target="#modal-delete-course" onclick="courseController.courseSelect(${item.id})"><i class="fas fa-trash-alt"></i></a>
                </div>    
              </td>
            </tr>
          `;
        });
    
        document.getElementById('table-course').innerHTML = rowHtml;
      });
    };    

    createdCourse(){
        if ( ! this.validate(this.formCreate) ) return false;
        var name = this.formCreate.name.element.value;
        var newCourse = new Course(null, name);

        coursesService.create(newCourse).then(resp => {
          this.listCourses();
          $('#modal-create-course').modal('toggle');
          this.showMessage(resp);
          this.resetForm('create');
        });
    };

    deleteCourseok(){  
      coursesService.delete(this.selectedCourse).then(resp => {
        $('#modal-delete-course').modal('toggle');
        this.showMessage(resp);
        this.selectedCourse = null;
        this.listCourses();
      });
       
    };
    
    updateCourse(){
      if ( ! this.validate(this.formUpdate) ) return false;
        if(this.selectedCourse){
          this.selectedCourse.name = this.formUpdate.name.element.value;
          coursesService.update(this.selectedCourse).then(resp => {
            $('#modal-update-course').modal('toggle');
            this.showMessage(resp);
            this.resetForm("update");
            this.selectedCourse = null;
            this.listCourses();
          });
        }
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

    resetForm(formName){
        document.getElementById(`id-form-${formName}`).reset();
        var inputform = document.querySelectorAll(`#id-form-${formName} input`);
        inputform.forEach((item) =>{
          item.classList.remove('is-invalid','is-valid');  
        });
    };

    courseSelect(id){
      coursesService.getById(id).then(resp => {
        this.selectedCourse = new Course(resp.id_course, resp.name);
        this.formUpdate.name.element.value = resp.name;
      });
    };

    showMessage(data) {
      $('#save-message-course .alert')
        .removeClass('alert-danger')  
        .removeClass('alert-success')  
        .addClass(data.error? 'alert-danger' : 'alert-success')
        .text(data.message);
      $('#save-message-course').modal('show');
      setTimeout(() => {
        $('#save-message-course').modal('hide');
      }, 3000);
    }

}