import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user-i';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  regForm: FormGroup
  user: UserI = {}
  userSubmitted: boolean

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createRegisterationForm()
  }

  createRegisterationForm() {
    this.regForm =  this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      mobile: [1234567890, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidatior});
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
    {notmatched: true};
  }

  onSubmit() {
    console.log(this.regForm.value)
    console.log('userData', this.userData())
    this.userSubmitted = true
    if (this.regForm.valid) {
      this.authService.createUser(this.userData())
      this.regForm.reset()
      this.userSubmitted = false
      this.authService.onSuccess('User created successfully')
    } else {
      this.authService.onError('Something went wrong!')
    }
  }
   

  onSubmitToLocalStorage() {
    console.log(this.regForm.value)
    this.userSubmitted = true
    if (this.regForm.valid) {
      // this.user = Object.assign(this.user, this.regForm.value)
      this.userService.addUser(this.userData())   //stores user in localStorage
      this.regForm.reset()
      this.userSubmitted = false
      this.authService.onSuccess('User created successfully')
    } else {
      this.authService.onError('Something went wrong!')
    }
  }

  //leverages the getter methods below
  userData(): UserI {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

  onReset() {
    this.userSubmitted = false;
    this.regForm.reset();
  }

    
  get userName() {
    return this.regForm.get('userName') as FormControl;
  }

  get email() {
    return this.regForm.get('email') as FormControl;
  }
  get password() {
    return this.regForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.regForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.regForm.get('mobile') as FormControl;
  }
}
