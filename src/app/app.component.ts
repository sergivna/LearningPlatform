import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/http/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LearningPlatform';

  constructor(
    private readonly authService: AuthService)
  { }

  ngOnInit() {
    console.log("app.ts");
     this.authService.fetchToken();
  }
}
