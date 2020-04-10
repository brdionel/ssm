class StudentController {

  selectedStudent = null;

  listStudents() {
    var studentsToShow = studentList.map((item, i) => {
      return new Student(item.id, item.name, item.lastName, item.user, item.file);
    });

    var rowHtml = '';

    studentsToShow.forEach((item, i) => {
      rowHtml += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.lastName}</td>
          <td>${item.user}</td>
          <td>${item.file}</td>
          <td>
            <div class="d-flex justify-content-around align-items-center">
              <a href="" data-toggle="modal" data-target="#modal-update-student">
                  <i class="fas fa-edit"></i>
              </a>
              <a href="" data-toggle="modal" data-target="#modal-delete-student">
                  <i class="fas fa-trash-alt"></i>
              </a>
            </div>
          </td>
        </tr>
      `;
    });

    document.getElementById('tbody-student').innerHTML = rowHtml;
  }


  // add create function


  // add update function


  // add delete function

}

var studentController = new StudentController();
console.log("estamos")

var studentList = [
  {
    id: 1,
    name: 'Bruno',
    lastName: 'Vicente',
    user: 'brdionel11',
    file: 23213
  },
  {
    id: 2,
    name: 'Marco',
    lastName: 'Cuchian',
    user: 'mcuchian',
    file: 1235132
  },
  {
    id: 3,
    name: 'Maxi',
    lastName: 'Longoni',
    user: 'mlongoni',
    file: 1325
  },
];

