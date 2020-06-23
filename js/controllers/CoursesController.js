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
        var courseToShow = courseList.map((item, i) => {
          return new Course(item.id, item.name);
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
        
    };    
    createdCourse(){
        if ( ! this.validate(this.formCreate) ) return false;
        var id = courseList[courseList.length-1].id+1;
        var name = document.getElementById('input-name-create').value;
        var newCourse = new Course(id,name,);
        courseList.push(newCourse);
        this.listCourses();
  
        $('#modal-create-course').modal('toggle');
        $('#save-create-course').modal('show');
        setTimeout(() =>{
          $('#save-create-course').modal('hide');
        }, 1000);
        this.resetForm('create');
    };
    deleteCourseok(){  
        var arrayId = courseList.map(course => course.id);
        var indexCourse = arrayId.indexOf(this.selectedCourse);
        courseList.splice(indexCourse, 1);
        $('#modal-delete-course').modal('toggle');
        $('#save-delete-course').modal('show');
        setTimeout(() => {
          $('#save-delete-course').modal('hide');
        }, 1000);
        this.listCourses();
    };
    
    updateCourse(){
      if ( ! this.validate(this.formUpdate) ) return false;
      courseList.forEach((course) => {
        if(course.id === this.selectedCourse){
          var arrayCourse = courseList.indexOf(course);
          var name = document.getElementById('input-name-update').value;
          courseList[arrayCourse].name = name;

          $('#modal-update-course').modal('toggle');
          $('#save-update-course').modal('show');
          setTimeout(() =>{
            $('#save-update-course').modal('hide');
          }, 1000);
          this.resetForm("update");
          return true;
        }
      })
      this.listCourses();
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
      var idselect = id;
      this.selectedCourse = idselect;
    };   

    resetForm(formName){
        document.getElementById(`id-form-${formName}`).reset();
        var inputform = document.querySelectorAll(`#id-form-${formName} input`);
        inputform.forEach((item) =>{
          item.classList.remove('is-invalid','is-valid');  
        });
    };

}
var courseList = [
    {
      id: 1,
      name: 'primero',
    },
    {
      id: 2,
      name: 'segundo', 
    },
    {
      id: 3,
      name: 'tercero',
    },
    {
      id: 4,
      name: 'cuarto',

    },
   
  ];