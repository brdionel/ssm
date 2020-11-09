class SchedulesController {
  
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
  
      schedulesService.getAll()
      .then(schedules => {
        
        var rowHtml = '';
        if(schedules.length > 0) {
          schedules.forEach((item) => {
            rowHtml += `
              <tr>
                <td class="text-center">${item.id_schedule}</td>
                <td>${item.time}</td>
                <td>${item.week_day.name}</td>
                <td>${item.course.name}</td>
                <td>${item.subject.name}</td>
                <td>${item.teacher.name} ${item.teacher.lastname}</td>
                <td>
                  <div class="d-flex justify-content-around align-items-center bloque-iconos">
                    <i class="fas fa-edit icono-update" data-toggle="modal" 
                    data-target="#modal-update-schedules" 
                    onclick="schedulesController.updateHandler(${item.id_schedule})"></i>
                    <i class="fas fa-trash-alt icono-delete" data-toggle="modal" 
                    data-target="#modal-delete-schedules" class="borrar-schedules"
                    onclick="schedulesController.schedulesSelected(${item.id_schedule})"></i> 
                  </div>
                </td>
              </tr>
            `;
          })
        } else {
          this.showMessage('Aun no hay horarios');
        }  
        document.getElementById('tbody-schedules').innerHTML = rowHtml;
      })
    }
  
    // add create function
    // i receive the values from the form
    createSchedules(){
      if ( ! this.validate(this.formCreate) ) return false;
      let time = this.formCreate.time.element.value;
      let day = this.formCreate.day.element.value;
      let course = this.formCreate.course.element.value;
      let subject = this.formCreate.subject.element.value;
      let teacher = this.formCreate.teacher.element.value;

      let schedule = new Schedule(null, time, day, course, subject, teacher);
      schedulesService.create(schedule)
      .then(response => {
        console.log(JSON.stringify(response))
        $('#modal-create-schedules').modal('hide');
        this.showMessage(response.message);
        this.listSchedules();
        this.resetForm('create');
      })
    }

    updateSchedules(){
      if ( ! this.validate(this.formUpdate) ) return false;

      let time = this.formUpdate.time.element.value;
      let day = this.formUpdate.day.element.value;
      let course = this.formUpdate.course.element.value;
      let subject = this.formUpdate.subject.element.value;
      let teacher = this.formUpdate.teacher.element.value;
      let schedule = new Schedule(this.selectedSchedules, time, day, course, subject, teacher);
      console.log('el teacher que mando es: '+JSON.stringify(schedule))
      schedulesService.update(schedule)
      .then(response => {
        console.log(JSON.stringify(response))
        $('#modal-update-schedules').modal('hide');
        this.showMessage(response.message);
        this.listSchedules();
        this.resetForm('update');
      })
      
    }

    updateHandler(id){
      this.schedulesSelected(id);
      this.loadDataModalUpdate(id);
    }

    loadDataModalUpdate(id){
      schedulesService.getById(id)
      .then(scheduleToUpdate => {
        console.log(JSON.stringify(scheduleToUpdate))
        this.formUpdate.time.element.value =  scheduleToUpdate.time;
        this.loadData(id)
      })
    }
  
    // add update function
    // here i selected the schedules when i clicked on the deleted icon . 
    schedulesSelected(idSchedules){
      this.selectedSchedules = idSchedules;
    }
  
    // add delete function
    deleteSchedules(){
      console.log(this.selectedSchedules)
      schedulesService.delete(this.selectedSchedules)
      .then(response => {
        console.log('response del delete controler: '+ JSON.stringify(response))
        $('#modal-delete-schedules').modal('hide');
        this.showMessage(response.message)
        this.listSchedules();
      })
            
      
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

    loadData(id_schedules){
      console.log('llega a ejecutarse el loadData')

      schedulesService.getWeekDays()
      .then(days => {
        let optionsDays = ""
        optionsDays = `<option value="" selected="true" disabled="true">Pick a day</option>`;

        days.forEach( day => {
          optionsDays += `<option value=${day.id_week_day}>${day.name}</option>`
        })

        if(id_schedules){
          document.getElementById('input-supdate-day').innerHTML = optionsDays
        } else {
          document.getElementById('input-screate-day').innerHTML = optionsDays
        }
      })

      coursesService.listAll()
      .then(courses => {
        let optionsCourses = ""
        optionsCourses = `<option value="" selected="true" disabled="true">Pick a course</option>`;

        courses.forEach( course => {
          optionsCourses += `<option value=${course.id_course}>${course.name}</option>`
        })

        if(id_schedules){
          document.getElementById('input-supdate-course').innerHTML = optionsCourses
        } else {
          document.getElementById('input-screate-course').innerHTML = optionsCourses
        }

      })

      subjectsService.listAll()
      .then( subjects => {
        let optionsSubjects = "";
        optionsSubjects = `<option value="" selected="true" disabled="true">Pick a subject</option>`;
      
        subjects.forEach( subject => {
          optionsSubjects += `<option value=${subject.id_subject}>${subject.name}</option>`
        })
        
        if(id_schedules){
          document.getElementById('input-supdate-subject').innerHTML = optionsSubjects
        } else {
          document.getElementById('input-screate-subject').innerHTML = optionsSubjects
        }
      })

      teachersService.listall()
      .then( teachers => {
        let optionsTeachers = "";
        optionsTeachers = `<option value="" selected="true" disabled="true">Pick a teacher</option>`;
      
        teachers.forEach( teacher => {
          optionsTeachers += `<option value=${teacher.id_teacher}>${teacher.name} ${teacher.lastname}</option>`
        })

        if(id_schedules){
          document.getElementById('input-supdate-teacher').innerHTML = optionsTeachers
        } else {
          document.getElementById('input-screate-teacher').innerHTML = optionsTeachers
        }
      })

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
      $('#message-schedule').html(message);
      $('#modal-alert-schedule').modal('show');
      setTimeout(() => {
        $('#modal-alert-schedule').modal('hide');
      }, 3000)
    }
  }