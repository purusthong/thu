import { Application } from 'express';
import { UserAPI } from './users/userAPI';

export default class Manager{
  private app: Application;
  private user: UserAPI;
  constructor(app: Application) {
    this.app = app;
    this.user = new UserAPI();
  }

  enable(){
    this.app.use("/user", this.user.Router);
  }
}