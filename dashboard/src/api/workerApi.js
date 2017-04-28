class WorkerApi {  
  static getAllWorkers() {
    var headers = new Headers();

    headers.append("Content-Type", "application/json");
    var init = { method: 'GET',
               headers: headers,
               cache: 'default' };

    return fetch('http://localhost:8000/workers', init).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default WorkerApi;
