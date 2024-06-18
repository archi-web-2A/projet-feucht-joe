import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomInputComponent } from "../../shared/components/custom-input/custom-input.component";
import { UserService } from "../../core/services/user.service";
import { User } from "../../shared/models/user";

@Component({
  selector: 'app-sign-forms',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    CustomInputComponent,
  ],
  templateUrl: './sign-forms.component.html',
  styleUrls: ['./sign-forms.component.css']
})
export class SignFormsComponent {
  showSignupFailureMessage = false;
  signupFailureMessage = '';

  showSigninFailureMessage = false;
  signinFailureMessage = '';

  constructor(private router: Router, private userService: UserService) {}

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("(0|\\+33|0033)[1-9][0-9]{8}")]),
    gender: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
  });

  passwordMatchValidator(): boolean {
    return this.signupForm.controls.password.value === this.signupForm.controls.passwordConfirmation.value;
  }

  onSubmitSignup() {
    this.markFormGroupDirty(this.signupForm);

    if (this.signupForm.valid && this.passwordMatchValidator()) {
      this.showSignupFailureMessage = false;
      let user = this.convertFormGroupToUser(this.signupForm);
      this.userService.createUser(user).subscribe(
        () => {
          this.router.navigate(['/signup-validation']);
        },
        (error) => {
          this.showSignupFailureMessage = true;
          this.signupFailureMessage = error.error.message;
        }
      );
    } else {
      this.showSignupFailureMessage = true;
      this.signupFailureMessage = this.generateErrorMessage();
    }
  }

  generateErrorMessage(): string {
    let failureMessage = 'Champ(s) invalide(s)';
    const formControls = this.signupForm.controls;

    if (!formControls.phoneNumber.valid) {
      failureMessage = 'Format du numéro de téléphone invalide';
    }

    if (!this.passwordMatchValidator()) {
      failureMessage = 'Les mots de passe ne correspondent pas';
    }

    if (!formControls.postalCode.valid) {
      failureMessage = 'Format du code postal invalide (5 chiffres)';
    }
    return failureMessage;
  }

  convertFormGroupToUser(form: FormGroup): User {
    return {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      gender: form.value.gender,
      birthDate: form.value.birthDate,
      location: form.value.location,
      city: form.value.city,
      postalCode: form.value.postalCode,
      password: form.value.password,
    }
  }

  markFormGroupDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.markFormGroupDirty(control);
      }
    });
  }

  get signinInfo() {
    return this.signinForm.controls;
  }

  get signupInfo() {
    return this.signupForm.controls;
  }

  onSubmitSignin() {
    if (this.signinForm.valid) {
      this.showSigninFailureMessage = false;
      const email = this.signinForm.get('email')?.value as string;
      const password = this.signinForm.get('password')?.value as string;

      const credentials = { email, password };

      this.userService.loginUser(credentials).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.showSigninFailureMessage = true;
          this.signinFailureMessage = error.error.message;
        }
      );
    }
  }
}
