class SubjectsController {

  selectedSubject = null;
  idPosition = null;
  
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
    var subjectsToShow = subjectList.map((item, i) => {
      return new Subject(item.id, item.name);
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
  }
    
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
    var ultimo= subjectList [subjectList.length -1];
    var ultimoid = ultimo.id+1 ;
    var subjectNew = document.getElementById('subject-new').value;
    subjectList.push(new Subject(ultimoid, subjectNew));
    this.listSubjects(); 
    $('#create-modal').modal('toggle');
    $('#save-subjects').modal('show');
    setTimeout(() =>{
      $('#save-subjects').modal('hide');
    }, 2000);
    this.resetForm('create');
  }
      
      // add update function
      
  updateSubject() { 
    if ( ! this.validation(this.formUpdate) ) return false;
    subjectList.forEach((subject) => {
      if (subject.id === this.idPosition){
        var subjectSelect = subjectList.indexOf(subject);
        var subjectNew = document.getElementById('subject-edit').value;
        subjectList[subjectSelect].name = subjectNew;
        $('#edit-modal').modal('toggle');
        $('#update-subjects').modal('show');
        setTimeout(() =>{
          $('#update-subjects').modal('hide');
        }, 2000);
      }
    });  
    this.resetForm('update');
    this.listSubjects();
  }
      // add delete function

  position(idPos){
    this.idPosition = idPos;
  }
  deleteSubject() { 
    var idSubject = subjectList.map(subject => subject.id);
    var subjectPos = idSubject.indexOf(this.idPosition);
    subjectList.splice(subjectPos, 1);
    $('#delete-modal').modal('toggle');
    $('#delete-subjects').modal('show');
    setTimeout(() =>{
      $('#delete-subjects').modal('hide');
    }, 2000); 
    this.listSubjects();
  }  

  resetForm(formName){
    document.getElementById(`form-${formName}`).reset();
    var inputform = document.querySelectorAll(`#form-${formName} input`);
    inputform.forEach((item) =>{
      item.classList.remove('is-invalid','is-valid');  
    });
  }
}

var subjectList = [
  {
    id: 1,
    name: 'English'
  },
  {
    id: 2,
    name: 'Math'
  },
  {
    id: 3,
    name: 'Geography'
  },
];
