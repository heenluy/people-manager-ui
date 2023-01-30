import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  form: FormGroup;

  constructor (private fb: FormBuilder, private route: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(`Email: ${ this.form.value['email'] }`);
    console.log(`Senha: ${ this.form.value['password'] }`);
    this.route.navigateByUrl('/dashboard');
  }
}
