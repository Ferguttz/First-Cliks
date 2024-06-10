import { Component, ElementRef, inject, ViewChild  } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../services/services';
import { RequestUserClientDto } from '../../../../services/models';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export default class SignupComponent {

  @ViewChild('firstNameInput') firstNameInput: ElementRef | undefined;
  @ViewChild('lastNameInput') lastNameInput: ElementRef | undefined;
  @ViewChild('userNameInput') userNameInput: ElementRef | undefined;
  @ViewChild('addressInput') addressInput: ElementRef | undefined;
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  @ViewChild('dateOfBirthInput') dateOfBirthInput: ElementRef | undefined;
  @ViewChild('phoneNumberInput') phoneNumberInput: ElementRef | undefined;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private accountService = inject(AuthenticationService);
  telfClosed = false;
  errors: string[] = [];

  

  form = this.fb.group({
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    dateOfBirth: ['', [Validators.required]],
    roleId: [0, [Validators.required]],
    address: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    photoRoute: [''],
    description: [''],
    phoneNumber: [null],
  });

  ngAfterViewInit() {
    if (this.firstNameInput) {
      this.firstNameInput.nativeElement.focus();
    }
  }
    // Autofocus
    formFieldsOrder = ['firstName', 'lastName', 'userName', 'address', 'email', 'password', 'dateOfBirth', 'address', 'roleId', 'gender'];

    goToNextInput(event: KeyboardEvent, currentInputName: string) {
      if (event.key === 'Enter') {
        const currentIndex = this.formFieldsOrder.indexOf(currentInputName);
        const nextIndex = currentIndex + 1;
  
        if (nextIndex < this.formFieldsOrder.length) {
          event.preventDefault();
          const nextInputName = this.formFieldsOrder[nextIndex];
          const nextInput = document.querySelector(`[formControlName="${nextInputName}"]`) as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    }


  

 

  signup() {
    console.log(this.form);
    if (this.form.invalid) {
      if (this.form.get('role')?.status == 'INVALID') {
        this.errors.push('No ha selecionado tipo de usuario TUTOR | ALUMNO');
      }
      return;
    }
    const formValue = this.form.value;
    this.accountService.register({ body: this.form!.value }).subscribe({
      next: (profile) => {
        this.router.navigate(['/auth/activate-account']);
      },
      error: (error) => {
        console.log(error);
        if (error.error.status === 400) {
          if (error.error.error) {
            this.errors = error.error.error;
          } else {
            this.errors = [error.error.detail];
          }
        }
      },
    });
  }

  mostrarInputTel(cambiar: boolean) {
    this.telfClosed = cambiar;

    if (cambiar) {
      this.form.controls['phoneNumber'].setValidators([
        Validators.required,
        Validators.pattern('[0-9]{9}'),
      ]);
    } else {
      this.form.controls['phoneNumber'].clearValidators();
    }
    this.form.controls['phoneNumber'].updateValueAndValidity();
    console.log(this.form);
  }
}
