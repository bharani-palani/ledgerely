class Auth {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated(appResponse, ls) {
    const [appStoreData] = appResponse;
    if(ls && ls.googleId) {
      this.authenticated = appStoreData.google_id === ls.googleId;
    } else {
      this.authenticated = false;
    }
    return this.authenticated
    // return true; // change this to vaid above condition
  }
}

export default new Auth();
