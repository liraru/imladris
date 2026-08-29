import { Component, input, signal } from '@angular/core';
import { MODE } from '../../constants/library.consants';

@Component({
  imports: [],
  selector: 'app-library-data-display',
  styleUrl: './library-data-display.css',
  templateUrl: './library-data-display.html',
})
export class LibraryDataDisplay {
  public mode = input.required<MODE>();
  
  protected readonly MODE = MODE;
}
