class SubjectsController {

  selectedSubject = null;

  listSubjects() {
    var subjectsToShow = subjectList.map((item, i) => {
      return new Subject(item.id, item.name);
    });

    var rowHtml = '';

    subjectsToShow.forEach((item, i) => {
      rowHtml += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td></td>
        </tr>
      `;
    });

    document.getElementById('table-asd').innerHTML = rowHtml;
  }


  // add create function


  // add update function


  // add delete function

}

var subjectController = new SubjectsController();




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