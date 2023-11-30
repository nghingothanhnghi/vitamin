import { Component, OnInit } from '@angular/core';
import { MemberModel } from '@app/models/system/member.model';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.css']
})
export class LoginSuccessfulComponent implements OnInit {
  
  member: MemberModel = {} as MemberModel;

  constructor() { }

  ngOnInit(): void {
    this.member = JSON.parse(localStorage.getItem('member') || '{}');
  }
}
