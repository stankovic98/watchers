import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { passwordsMismatch: true };
  };

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: this.checkPasswords }
  );
  constructor() {}

  ngOnInit(): void {}

  register() {
    console.log(this.registerForm);
  }
}
