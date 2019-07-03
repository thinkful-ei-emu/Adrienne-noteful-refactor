export default class Api {
 static fetchTheStuff(url, id='', method='GET', body=null) {
    const baseUrl = 'http://localhost:9090';
    const options = {
      method,
      headers: new Headers({'content-type':'application/json'}),
      body
    }
    return fetch(baseUrl + url + '/' + id, options)
      .then(res => res.json());
  }
}