import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav=[
    {
      name:"login",route:"login",icon:"account_circle"
    },
    {
      name:"Usuarios",route:"admin",icon:"supervisor_account"
    },
    {
      name:"Reglas",route:"reglas",icon:"assignment"
    }
    
  ]
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public authService:AuthService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {

    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

}
