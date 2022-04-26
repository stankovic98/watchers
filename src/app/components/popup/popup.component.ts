import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input('title') title: string;
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  stopPropagation(e: Event): void {
    e.stopPropagation();
  }

  closePopup(): void {
    this.closeEvent.emit();
  }
}
