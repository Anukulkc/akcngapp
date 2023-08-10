import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserService } from './services/akc.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AutocompleteDisplayExample } from './examples/autocomplete-display-example';

@Component({
  standalone: true,
  imports: [RouterModule,NxWelcomeComponent, AutocompleteDisplayExample ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'akcngapp';

  private _ngUnsubscribe = new Subject<void>();

  constructor(private _user: UserService) {}
 

  ngOnInit(): void {
    this._user.getUsersData().
    pipe(
      takeUntil(this._ngUnsubscribe)
    ).subscribe((user) => console.log(user));
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
