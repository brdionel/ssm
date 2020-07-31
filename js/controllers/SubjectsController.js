class SubjectsController {

  selectedSubject = null;
  
  formCreate = {
    name: {
      element: document.getElementById('subject-new'),
      status: false,
      validators: {
        required: true,
        minLength: 2,
        maxLength: 80
      }
    },
  }
  formUpdate = {
    name: {
      element: document.getElementById('subject-edit'),
      status: false,
      validators: {
        required: true,
        minLength: 2,
        maxLength: 80
      }
    },
  }

  constructor(){
    $('#create-modal').on('hidden.bs.modal', () => {
      this.resetForm('create');
    });
    $('#edit-modal').on('hidden.bs.modal', () => {
      this.resetForm('update');
    });
  }
  
  listSubjects() {
    subjectsService.listAll().then(subjectList => {
      var subjectsToShow = subjectList.map((item, i) => {
        return new Subject(item.id_subject, item.name);
      });
    
      var rowHtml = '';
      subjectsToShow.forEach((item) => {
        rowHtml += `
        <tr>
          <td><b>${item.id}</b></td>
          <td>${item.name}</td>
          <th scope="col">
            <a onclick="subjectController.position(${item.id})" href="#!" class="action-icon"><i class="fas fa-edit mr-4" data-toggle="modal" data-target="#edit-modal"></i></a>
            <a onclick="subjectController.position(${item.id})" href="#!" class="action-icon"><i class="fas fa-trash-alt" data-toggle="modal" data-target="#delete-modal"></i></a>
          </th>
        </tr>
        `;
      });
      document.getElementById('table-subject').innerHTML = rowHtml;
    });
  };
    
  validation(form) {
    var formKeys = Object.keys(form);
    var response = true;
    formKeys.forEach((field) => {
      var value = form[field].element.value;
      var validators = form[field].validators;
      var result = Validators.validate(value, validators);
      var error = Object.keys(result).map(validator => result[validator]).find(val => val === false);
      form[field].status = error === undefined;
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
  }

    
      // add create function
      
  createSubject() {
    if ( ! this.validation(this.formCreate) ) return false;
    var name = this.formCreate.name.element.value;
    var newSubject = new Subject(null, name);

    subjectsService.create(newSubject).then(resp => {
      this.listSubjects(); 
      $('#create-modal').modal('toggle');
      this.showMessage(resp);
      this.resetForm('create');
    });
  }
      
      // add update function
      
  updateSubject() { 
    if ( ! this.validation(this.formUpdate) ) return false;
    if (this.selectedSubject){
      this.selectedSubject.name = this.formUpdate.name.element.value;
      subjectsService.update(this.selectedSubject).then(resp => {
        $('#edit-modal').modal('toggle');
        this.showMessage(resp);
        this.resetForm('update');
        this.selectedSubject = null;
        this.listSubjects();
      });
    } 
  }
      // add delete function

  position(id){
    subjectsService.getById(id).then(resp => {
      this.selectedSubject = new Subject(resp.id_subject, resp.name);
      this.formUpdate.name.element.value = resp.name;
    });
  }

  deleteSubject(){ 
    subjectsService.delete(this.selectedSubject).then(resp => {
      $('#delete-modal').modal('toggle');
      this.showMessage(resp);
      this.selectedSubject = null;
      this.listSubjects();
    });
  }

  resetForm(formName){
    document.getElementById(`form-${formName}`).reset();
    var inputform = document.querySelectorAll(`#form-${formName} input`);
    inputform.forEach((item) =>{
      item.classList.remove('is-invalid','is-valid');  
    });
  }

  showMessage(data){
    $('#save-message-subjects .alert')
      .removeClass('alert-danger')  
      .removeClass('alert-success')  
      .addClass(data.error? 'alert-danger' : 'alert-success')
      .text(data.message);
    $('#save-message-subjects').modal('show');
    setTimeout(() => {
      $('#save-message-subjects').modal('hide');
    }, 3000);
  }
}
