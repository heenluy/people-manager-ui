import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
  ) 
  {
    this.form = this.fb.group({
      email: ['developer@account.dev', Validators.required],
      password: ['developer', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getHealth();
  }

  login() {
    this.authService.login(this.form.value['email'], this.form.value['password'])
      .subscribe(() => this.route.navigateByUrl('/dashboard'));
  }
}
