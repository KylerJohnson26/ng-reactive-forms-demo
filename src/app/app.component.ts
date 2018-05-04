import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female', 'Elect not to identify'];
  signupForm: FormGroup;

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),  
      }),
      'gender': new FormControl('Elect not to identify'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit()
  {
    console.log(this.signupForm);
  }

  onAddHobby()
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

}
