import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { LibraryDataDisplay } from './components/library-data-display/library-data-display';
import { LibrarySearch } from './components/library-search/library-search';
import { MODE } from './constants/library.consants';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BookService } from '../../services/book.service';
import { Book } from '@shared/models';
import { from } from 'rxjs/internal/observable/from';

enum FIELD {
  MODE = 'mode',
}

@Component({
  imports: [LibraryDataDisplay, LibrarySearch],
  selector: 'app-library',
  styleUrl: './library.css',
  templateUrl: './library.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library implements OnInit {
  private readonly _formBUilder = inject(FormBuilder);
  private readonly _bookSrv = inject(BookService);

  protected readonly MODE = MODE;
  protected readonly form = this._formBUilder.group({
    mode: new FormControl<MODE>(MODE.GALLERY),
  });
  protected readonly mode = toSignal(
    this.form.get(FIELD.MODE)!.valueChanges.pipe(takeUntilDestroyed()),
    {
      initialValue: MODE.GALLERY,
    },
  );

  protected data = signal<Book[]>([]);

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData() {
    from(this._bookSrv.getAll()).subscribe({
      next: (result) => {
        this.data.set(result);
        console.log(result);
      },
    });
  }
}
