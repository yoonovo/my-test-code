import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      id: new FormControl(''), pw: new FormControl('')
    });
  }

  login(){
    if (!this.signInForm.controls.id.value || !this.signInForm.controls.pw.value) {
      alert('필수값이 누락되었습니다.');
      return;
    }

    alert('로그인 되었습니다.')
  }
}
