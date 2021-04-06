class Account {
  static getToken() {
    return localStorage.getItem('token') || '';
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static setAccount(data) {
    localStorage.setItem('account', JSON.stringify(data));
  }

  static getAccount() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem('account'));
    } catch (e) {
      //
    }
    return data || {};
  }

  static setEvents(data) {
    localStorage.setItem('events', JSON.stringify(data));
  }

  static getEvents() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem('events'));
    } catch (e) {
      //
    }
    return data || {};
  }

  static delete() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    localStorage.removeItem('events');
  }
}

export default Account;
