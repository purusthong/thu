import { Application } from 'express';
import { UserAPI } from './users/userAPI';
import { AuthAPI } from './auth/authAPI';
import { AdminAPI } from './admin/adminAPI';
import { DonationAPI } from './donations/donationAPI';
import { EventAPI } from './events/eventAPI';
import { HospitalAPI } from './hospitals/hospitalAPI';
import { PartnerAPI } from './partners/partnerAPI';
import { PostAPI } from './posts/postAPI';
import { StaffAPI } from './staff/staffAPI';

export default class Manager{
  private app: Application;
  private user: UserAPI;
  private auth: AuthAPI;
  private admin: AdminAPI;
  private donation: DonationAPI;
  private event: EventAPI;
  private hospital: HospitalAPI;
  private partner: PartnerAPI;
  private post: PostAPI;
  private staff: StaffAPI;
  constructor(app: Application) {
    this.app = app;
    this.user = new UserAPI();
    this.auth = new AuthAPI();
    this.admin = new AdminAPI();
    this.donation = new DonationAPI();
    this.event = new EventAPI();
    this.hospital = new HospitalAPI();
    this.partner = new PartnerAPI();
    this.post = new PostAPI();
    this.staff = new StaffAPI();
  }

  enable(){
    this.app.use("/user", this.user.Router);
    this.app.use("/auth", this.auth.Router);
    this.app.use("/admin", this.admin.Router);
    this.app.use("/donation", this.donation.Router);
    this.app.use("/event", this.event.Router);
    this.app.use("/hospital", this.hospital.Router);
    this.app.use("/partner", this.partner.Router);
    this.app.use("/post", this.post.Router);
    this.app.use("/staff", this.staff.Router);
  }
}