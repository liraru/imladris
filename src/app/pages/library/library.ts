import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LibraryDataDisplay } from './components/library-data-display/library-data-display';
import { LibrarySearch } from './components/library-search/library-search';
import { MODE } from './constants/library.consants';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

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
export class Library {
  private readonly _formBUilder = inject(FormBuilder);

  protected readonly MODE = MODE;
  protected readonly form = this._formBUilder.group({
    mode: new FormControl<MODE>(MODE.GALLERY),
  });

  protected readonly mode = computed(
    toSignal(this.form.get(FIELD.MODE)!.valueChanges.pipe(takeUntilDestroyed())),
  );
}
