import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female', 'Elect not to identify'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUsernamesValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailValidator),  
      }),
      'gender': new FormControl('Elect not to identify'),
      'hobbies': new FormArray([])
    });
    // set values of form programmatically
    this.signupForm.setValue({
      'userData': {
        'username': 'Kyler',
        'email': 'k@k.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    // set only specific values programatically
    this.signupForm.patchValue({
      'userData': {
        'username': 'KJ'
      }
    });
  }

  onSubmit()
  {
    console.log(this.signupForm);
    this.signupForm.reset({
      'userData': {
        'username': '',
        'email': ''
      },
      'gender': 'Elect not to identify',
      'hobbies': []
    })
  }

  onAddHobby()
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenUsernamesValidator(control: FormControl) : { [s: string]: boolean }
  {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1)
      return { 'nameIsForbidden': true };
    return null;
  }

  forbiddenEmailValidator(control: FormControl) : Promise<any> | Observable<any>
  {
    const promise = new Promise<any>( (resolve, reject) => {
      // set timeout to simulate call to a server
      setTimeout( () => {
        if(control.value === 'test@test.com')
          resolve({ 'emailIsForbidden': true });
        resolve(null);
      }, 1500);
    });
    
    return promise;
  }

}
