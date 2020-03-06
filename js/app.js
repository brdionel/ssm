var appContainer;

$(document).ready(function(){
  appContainer = document.getElementById('app');

  var path = window.location.hash.replace('#', '');
  if (path == '') path = '/';

  loadPage(path);
})

function loadPage(page) {
  var item = router.find(item => item.route === page);

  if (item) {
    history.pushState(item, item.name, `/#${item.route}`);
    $.ajax({
      url: item.url,
      method: 'GET',
      success(resp) {
        appContainer.innerHTML = resp;
      },
      error(err) {
        alert(`Could not load view "${item.name}"`);
      }
    });
  }
  else {
    loadPage('/404');
  }
}