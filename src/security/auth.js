class Auth {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated(appResponse, ls) {
    const [appStoreData] = appResponse;
    if(ls && ls.googleId) {
      this.authenticated = appStoreData.google_id === ls.googleId;
    } else if(ls && ls.userId){
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return this.authenticated
  }
}

export default new Auth();
