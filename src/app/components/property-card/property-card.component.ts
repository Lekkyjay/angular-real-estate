import { Component, Input, OnInit } from '@angular/core';
import { PropertyI } from 'src/app/models/property-i';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: PropertyI;
  @Input() hideIcons: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
