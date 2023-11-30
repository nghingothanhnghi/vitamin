import { Component, OnInit } from '@angular/core';
import { MemberConstants } from '@app/common/constant/member.constant';

@Component({
  selector: 'hp-about',
  templateUrl: './hp-about.component.html',
  styleUrls: ['./hp-about.component.css']
})
export class HpAboutComponent implements OnInit {

  linkMyOffice : String = MemberConstants.URL_MYOFFICE;

  constructor() { }

  ngOnInit(): void {
  }

}
