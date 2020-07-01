class SchedulesController {
  
    ultimoId = schedulesList.length+1;
    selectedSchedules = null;
    
    formCreate = {
      time: {
        element: document.getElementById('input-screate-time'),
        status: false,
        validators: {
          required: true
        }
      },
      day: {
        element: document.getElementById('input-screate-day'),
        status: false,
        validators: {
          required: true
        }
      },
      course: {
        element: document.getElementById('input-screate-course'),
        status: false,
        validators: {
          required: true
        }
      },
      subject: {
        element: document.getElementById('input-screate-subject'),
        status: false,
        validators: {
          required: true
        }
      },
      teacher: {
        element: document.getElementById('input-screate-teacher'),
        status: false,
        validators: {
          required: true
        }
      },
    };

    formUpdate = {
      time: {
        element: document.getElementById('input-supdate-time'),
        status: false,
        validators: {
          required: true
        }
      },
      day: {
        element: document.getElementById('input-supdate-day'),
        status: false,
        validators: {
          required: true
        }
      },
      course: {
        element: document.getElementById('input-supdate-course'),
        status: false,
        validators: {
          required: true
        }
      },
      subject: {
        element: document.getElementById('input-supdate-subject'),
        status: false,
        validators: {
          required: true
        }
      },
      teacher: {
        element: document.getElementById('input-supdate-teacher'),
        status: false,
        validators: {
          required: true
        }
      },
    };

    constructor(){
      $('#modal-create-schedules').on('hidden.bs.modal', () => {
        this.resetForm('create');
      });
    };
  
    listSchedules() {
  
      var schedulesToShow = schedulesList.map((item) => {
        return new Schedule(item.id, item.time, item.day,item.course, item.subject, item.teacher);
      });
      
      var rowHtml = '';
      
      schedulesToShow.forEach((item) => {
        rowHtml += `
          <tr>
            <td class="text-center">${item.id}</td>
            <td>${item.time}</td>
            <td>${item.day}</td>
            <td>${item.course}</td>
            <td>${item.subject}</td>
            <td>${item.teacher}</td>
            <td>
              <div class="d-flex justify-content-around align-items-center bloque-iconos">
                <i class="fas fa-eye icono-eye" data-toggle="modal" data-target="#modal-students" onclick="schedulesController.showStudents(${item.id})"></i>
                <i class="fas fa-edit icono-update" data-toggle="modal" data-target="#modal-update-schedules"></i>
                <i class="fas fa-trash-alt icono-delete" data-toggle="modal" data-target="#modal-delete-schedules" class="borrar-schedules"></i> 
              </div>
            </td>
          </tr>
        `;
      });
      document.getElementById('tbody-schedules').innerHTML = rowHtml;
    }
  
    // add create function
    // i receive the values from the form
    createSchedules(time, day, course, subject, teacher){
      if ( ! this.validate(this.formCreate) ) return false;
      var schedules = new Schedule(this.ultimoId++, time, day, course, subject, teacher);
      schedulesList.push(schedules);
      this.listSchedules();
      
      $('#modal-create-schedules').modal('hide');
      $('#modal-alert-create').modal('show');
      setTimeout(() => {
        $('#modal-alert-create').modal('hide');
      }, 3000)
      this.resetForm('create');
    }

    updateSchedules(id, time, day, course, subject, teacher){
      if ( ! this.validate(this.formUpdate) ) return false;
      $('#modal-update-schedules').modal('hide');
      $('#modal-alert-update').modal('show');
      setTimeout(() => {
        $('#modal-alert-update').modal('hide');
      }, 3000)
      this.resetForm('update');
    }
  
    // add update function
    // here i selected the schedules when i clicked on the deleted icon . 
    schedulesSelected(idSchedules){
      this.selectedSchedules = idSchedules;
    }
  
    // add delete function
    deleteSchedules(){
      var idSchedules = schedulesList.map(schedule => schedule.id);
      var indexSchedulesToDelete = idSchedules.indexOf(this.selectedSchedule);
      schedulesList.splice(indexSchedulesToDelete, 1);
      
      $('#modal-delete-schedules').modal('hide');
      $('#modal-alert-delete').modal('show');
      setTimeout(() => {
        $('#modal-alert-delete').modal('hide');
      }, 3000)
      
      this.listSchedules();
    }
  
    resetForm(formName){
      document.getElementById(`form-schedules-${formName}`).reset();
      var inputform = document.querySelectorAll(`#form-schedules-${formName} input`);
      var selectform = document.querySelectorAll(`#form-schedules-${formName} select`);
      inputform.forEach((item) =>{
        item.classList.remove('is-invalid','is-valid'); 
      });
      selectform.forEach((item) =>{
        item.classList.remove('is-invalid','is-valid'); 
        item.selectedIndex = 0 ;
      });
    }
    showStudents(idSchedule){
        var studentsHtml = '';

        var schedule = schedulesList.find( item => item.id === idSchedule);

        schedule.students.forEach(item => {
          studentsHtml += `<li class="list-group-item" style="list-style: none;">${item}</li>`;
        })

        document.getElementById('modal-list-student').innerHTML = studentsHtml;
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
  
  }
  
  var schedulesList = [
    {
      id: 1,
      time: '22:00',
      day:'Sunday',
      course: '3k3',
      subject: 'Math',
      teacher: 'Graif',
      students: ['Jose','Pedro']
    },
    {
      id: 2,
      time: '20:00',
      day:'Sunday',
      course: '3k1',
      subject: 'Math',
      teacher: 'Alcaraz',
      students: ['Nacho','Pedro']
    },
    {
      id: 3,
      time: '21:00',
      day:'Sunday',
      course: '3k12',
      subject: 'Math',
      teacher: 'Peter Languila',
      students: ['Franco','Pedro']
    },
  ];
  var coursesList = [
    {
      id: 1,
      name:'3k2'
    },
    {
      id: 2,
      name:'3k1'
    },
    {
      id: 3,
      name:'3k12'
    },
  ];
  var teachersList = [
    {
      id: 1,
      name: 'Gustavo',
      lastName:'Graiff',
      registration: '72245'
    },
    {
      id: 2,
      name: 'Huguito',
      lastName:'Alcaraz',
      registration: '6666'
    },
    {
      id: 3,
      name: 'Peter',
      lastName:'Languila',
      registration: '4785'
    },
  ];
  var subjectsList = [
    {
      id: 1,
      name:'Math'
    },
    {
      id: 2,
      name:'Geography'
    },
    {
      id: 3,
      name:'Biology'
    },
  ];
  
  