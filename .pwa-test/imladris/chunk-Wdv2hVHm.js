import{$ as Fc,$n as Y,Aa as zl,Ar as de,Bi as rb,Bn as W$1,Bt as Me,Ca as z,Ci as mp,Ct as Kg,Da as z_,Di as nd,E as CA,Ei as nb,Et as L,Fi as pn,G as Eh,Gi as si,Hi as ri,I as De,Ir as f,It as M,Ji as st,Jr as hb,L as Dh,Li as pr,Ln as Vg,M as D,Ma as zt$1,Mr as dt,Mt as Le,Nt as Lg,Pi as pe,Pn as Us,Pr as eb,Qt as Os,Rn as Vp,Rr as fn,St as Ke,T as C$1,Tr as ce,Ui as sA,Un as WM,V as E,Vr as g,Wr as go,Wt as N6,Xt as Oe,Y as F,Yn as Xg,Yr as he,Zr as hn,Zt as On$1,_i as mC,ai as jx,an as Q$1,bi as me,br as bh,ci as ke$1,cn as Qi,d as Ae,di as ks,dt as I,ei as ie$1,et as Fe,f as As,g as B,gt as Je$1,hn as S0,hr as ar,ia as ur,in as Pq,it as Gt$1,j as Ct,jn as UN,k as Ch,ka as ze,ki as no,kn as U,li as kn,ln as Qr,lr as Zl,lt as Hs,ma as x6,mi as li,mn as Re,mr as ae$1,n as $N,ni as je,oi as k,or as ZN,p as At,qi as sr,qt as Np,ra as un,rn as Pp,rt as GD,st as He,t as $,ta as to,ur as _c,ut as Ht,vn as Se,w as Bt,yr as be,z as Dr,zn as Vt}from"./chunk-DHt8gz8m.js";import{E as Yn,T as Rn,b as l,y as d}from"./main-MATDT4A4.js";var zt=`
  *,
  editorial:editorials(*),
  serie:book_series(*, editorial:editorials(*)),
  book_authors(author:authors(*)),
  book_genres(genre)
`;function qt(n){let r=n.editorial,e=n.serie;return{id:n.id,title:n.title,authors:(n.book_authors??[]).map(({author:a})=>({id:a.id,name:a.name,country:a.country,notes:a.notes??void 0})),readingStatus:n.reading_status,releaseDate:n.release_date?n.release_date:void 0,coverImageUrl:n.cover_image_url??void 0,adquisitionDate:n.adquisition_date?n.adquisition_date:void 0,startDate:n.start_date?n.start_date:void 0,finishDate:n.finish_date?n.finish_date:void 0,notes:n.notes??void 0,language:n.language,editorial:{id:r.id,name:r.name,country:r.country,website:r.website??void 0,logo:r.logo??void 0},serie:e!=null?{id:e.id,title:e.title,editorial:{id:e.editorial.id,name:e.editorial.name,country:e.editorial.country,website:e.editorial.website??void 0,logo:e.editorial.logo??void 0}}:void 0,serieVolume:n.serie_volume??void 0,genres:(n.book_genres??[]).map(({genre:a})=>a)}}function Ce(n){if(!n)return null;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`}function jt(n){let r={};return n.title!==void 0&&(r.title=n.title),n.readingStatus!==void 0&&(r.reading_status=n.readingStatus),n.releaseDate!==void 0&&(r.release_date=Ce(n.releaseDate)),n.coverImageUrl!==void 0&&(r.cover_image_url=n.coverImageUrl??null),n.adquisitionDate!==void 0&&(r.adquisition_date=Ce(n.adquisitionDate)),n.startDate!==void 0&&(r.start_date=Ce(n.startDate)),n.finishDate!==void 0&&(r.finish_date=Ce(n.finishDate)),n.notes!==void 0&&(r.notes=n.notes??null),n.language!==void 0&&(r.language=n.language),n.editorialId!==void 0&&(r.editorial_id=n.editorialId),n.serieId!==void 0&&(r.serie_id=n.serieId??null),n.serieVolume!==void 0&&(r.serie_volume=n.serieVolume??null),r}var Kt=class n{supabase=f(Rn).client;table=`books`;async getAll(){let{data:r,error:e}=await this.supabase.from(this.table).select(zt).order(`title`);if(e)throw e;return(r??[]).map(a=>qt(a))}async getById(r){let{data:e,error:a}=await this.supabase.from(this.table).select(zt).eq(`id`,r).maybeSingle();if(a)throw a;return e?qt(e):null}async create(r){let{data:e,error:a}=await this.supabase.from(this.table).insert(jt(r)).select(`id`).single();if(a)throw a;let t=e.id;await this.syncAuthors(t,r.authorIds),await this.syncGenres(t,r.genres);let i=await this.getById(t);if(!i)throw new Error(`No se pudo recuperar el libro recién creado.`);return i}async update(r,e){let a=jt(e);if(Object.keys(a).length>0){let{error:i}=await this.supabase.from(this.table).update(a).eq(`id`,r);if(i)throw i}e.authorIds!==void 0&&await this.syncAuthors(r,e.authorIds),e.genres!==void 0&&await this.syncGenres(r,e.genres);let t=await this.getById(r);if(!t)throw new Error(`No se pudo recuperar el libro actualizado.`);return t}async remove(r){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,r);if(e)throw e}async syncAuthors(r,e){let{error:a}=await this.supabase.from(`book_authors`).delete().eq(`book_id`,r);if(a)throw a;if(e.length===0)return;let{error:t}=await this.supabase.from(`book_authors`).insert(e.map(i=>({book_id:r,author_id:i})));if(t)throw t}async syncGenres(r,e){let{error:a}=await this.supabase.from(`book_genres`).delete().eq(`book_id`,r);if(a)throw a;if(e.length===0)return;let{error:t}=await this.supabase.from(`book_genres`).insert(e.map(i=>({book_id:r,genre:i})));if(t)throw t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};var We=`
  *,
  editorial:editorials(*),
  manga_volume_authors(author:authors(*))
`;function Qe(n){let r=n.editorial;return{id:n.id,title:n.title,authors:(n.manga_volume_authors??[]).map(({author:e})=>({id:e.id,name:e.name,country:e.country,notes:e.notes??void 0})),mangaId:n.manga_id,volumeNumber:n.volume_number??void 0,readingStatus:n.reading_status,releaseDate:n.release_date?n.release_date:void 0,coverImageUrl:n.cover_image_url??void 0,adquisitionDate:n.adquisition_date?n.adquisition_date:void 0,startDate:n.start_date?n.start_date:void 0,finishDate:n.finish_date?n.finish_date:void 0,notes:n.notes??void 0,language:n.language,editorial:{id:r.id,name:r.name,country:r.country,website:r.website??void 0,logo:r.logo??void 0}}}function we(n){if(!n)return null;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`}function Qt(n){let r={};return n.title!==void 0&&(r.title=n.title),n.mangaId!==void 0&&(r.manga_id=n.mangaId),n.volumeNumber!==void 0&&(r.volume_number=n.volumeNumber),n.readingStatus!==void 0&&(r.reading_status=n.readingStatus),n.releaseDate!==void 0&&(r.release_date=we(n.releaseDate)),n.coverImageUrl!==void 0&&(r.cover_image_url=n.coverImageUrl??null),n.adquisitionDate!==void 0&&(r.adquisition_date=we(n.adquisitionDate)),n.startDate!==void 0&&(r.start_date=we(n.startDate)),n.finishDate!==void 0&&(r.finish_date=we(n.finishDate)),n.notes!==void 0&&(r.notes=n.notes??null),n.language!==void 0&&(r.language=n.language),n.editorialId!==void 0&&(r.editorial_id=n.editorialId),r}var Ut=class n{supabase=f(Rn).client;table=`manga_volumes`;async getAll(){let{data:r,error:e}=await this.supabase.from(this.table).select(We).order(`manga_id`).order(`volume_number`);if(e)throw e;return(r??[]).map(a=>Qe(a))}async getByManga(r){let{data:e,error:a}=await this.supabase.from(this.table).select(We).eq(`manga_id`,r).order(`volume_number`);if(a)throw a;return(e??[]).map(t=>Qe(t))}async getById(r){let{data:e,error:a}=await this.supabase.from(this.table).select(We).eq(`id`,r).maybeSingle();if(a)throw a;return e?Qe(e):null}async create(r){let{data:e,error:a}=await this.supabase.from(this.table).insert(Qt(r)).select(`id`).single();if(a)throw a;let t=e.id;await this.syncAuthors(t,r.authorIds);let i=await this.getById(t);if(!i)throw new Error(`No se pudo recuperar el tomo recién creado.`);return i}async update(r,e){let a=Qt(e);if(Object.keys(a).length>0){let{error:i}=await this.supabase.from(this.table).update(a).eq(`id`,r);if(i)throw i}e.authorIds!==void 0&&await this.syncAuthors(r,e.authorIds);let t=await this.getById(r);if(!t)throw new Error(`No se pudo recuperar el tomo actualizado.`);return t}async remove(r){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,r);if(e)throw e}async syncAuthors(r,e){let{error:a}=await this.supabase.from(`manga_volume_authors`).delete().eq(`manga_volume_id`,r);if(a)throw a;if(e.length===0)return;let{error:t}=await this.supabase.from(`manga_volume_authors`).insert(e.map(i=>({manga_volume_id:r,author_id:i})));if(t)throw t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};function pa(n,r){return this._trackRow(r)}var aa=(n,r)=>r.id;function ma(n,r){if(n&1&&(Bt(0,`tr`,0)(1,`td`,3),Eh(2),Ht()()),n&2){let e=On$1();me(),bh(`padding-top`,e._cellPadding)(`padding-bottom`,e._cellPadding),Fe(`colspan`,e.numCols),me(),Ch(` `,e.label,` `)}}function _a(n,r){if(n&1&&(Bt(0,`td`,3),Eh(1),Ht()),n&2){let e=On$1(2);bh(`padding-top`,e._cellPadding)(`padding-bottom`,e._cellPadding),Fe(`colspan`,e._firstRowOffset),me(),Ch(` `,e._firstRowOffset>=e.labelMinRequiredCells?e.label:``,` `)}}function ga(n,r){if(n&1){let e=ZN();Bt(0,`td`,6)(1,`button`,7),z_(`click`,function(t){let i=Lg(e).$implicit;return Vg(On$1(2)._cellClicked(i,t))})(`focus`,function(t){let i=Lg(e).$implicit;return Vg(On$1(2)._emitActiveDateChange(i,t))}),Bt(2,`span`,8),Eh(3),Ht(),Ct(4,`span`,9),Ht()()}if(n&2){let e=r.$implicit,a=r.$index,t=On$1().$index,i=On$1();bh(`width`,i._cellWidth)(`padding-top`,i._cellPadding)(`padding-bottom`,i._cellPadding),Fe(`data-mat-row`,t)(`data-mat-col`,a),me(),Dh(e.cssClasses),de(`mat-calendar-body-disabled`,!e.enabled)(`mat-calendar-body-active`,i._isActiveCell(t,a))(`mat-calendar-body-range-start`,i._isRangeStart(e.compareValue))(`mat-calendar-body-range-end`,i._isRangeEnd(e.compareValue))(`mat-calendar-body-in-range`,i._isInRange(e.compareValue))(`mat-calendar-body-comparison-bridge-start`,i._isComparisonBridgeStart(e.compareValue,t,a))(`mat-calendar-body-comparison-bridge-end`,i._isComparisonBridgeEnd(e.compareValue,t,a))(`mat-calendar-body-comparison-start`,i._isComparisonStart(e.compareValue))(`mat-calendar-body-comparison-end`,i._isComparisonEnd(e.compareValue))(`mat-calendar-body-in-comparison-range`,i._isInComparisonRange(e.compareValue))(`mat-calendar-body-preview-start`,i._isPreviewStart(e.compareValue))(`mat-calendar-body-preview-end`,i._isPreviewEnd(e.compareValue))(`mat-calendar-body-in-preview`,i._isInPreview(e.compareValue)),hn(`tabIndex`,i._isActiveCell(t,a)?0:-1),Fe(`aria-label`,e.ariaLabel)(`aria-disabled`,!e.enabled||null)(`aria-pressed`,i._isSelected(e.compareValue))(`aria-current`,i.todayValue===e.compareValue?`date`:null)(`aria-describedby`,i._getDescribedby(e.compareValue)),me(),de(`mat-calendar-body-selected`,i._isSelected(e.compareValue))(`mat-calendar-body-comparison-identical`,i._isComparisonIdentical(e.compareValue))(`mat-calendar-body-today`,i.todayValue===e.compareValue),me(),Ch(` `,e.displayValue,` `)}}function fa(n,r){if(n&1&&(Bt(0,`tr`,1),Me(1,_a,2,6,`td`,4),UN(2,ga,5,49,`td`,5,aa),Ht()),n&2){let e=r.$implicit,a=r.$index,t=On$1();me(),Ae(a===0&&t._firstRowOffset?1:-1),me(),$N(e)}}function ba(n,r){if(n&1&&(Se(0,`th`,2)(1,`span`,6),Eh(2),Re(),Se(3,`span`,3),Eh(4),Re()()),n&2){let e=r.$implicit;me(2),Zl(e.long),me(2),Zl(e.narrow)}}var Da=[`*`];function va(n,r){}function ya(n,r){if(n&1){let e=ZN();Se(0,`mat-month-view`,4),rb(`activeDateChange`,function(t){Lg(e);let i=On$1();return S0(i.activeDate,t)||(i.activeDate=t),Vg(t)}),dt(`_userSelection`,function(t){Lg(e);return Vg(On$1()._dateSelected(t))})(`dragStarted`,function(t){Lg(e);return Vg(On$1()._dragStarted(t))})(`dragEnded`,function(t){Lg(e);return Vg(On$1()._dragEnded(t))}),Re()}if(n&2){let e=On$1();nb(`activeDate`,e.activeDate),sr(`selected`,e.selected)(`dateFilter`,e.dateFilter)(`maxDate`,e.maxDate)(`minDate`,e.minDate)(`dateClass`,e.dateClass)(`comparisonStart`,e.comparisonStart)(`comparisonEnd`,e.comparisonEnd)(`startDateAccessibleName`,e.startDateAccessibleName)(`endDateAccessibleName`,e.endDateAccessibleName)(`activeDrag`,e._activeDrag)}}function Ca(n,r){if(n&1){let e=ZN();Se(0,`mat-year-view`,5),rb(`activeDateChange`,function(t){Lg(e);let i=On$1();return S0(i.activeDate,t)||(i.activeDate=t),Vg(t)}),dt(`monthSelected`,function(t){Lg(e);return Vg(On$1()._monthSelectedInYearView(t))})(`selectedChange`,function(t){Lg(e);return Vg(On$1()._goToDateInView(t,`month`))}),Re()}if(n&2){let e=On$1();nb(`activeDate`,e.activeDate),sr(`selected`,e.selected)(`dateFilter`,e.dateFilter)(`maxDate`,e.maxDate)(`minDate`,e.minDate)(`dateClass`,e.dateClass)}}function wa(n,r){if(n&1){let e=ZN();Se(0,`mat-multi-year-view`,6),rb(`activeDateChange`,function(t){Lg(e);let i=On$1();return S0(i.activeDate,t)||(i.activeDate=t),Vg(t)}),dt(`yearSelected`,function(t){Lg(e);return Vg(On$1()._yearSelectedInMultiYearView(t))})(`selectedChange`,function(t){Lg(e);return Vg(On$1()._goToDateInView(t,`year`))}),Re()}if(n&2){let e=On$1();nb(`activeDate`,e.activeDate),sr(`selected`,e.selected)(`dateFilter`,e.dateFilter)(`maxDate`,e.maxDate)(`minDate`,e.minDate)(`dateClass`,e.dateClass)}}function ka(n,r){}var Aa=[`button`];var Sa=[[[``,`matDatepickerToggleIcon`,``]]];var Ma=[`[matDatepickerToggleIcon]`];function Va(n,r){n&1&&(Kg(),Se(0,`svg`,2),Qr(1,`path`,3),Re())}var Q=(()=>{class n{changes=new D;calendarLabel=`Calendar`;openCalendarLabel=`Open calendar`;closeCalendarLabel=`Close calendar`;prevMonthLabel=`Previous month`;nextMonthLabel=`Next month`;prevYearLabel=`Previous year`;nextYearLabel=`Next year`;prevMultiYearLabel=`Previous 24 years`;nextMultiYearLabel=`Next 24 years`;switchToMonthViewLabel=`Choose date`;switchToMultiYearViewLabel=`Choose month and year`;startDateLabel=`Start date`;endDateLabel=`End date`;comparisonDateLabel=`Comparison range`;formatYearRange(e,a){return`${e} \u2013 ${a}`}formatYearRangeLabel(e,a){return`${e} to ${a}`}static ɵfac=function(a){return new(a||n)};static ɵprov=E({token:n,factory:n.ɵfac})}return n})();var Ea=0;var ie=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=Ea++;cssClasses;constructor(r,e,a,t,i,s=r,_){this.value=r,this.displayValue=e,this.ariaLabel=a,this.enabled=t,this.compareValue=s,this.rawValue=_,this.cssClasses=i instanceof Set?Array.from(i):i}};var Ia={passive:!1,capture:!0};var ke={passive:!0,capture:!0};var $t={passive:!0};var W=(()=>{class n{_elementRef=f(L);_ngZone=f(C$1);_platform=f(Y);_intl=f(Q);_eventCleanups;_skipNextFocus=!1;_focusActiveCellAfterViewChecked=!1;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=!1)}isRange=!1;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new U;previewChange=new U;activeDateChange=new U;dragStarted=new U;dragEnded=new U;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=!1;_injector=f(F);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=f(ce),a=f(ze);this._startDateLabelId=a.getId(`mat-calendar-body-start-`),this._endDateLabelId=a.getId(`mat-calendar-body-end-`),this._comparisonStartDateLabelId=a.getId(`mat-calendar-body-comparison-start-`),this._comparisonEndDateLabelId=a.getId(`mat-calendar-body-comparison-end-`),f(st).load(GD),this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,i=[e.listen(t,`touchmove`,this._touchmoveHandler,Ia),e.listen(t,`mouseenter`,this._enterHandler,ke),e.listen(t,`focus`,this._enterHandler,ke),e.listen(t,`mouseleave`,this._leaveHandler,ke),e.listen(t,`blur`,this._leaveHandler,ke),e.listen(t,`mousedown`,this._mousedownHandler,$t),e.listen(t,`touchstart`,this._mousedownHandler,$t)];this._platform.isBrowser&&i.push(e.listen(`window`,`mouseup`,this._mouseupHandler),e.listen(`window`,`touchend`,this._touchendHandler)),this._eventCleanups=i})}_cellClicked(e,a){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:a})}_emitActiveDateChange(e,a){e.enabled&&this.activeDateChange.emit({value:e.value,event:a})}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let a=e.numCols,{rows:t,numCols:i}=this;(e.rows||a)&&(this._firstRowOffset=t&&t.length&&t[0].length?i-t[0].length:0),(e.cellAspectRatio||a||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/i}%`),(a||!this._cellWidth)&&(this._cellWidth=`${100/i}%`)}ngOnDestroy(){this._eventCleanups.forEach(e=>e())}_isActiveCell(e,a){let t=e*this.numCols+a;return e&&(t-=this._firstRowOffset),t==this.activeCell}_focusActiveCell(e=!0){un(()=>{setTimeout(()=>{let a=this._elementRef.nativeElement.querySelector(`.mat-calendar-body-active`);a&&(e||(this._skipNextFocus=!0),a.focus())})},{injector:this._injector})}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=!0}_isRangeStart(e){return Ge(e,this.startValue,this.endValue)}_isRangeEnd(e){return Xe(e,this.startValue,this.endValue)}_isInRange(e){return Ze(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return Ge(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,a,t){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return!1;let i=this.rows[a][t-1];if(!i){let s=this.rows[a-1];i=s&&s[s.length-1]}return i&&!this._isRangeEnd(i.compareValue)}_isComparisonBridgeEnd(e,a,t){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return!1;let i=this.rows[a][t+1];if(!i){let s=this.rows[a+1];i=s&&s[0]}return i&&!this._isRangeStart(i.compareValue)}_isComparisonEnd(e){return Xe(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return Ze(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return Ge(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return Xe(e,this.previewStart,this.previewEnd)}_isInPreview(e){return Ze(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return`${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return`${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type===`focus`){this._skipNextFocus=!1;return}if(e.target&&this.isRange){let a=this._getCellFromElement(e.target);a&&this._ngZone.run(()=>this.previewChange.emit({value:a.enabled?a:null,event:e}))}};_touchmoveHandler=e=>{if(!this.isRange)return;let a=Gt(e),t=a?this._getCellFromElement(a):null;a!==e.target&&(this._didDragSinceMouseDown=!0),$e(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:t?.enabled?t:null,event:e}))};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!==`blur`&&(this._didDragSinceMouseDown=!0),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})))};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=!1;let a=e.target&&this._getCellFromElement(e.target);!a||!this._isInRange(a.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:a.rawValue,event:e})})};_mouseupHandler=e=>{if(!this.isRange)return;let a=$e(e.target);if(!a){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e})});return}a.closest(`.mat-calendar-body`)===this._elementRef.nativeElement&&this._ngZone.run(()=>{let t=this._getCellFromElement(a);this.dragEnded.emit({value:t?.rawValue??null,event:e})})};_touchendHandler=e=>{let a=Gt(e);a&&this._mouseupHandler({target:a})};_getCellFromElement(e){let a=$e(e);if(a){let t=a.getAttribute(`data-mat-row`),i=a.getAttribute(`data-mat-col`);if(t&&i)return this.rows[parseInt(t)]?.[parseInt(i)]||null}return null}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[``,`mat-calendar-body`,``]],hostAttrs:[1,`mat-calendar-body`],inputs:{label:`label`,rows:`rows`,todayValue:`todayValue`,startValue:`startValue`,endValue:`endValue`,labelMinRequiredCells:`labelMinRequiredCells`,numCols:`numCols`,activeCell:`activeCell`,isRange:`isRange`,cellAspectRatio:`cellAspectRatio`,comparisonStart:`comparisonStart`,comparisonEnd:`comparisonEnd`,previewStart:`previewStart`,previewEnd:`previewEnd`,startDateAccessibleName:`startDateAccessibleName`,endDateAccessibleName:`endDateAccessibleName`},outputs:{selectedValueChange:`selectedValueChange`,previewChange:`previewChange`,activeDateChange:`activeDateChange`,dragStarted:`dragStarted`,dragEnded:`dragEnded`},exportAs:[`matCalendarBody`],features:[Le],decls:11,vars:11,consts:[[`aria-hidden`,`true`],[`role`,`row`],[1,`mat-calendar-body-hidden-label`,3,`id`],[1,`mat-calendar-body-label`],[1,`mat-calendar-body-label`,3,`paddingTop`,`paddingBottom`],[`role`,`gridcell`,1,`mat-calendar-body-cell-container`,3,`width`,`paddingTop`,`paddingBottom`],[`role`,`gridcell`,1,`mat-calendar-body-cell-container`],[`type`,`button`,1,`mat-calendar-body-cell`,3,`click`,`focus`,`tabindex`],[1,`mat-calendar-body-cell-content`,`mat-focus-indicator`],[`aria-hidden`,`true`,1,`mat-calendar-body-cell-preview`]],template:function(a,t){a&1&&(Me(0,ma,3,6,`tr`,0),UN(1,fa,4,1,`tr`,1,pa,!0),Bt(3,`span`,2),Eh(4),Ht(),Bt(5,`span`,2),Eh(6),Ht(),Bt(7,`span`,2),Eh(8),Ht(),Bt(9,`span`,2),Eh(10),Ht()),a&2&&(Ae(t._firstRowOffset<t.labelMinRequiredCells?0:-1),me(),$N(t.rows),me(2),hn(`id`,t._startDateLabelId),me(),Ch(` `,t.startDateAccessibleName,`
`),me(),hn(`id`,t._endDateLabelId),me(),Ch(` `,t.endDateAccessibleName,`
`),me(),hn(`id`,t._comparisonStartDateLabelId),me(),eb(` `,t.comparisonDateAccessibleName,` `,t.startDateAccessibleName,`
`),me(),hn(`id`,t._comparisonEndDateLabelId),me(),eb(` `,t.comparisonDateAccessibleName,` `,t.endDateAccessibleName,`
`))},styles:[`.mat-calendar-body {
  min-width: 224px;
}

.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--%NS%mat-datepicker-calendar-date-today-outline-color, var(--%NS%mat-sys-primary));
}

.mat-calendar-body-label {
  height: 0;
  line-height: 0;
  text-align: start;
  padding-left: 4.7142857143%;
  padding-right: 4.7142857143%;
  font-size: var(--%NS%mat-datepicker-calendar-body-label-text-size, var(--%NS%mat-sys-title-small-size));
  font-weight: var(--%NS%mat-datepicker-calendar-body-label-text-weight, var(--%NS%mat-sys-title-small-weight));
  color: var(--%NS%mat-datepicker-calendar-body-label-text-color, var(--%NS%mat-sys-on-surface));
}

.mat-calendar-body-hidden-label {
  display: none;
}

.mat-calendar-body-cell-container {
  position: relative;
  height: 0;
  line-height: 0;
}

.mat-calendar-body-cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  text-align: center;
  outline: none;
  margin: 0;
  font-family: var(--%NS%mat-datepicker-calendar-text-font, var(--%NS%mat-sys-body-medium-font));
  font-size: var(--%NS%mat-datepicker-calendar-text-size, var(--%NS%mat-sys-body-medium-size));
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-calendar-body-cell::-moz-focus-inner {
  border: 0;
}

.mat-calendar-body-cell::before,
.mat-calendar-body-cell::after,
.mat-calendar-body-cell-preview {
  content: "";
  position: absolute;
  top: 5%;
  left: 0;
  z-index: 0;
  box-sizing: border-box;
  display: block;
  height: 90%;
  width: 100%;
}

.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-start::after,
.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
.mat-calendar-body-comparison-start::after,
.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 5%;
  width: 95%;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
[dir=rtl] .mat-calendar-body-comparison-start::after,
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 0;
  border-radius: 0;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
.mat-calendar-body-comparison-end::after,
.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
[dir=rtl] .mat-calendar-body-comparison-end::after,
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  left: 5%;
  border-radius: 0;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {
  width: 90%;
}

.mat-calendar-body-in-preview {
  color: var(--%NS%mat-datepicker-calendar-date-preview-state-outline-color, var(--%NS%mat-sys-primary));
}
.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {
  border-top: dashed 1px;
  border-bottom: dashed 1px;
}

.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: 0;
  border-right: dashed 1px;
}

.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: 0;
  border-left: dashed 1px;
}

.mat-calendar-body-disabled {
  cursor: default;
}
.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  color: var(--%NS%mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--%NS%mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-calendar-body-disabled {
    opacity: 0.5;
  }
}

.mat-calendar-body-cell-content {
  top: 5%;
  left: 5%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  border-radius: 999px;
  color: var(--%NS%mat-datepicker-calendar-date-text-color, var(--%NS%mat-sys-on-surface));
  border-color: var(--%NS%mat-datepicker-calendar-date-outline-color, transparent);
}
.mat-calendar-body-cell-content.mat-focus-indicator {
  position: absolute;
}
.mat-calendar-body-cell-content::before {
  border-radius: 50%;
}
@media (forced-colors: active) {
  .mat-calendar-body-cell-content {
    border: none;
  }
}

.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  background-color: var(--%NS%mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
}

@media (hover: hover) {
  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
    background-color: var(--%NS%mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
  }
}
.mat-calendar-body-selected {
  background-color: var(--%NS%mat-datepicker-calendar-date-selected-state-background-color, var(--%NS%mat-sys-primary));
  color: var(--%NS%mat-datepicker-calendar-date-selected-state-text-color, var(--%NS%mat-sys-on-primary));
}
.mat-calendar-body-disabled > .mat-calendar-body-selected {
  background-color: var(--%NS%mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-selected.mat-calendar-body-today {
  box-shadow: inset 0 0 0 1px var(--%NS%mat-datepicker-calendar-date-today-selected-state-outline-color, var(--%NS%mat-sys-primary));
}

.mat-calendar-body-in-range::before {
  background: var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-bridge-start::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {
  background: linear-gradient(to right, var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container)) 50%, var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-comparison-bridge-end::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {
  background: linear-gradient(to left, var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container)) 50%, var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {
  background: var(--%NS%mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--%NS%mat-sys-secondary-container));
}

.mat-calendar-body-comparison-identical.mat-calendar-body-selected,
.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {
  background: var(--%NS%mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--%NS%mat-sys-secondary));
}

@media (forced-colors: active) {
  .mat-datepicker-popup:not(:empty),
  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {
    outline: solid 1px;
  }
  .mat-calendar-body-today {
    outline: dotted 1px;
  }
  .mat-calendar-body-cell::before,
  .mat-calendar-body-cell::after,
  .mat-calendar-body-selected {
    background: none;
  }
  .mat-calendar-body-in-range::before,
  .mat-calendar-body-comparison-bridge-start::before,
  .mat-calendar-body-comparison-bridge-end::before {
    border-top: solid 1px;
    border-bottom: solid 1px;
  }
  .mat-calendar-body-range-start::before {
    border-left: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-start::before {
    border-left: 0;
    border-right: solid 1px;
  }
  .mat-calendar-body-range-end::before {
    border-right: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-end::before {
    border-right: 0;
    border-left: solid 1px;
  }
  .mat-calendar-body-in-comparison-range::before {
    border-top: dashed 1px;
    border-bottom: dashed 1px;
  }
  .mat-calendar-body-comparison-start::before {
    border-left: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-start::before {
    border-left: 0;
    border-right: dashed 1px;
  }
  .mat-calendar-body-comparison-end::before {
    border-right: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-end::before {
    border-right: 0;
    border-left: dashed 1px;
  }
}
`],encapsulation:2})}return n})();function Ue(n){return n?.nodeName===`TD`}function $e(n){let r;return Ue(n)?r=n:Ue(n.parentNode)?r=n.parentNode:Ue(n.parentNode?.parentNode)&&(r=n.parentNode.parentNode),r?.getAttribute(`data-mat-row`)!=null?r:null}function Ge(n,r,e){return e!==null&&r!==e&&n<e&&n===r}function Xe(n,r,e){return r!==null&&r!==e&&n>=r&&n===e}function Ze(n,r,e,a){return a&&r!==null&&e!==null&&r!==e&&n>=r&&n<=e}function Gt(n){let r=n.changedTouches[0];return document.elementFromPoint(r.clientX,r.clientY)}var C=class{start;end;_disableStructuralEquivalency;constructor(r,e){this.start=r,this.end=e}};var re=(()=>{class n{selection;_adapter;_selectionChanged=new D;selectionChanged=this._selectionChanged;constructor(e,a){this.selection=e,this._adapter=a,this.selection=e}updateSelection(e,a){let t=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:a,oldValue:t})}ngOnDestroy(){this._selectionChanged.complete()}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static ɵfac=function(a){jx()};static ɵprov=B({token:n,factory:n.ɵfac})}return n})();var xa=(()=>{class n extends re{constructor(e){super(null,e)}add(e){super.updateSelection(e,this)}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new n(this._adapter);return e.updateSelection(this.selection,this),e}static ɵfac=function(a){return new(a||n)(k(l))};static ɵprov=B({token:n,factory:n.ɵfac})}return n})();var na={provide:re,useFactory:()=>f(re,{optional:!0,skipSelf:!0})||new xa(f(l))};var ia=new g(`MAT_DATE_RANGE_SELECTION_STRATEGY`);var Je=7;var Fa=0;var Xt=(()=>{class n{_changeDetectorRef=f(pn);_dateFormats=f(d,{optional:!0});_dateAdapter=f(l,{optional:!0});_dir=f(Gt$1,{optional:!0});_rangeStrategy=f(ia,{optional:!0});_rerenderSubscription=$.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let a=this._activeDate,t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(t,this.minDate,this.maxDate),this._hasSameMonthAndYear(a,this._activeDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof C?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new U;_userSelection=new U;dragStarted=new U;dragEnded=new U;activeDateChange=new U;_matCalendarBody;_monthLabel=pe(``);_weeks=pe([]);_firstWeekOffset=pe(0);_rangeStart=pe(null);_rangeEnd=pe(null);_comparisonRangeStart=pe(null);_comparisonRangeEnd=pe(null);_previewStart=pe(null);_previewEnd=pe(null);_isRange=pe(!1);_todayDate=pe(null);_weekdays=pe([]);constructor(){f(st).load(_c),this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(At(null)).subscribe(()=>this._init())}ngOnChanges(e){let a=e.comparisonStart||e.comparisonEnd;a&&!a.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview()}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_dateSelected(e){let a=e.value,t=this._getDateFromDayOfMonth(a),i,s;this._selected instanceof C?(i=this._getDateInCurrentMonth(this._selected.start),s=this._getDateInCurrentMonth(this._selected.end)):i=s=this._getDateInCurrentMonth(this._selected),(i!==a||s!==a)&&this.selectedChange.emit(t),this._userSelection.emit({value:t,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck()}_updateActiveDate(e){let a=e.value,t=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(a),this._dateAdapter.compareDate(t,this.activeDate)&&this.activeDateChange.emit(this._activeDate)}_handleCalendarBodyKeydown(e){let a=this._activeDate,t=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,t?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,t?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=!0,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!ur(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(a,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames(`short`)[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((Je+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%Je),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck()}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e)}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_previewChanged({event:e,value:a}){if(this._rangeStrategy){let t=a?a.rawValue:null,i=this._rangeStrategy.createPreview(t,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(i.start)),this._previewEnd.set(this._getCellCompareValue(i.end)),this.activeDrag&&t){let s=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,t,e);s&&(this._previewStart.set(this._getCellCompareValue(s.start)),this._previewEnd.set(this._getCellCompareValue(s.end)))}}}_dragEnded(e){if(this.activeDrag)if(e.value){let a=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:a??null,event:e.event})}else this.dragEnded.emit({value:null,event:e.event})}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),a=this._dateAdapter.getDayOfWeekNames(`narrow`),i=this._dateAdapter.getDayOfWeekNames(`long`).map((s,_)=>({long:s,narrow:a[_],id:Fa++}));this._weekdays.set(i.slice(e).concat(i.slice(0,e)))}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),a=this._dateAdapter.getDateNames(),t=[[]];for(let i=0,s=this._firstWeekOffset();i<e;i++,s++){s==Je&&(t.push([]),s=0);let _=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),i+1),ca=this._shouldEnableDate(_),ua=this._dateAdapter.format(_,this._dateFormats.display.dateA11yLabel),ha=this.dateClass?this.dateClass(_,`month`):void 0;t[t.length-1].push(new ie(i+1,a[i],ua,ca,ha,this._getCellCompareValue(_),_))}this._weeks.set(t)}_shouldEnableDate(e){return!!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,a){return!!(e&&a&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(a)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(a))}_getCellCompareValue(e){if(e){let a=this._dateAdapter.getYear(e),t=this._dateAdapter.getMonth(e),i=this._dateAdapter.getDate(e);return new Date(a,t,i).getTime()}return null}_isRtl(){return this._dir&&this._dir.value===`rtl`}_setRanges(e){e instanceof C?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(!0)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(!1)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd))}_canSelect(e){return!this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null)}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-month-view`]],viewQuery:function(a,t){if(a&1&&ar(W,5),a&2){let i;Oe(i=ke$1())&&(t._matCalendarBody=i.first)}},inputs:{activeDate:`activeDate`,selected:`selected`,minDate:`minDate`,maxDate:`maxDate`,dateFilter:`dateFilter`,dateClass:`dateClass`,comparisonStart:`comparisonStart`,comparisonEnd:`comparisonEnd`,startDateAccessibleName:`startDateAccessibleName`,endDateAccessibleName:`endDateAccessibleName`,activeDrag:`activeDrag`},outputs:{selectedChange:`selectedChange`,_userSelection:`_userSelection`,dragStarted:`dragStarted`,dragEnded:`dragEnded`,activeDateChange:`activeDateChange`},exportAs:[`matMonthView`],features:[Le],decls:8,vars:14,consts:[[`role`,`grid`,1,`mat-calendar-table`],[1,`mat-calendar-table-header`],[`scope`,`col`],[`aria-hidden`,`true`],[`colspan`,`7`,1,`mat-calendar-table-header-divider`],[`mat-calendar-body`,``,3,`selectedValueChange`,`activeDateChange`,`previewChange`,`dragStarted`,`dragEnded`,`keyup`,`keydown`,`label`,`rows`,`todayValue`,`startValue`,`endValue`,`comparisonStart`,`comparisonEnd`,`previewStart`,`previewEnd`,`isRange`,`labelMinRequiredCells`,`activeCell`,`startDateAccessibleName`,`endDateAccessibleName`],[1,`cdk-visually-hidden`]],template:function(a,t){a&1&&(Se(0,`table`,0)(1,`thead`,1)(2,`tr`),UN(3,ba,5,2,`th`,2,aa),Re(),Se(5,`tr`,3),Qr(6,`th`,4),Re()(),Se(7,`tbody`,5),dt(`selectedValueChange`,function(s){return t._dateSelected(s)})(`activeDateChange`,function(s){return t._updateActiveDate(s)})(`previewChange`,function(s){return t._previewChanged(s)})(`dragStarted`,function(s){return t.dragStarted.emit(s)})(`dragEnded`,function(s){return t._dragEnded(s)})(`keyup`,function(s){return t._handleCalendarBodyKeyup(s)})(`keydown`,function(s){return t._handleCalendarBodyKeydown(s)}),Re()()),a&2&&(me(3),$N(t._weekdays()),me(4),sr(`label`,t._monthLabel())(`rows`,t._weeks())(`todayValue`,t._todayDate())(`startValue`,t._rangeStart())(`endValue`,t._rangeEnd())(`comparisonStart`,t._comparisonRangeStart())(`comparisonEnd`,t._comparisonRangeEnd())(`previewStart`,t._previewStart())(`previewEnd`,t._previewEnd())(`isRange`,t._isRange())(`labelMinRequiredCells`,3)(`activeCell`,t._dateAdapter.getDate(t.activeDate)-1)(`startDateAccessibleName`,t.startDateAccessibleName)(`endDateAccessibleName`,t.endDateAccessibleName))},dependencies:[W],encapsulation:2})}return n})();var v=24;var et=4;var Zt=(()=>{class n{_changeDetectorRef=f(pn);_dateAdapter=f(l,{optional:!0});_dir=f(Gt$1,{optional:!0});_rerenderSubscription=$.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let a=this._activeDate,t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(t,this.minDate,this.maxDate),ra(this._dateAdapter,a,this._activeDate,this.minDate,this.maxDate)||this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof C?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new U;yearSelected=new U;activeDateChange=new U;_matCalendarBody;_years=pe([]);_todayYear=pe(0);_selectedYear=pe(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(At(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let a=this._dateAdapter.getYear(this._activeDate)-ae(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),t=[];for(let i=0,s=[];i<v;i++)s.push(a+i),s.length==et&&(t.push(s.map(_=>this._createCellForYear(_))),s=[]);this._years.set(t),this._changeDetectorRef.markForCheck()}_yearSelected(e){let a=e.value,t=this._dateAdapter.createDate(a,0,1),i=this._getDateFromYear(a);this.yearSelected.emit(t),this.selectedChange.emit(i)}_updateActiveDate(e){let a=e.value,t=this._activeDate;this.activeDate=this._getDateFromYear(a),this._dateAdapter.compareDate(t,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let a=this._activeDate,t=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,t?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,t?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-et);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,et);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-ae(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,v-ae(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-v*10:-v);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?v*10:v);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(a,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_getActiveCell(){return ae(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getDateFromYear(e){let a=this._dateAdapter.getMonth(this.activeDate),t=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,a,1));return this._dateAdapter.createDate(e,a,Math.min(this._dateAdapter.getDate(this.activeDate),t))}_createCellForYear(e){let a=this._dateAdapter.createDate(e,0,1),t=this._dateAdapter.getYearName(a),i=this.dateClass?this.dateClass(a,`multi-year`):void 0;return new ie(e,t,t,this._shouldEnableYear(e),i)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return!1;if(!this.dateFilter)return!0;let a=this._dateAdapter.createDate(e,0,1);for(let t=a;this._dateAdapter.getYear(t)==e;t=this._dateAdapter.addCalendarDays(t,1))if(this.dateFilter(t))return!0;return!1}_isRtl(){return this._dir&&this._dir.value===`rtl`}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof C){let a=e.start||e.end;a&&this._selectedYear.set(this._dateAdapter.getYear(a))}else e&&this._selectedYear.set(this._dateAdapter.getYear(e))}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-multi-year-view`]],viewQuery:function(a,t){if(a&1&&ar(W,5),a&2){let i;Oe(i=ke$1())&&(t._matCalendarBody=i.first)}},inputs:{activeDate:`activeDate`,selected:`selected`,minDate:`minDate`,maxDate:`maxDate`,dateFilter:`dateFilter`,dateClass:`dateClass`},outputs:{selectedChange:`selectedChange`,yearSelected:`yearSelected`,activeDateChange:`activeDateChange`},exportAs:[`matMultiYearView`],decls:5,vars:7,consts:[[`role`,`grid`,1,`mat-calendar-table`],[`aria-hidden`,`true`,1,`mat-calendar-table-header`],[`colspan`,`4`,1,`mat-calendar-table-header-divider`],[`mat-calendar-body`,``,3,`selectedValueChange`,`activeDateChange`,`keyup`,`keydown`,`rows`,`todayValue`,`startValue`,`endValue`,`numCols`,`cellAspectRatio`,`activeCell`]],template:function(a,t){a&1&&(Se(0,`table`,0)(1,`thead`,1)(2,`tr`),Qr(3,`th`,2),Re()(),Se(4,`tbody`,3),dt(`selectedValueChange`,function(s){return t._yearSelected(s)})(`activeDateChange`,function(s){return t._updateActiveDate(s)})(`keyup`,function(s){return t._handleCalendarBodyKeyup(s)})(`keydown`,function(s){return t._handleCalendarBodyKeydown(s)}),Re()()),a&2&&(me(4),sr(`rows`,t._years())(`todayValue`,t._todayYear())(`startValue`,t._selectedYear())(`endValue`,t._selectedYear())(`numCols`,4)(`cellAspectRatio`,4/7)(`activeCell`,t._getActiveCell()))},dependencies:[W],encapsulation:2})}return n})();function ra(n,r,e,a,t){let i=n.getYear(r),s=n.getYear(e),_=sa(n,a,t);return Math.floor((i-_)/v)===Math.floor((s-_)/v)}function ae(n,r,e,a){return Na(n.getYear(r)-sa(n,e,a),v)}function sa(n,r,e){let a=0;return e?a=n.getYear(e)-v+1:r&&(a=n.getYear(r)),a}function Na(n,r){return(n%r+r)%r}var Jt=(()=>{class n{_changeDetectorRef=f(pn);_dateFormats=f(d,{optional:!0});_dateAdapter=f(l,{optional:!0});_dir=f(Gt$1,{optional:!0});_rerenderSubscription=$.EMPTY;_selectionKeyPressed=!1;get activeDate(){return this._activeDate}set activeDate(e){let a=this._activeDate,t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(t,this.minDate,this.maxDate),this._dateAdapter.getYear(a)!==this._dateAdapter.getYear(this._activeDate)&&this._init()}_activeDate;get selected(){return this._selected}set selected(e){e instanceof C?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e)}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;selectedChange=new U;monthSelected=new U;activeDateChange=new U;_matCalendarBody;_months=pe([]);_yearLabel=pe(``);_todayMonth=pe(null);_selectedMonth=pe(null);constructor(){this._activeDate=this._dateAdapter.today()}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(At(null)).subscribe(()=>this._init())}ngOnDestroy(){this._rerenderSubscription.unsubscribe()}_monthSelected(e){let a=e.value,t=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),a,1);this.monthSelected.emit(t);let i=this._getDateFromMonth(a);this.selectedChange.emit(i)}_updateActiveDate(e){let a=e.value,t=this._activeDate;this.activeDate=this._getDateFromMonth(a),this._dateAdapter.compareDate(t,this.activeDate)&&this.activeDateChange.emit(this.activeDate)}_handleCalendarBodyKeydown(e){let a=this._activeDate,t=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,t?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,t?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=!0;break;default:return}this._dateAdapter.compareDate(a,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault()}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=!1)}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames(`short`);this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(a=>a.map(t=>this._createCellForMonth(t,e[t])))),this._changeDetectorRef.markForCheck()}_focusActiveCell(){this._matCalendarBody._focusActiveCell()}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked()}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let a=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),t=this._dateAdapter.getNumDaysInMonth(a);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),t))}_createCellForMonth(e,a){let t=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),i=this._dateAdapter.format(t,this._dateFormats.display.monthYearA11yLabel),s=this.dateClass?this.dateClass(t,`year`):void 0;return new ie(e,a.toLocaleUpperCase(),i,this._shouldEnableMonth(e),s)}_shouldEnableMonth(e){let a=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(a,e)||this._isYearAndMonthBeforeMinDate(a,e))return!1;if(!this.dateFilter)return!0;let t=this._dateAdapter.createDate(a,e,1);for(let i=t;this._dateAdapter.getMonth(i)==e;i=this._dateAdapter.addCalendarDays(i,1))if(this.dateFilter(i))return!0;return!1}_isYearAndMonthAfterMaxDate(e,a){if(this.maxDate){let t=this._dateAdapter.getYear(this.maxDate),i=this._dateAdapter.getMonth(this.maxDate);return e>t||e===t&&a>i}return!1}_isYearAndMonthBeforeMinDate(e,a){if(this.minDate){let t=this._dateAdapter.getYear(this.minDate),i=this._dateAdapter.getMonth(this.minDate);return e<t||e===t&&a<i}return!1}_isRtl(){return this._dir&&this._dir.value===`rtl`}_setSelectedMonth(e){e instanceof C?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e))}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-year-view`]],viewQuery:function(a,t){if(a&1&&ar(W,5),a&2){let i;Oe(i=ke$1())&&(t._matCalendarBody=i.first)}},inputs:{activeDate:`activeDate`,selected:`selected`,minDate:`minDate`,maxDate:`maxDate`,dateFilter:`dateFilter`,dateClass:`dateClass`},outputs:{selectedChange:`selectedChange`,monthSelected:`monthSelected`,activeDateChange:`activeDateChange`},exportAs:[`matYearView`],decls:5,vars:9,consts:[[`role`,`grid`,1,`mat-calendar-table`],[`aria-hidden`,`true`,1,`mat-calendar-table-header`],[`colspan`,`4`,1,`mat-calendar-table-header-divider`],[`mat-calendar-body`,``,3,`selectedValueChange`,`activeDateChange`,`keyup`,`keydown`,`label`,`rows`,`todayValue`,`startValue`,`endValue`,`labelMinRequiredCells`,`numCols`,`cellAspectRatio`,`activeCell`]],template:function(a,t){a&1&&(Se(0,`table`,0)(1,`thead`,1)(2,`tr`),Qr(3,`th`,2),Re()(),Se(4,`tbody`,3),dt(`selectedValueChange`,function(s){return t._monthSelected(s)})(`activeDateChange`,function(s){return t._updateActiveDate(s)})(`keyup`,function(s){return t._handleCalendarBodyKeyup(s)})(`keydown`,function(s){return t._handleCalendarBodyKeydown(s)}),Re()()),a&2&&(me(4),sr(`label`,t._yearLabel())(`rows`,t._months())(`todayValue`,t._todayMonth())(`startValue`,t._selectedMonth())(`endValue`,t._selectedMonth())(`labelMinRequiredCells`,2)(`numCols`,4)(`cellAspectRatio`,4/7)(`activeCell`,t._dateAdapter.getMonth(t.activeDate)))},dependencies:[W],encapsulation:2})}return n})();var oa=(()=>{class n{_intl=f(Q);calendar=f(tt);_dateAdapter=f(l,{optional:!0});_dateFormats=f(d,{optional:!0});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){f(st).load(_c);let e=f(pn);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck()})}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView==`month`?`multi-year`:`month`}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView==`month`?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView==`year`?-1:-v))}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView==`month`?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView==`year`?1:v))}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):!0}nextEnabled(){return!this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,a=this._intl,t=this._dateAdapter;e.currentView===`month`?(this._periodButtonText=t.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=t.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=a.switchToMultiYearViewLabel,this._prevButtonLabel=a.prevMonthLabel,this._nextButtonLabel=a.nextMonthLabel):e.currentView===`year`?(this._periodButtonText=t.getYearName(e.activeDate),this._periodButtonDescription=t.getYearName(e.activeDate),this._periodButtonLabel=a.switchToMonthViewLabel,this._prevButtonLabel=a.prevYearLabel,this._nextButtonLabel=a.nextYearLabel):(this._periodButtonText=a.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=a.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=a.switchToMonthViewLabel,this._prevButtonLabel=a.prevMultiYearLabel,this._nextButtonLabel=a.nextMultiYearLabel)}_isSameView(e,a){return this.calendar.currentView==`month`?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(a)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(a):this.calendar.currentView==`year`?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(a):ra(this._dateAdapter,e,a,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let a=this._dateAdapter.getYear(this.calendar.activeDate)-ae(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),t=a+v-1;return[this._dateAdapter.getYearName(this._dateAdapter.createDate(a,0,1)),this._dateAdapter.getYearName(this._dateAdapter.createDate(t,0,1))]}_periodButtonLabelId=f(ze).getId(`mat-calendar-period-label-`);static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-calendar-header`]],exportAs:[`matCalendarHeader`],ngContentSelectors:Da,decls:17,vars:13,consts:[[1,`mat-calendar-header`],[1,`mat-calendar-controls`],[`aria-live`,`polite`,1,`cdk-visually-hidden`,3,`id`],[`matButton`,``,`type`,`button`,1,`mat-calendar-period-button`,3,`click`],[`aria-hidden`,`true`],[`viewBox`,`0 0 10 5`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-calendar-arrow`],[`points`,`0,0 5,5 10,0`],[1,`mat-calendar-spacer`],[`matIconButton`,``,`type`,`button`,`disabledInteractive`,``,1,`mat-calendar-previous-button`,3,`click`,`disabled`,`matTooltip`],[`viewBox`,`0 0 24 24`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z`],[`matIconButton`,``,`type`,`button`,`disabledInteractive`,``,1,`mat-calendar-next-button`,3,`click`,`disabled`,`matTooltip`],[`d`,`M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z`]],template:function(a,t){a&1&&(kn(),Se(0,`div`,0)(1,`div`,1)(2,`span`,2),Eh(3),Re(),Se(4,`button`,3),dt(`click`,function(){return t.currentPeriodClicked()}),Se(5,`span`,4),Eh(6),Re(),Kg(),Se(7,`svg`,5),Qr(8,`polygon`,6),Re()(),Xg(),Qr(9,`div`,7),be(10),Se(11,`button`,8),dt(`click`,function(){return t.previousClicked()}),Kg(),Se(12,`svg`,9),Qr(13,`path`,10),Re()(),Xg(),Se(14,`button`,11),dt(`click`,function(){return t.nextClicked()}),Kg(),Se(15,`svg`,9),Qr(16,`path`,12),Re()()()()),a&2&&(me(2),sr(`id`,t._periodButtonLabelId),me(),Zl(t.periodButtonDescription),me(),Fe(`aria-label`,t.periodButtonLabel)(`aria-describedby`,t._periodButtonLabelId),me(2),Zl(t.periodButtonText),me(),de(`mat-calendar-invert`,t.calendar.currentView!==`month`),me(4),sr(`disabled`,!t.previousEnabled())(`matTooltip`,t.prevButtonLabel),Fe(`aria-label`,t.prevButtonLabel),me(3),sr(`disabled`,!t.nextEnabled())(`matTooltip`,t.nextButtonLabel),Fe(`aria-label`,t.nextButtonLabel))},dependencies:[x6,CA,Yn],encapsulation:2})}return n})();var tt=(()=>{class n{_dateAdapter=f(l,{optional:!0});_dateFormats=f(d,{optional:!0});_changeDetectorRef=f(pn);_elementRef=f(L);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=!1;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView=`month`;get selected(){return this._selected}set selected(e){e instanceof C?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new U;yearSelected=new U;monthSelected=new U;viewChanged=new U(!0);_userSelection=new U;_userDragDrop=new U;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck()}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let a=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=!0,this._changeDetectorRef.markForCheck(),a&&(this.stateChanges.next(),this.viewChanged.emit(a))}_currentView;_activeDrag=null;stateChanges=new D;constructor(){this._intlChanges=f(Q).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next()})}ngAfterContentInit(){this._calendarHeaderPortal=new Qi(this.headerComponent||oa),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=!1,this.focusActiveCell())}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete()}ngOnChanges(e){let a=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,t=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,i=a||t||e.dateFilter;if(i&&!i.firstChange){let s=this._getCurrentViewComponent();s&&(this._elementRef.nativeElement.contains(ri())&&(this._moveFocusOnNextTick=!0),this._changeDetectorRef.detectChanges(),s._init())}this.stateChanges.next()}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(!1)}updateTodaysDate(){this._getCurrentViewComponent()?._init()}_dateSelected(e){let a=e.value;(this.selected instanceof C||a&&!this._dateAdapter.sameDate(a,this.selected))&&this.selectedChange.emit(a),this._userSelection.emit(e)}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e)}_monthSelectedInYearView(e){this.monthSelected.emit(e)}_goToDateInView(e,a){this.activeDate=e,this.currentView=a}_dragStarted(e){this._activeDrag=e}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null)}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-calendar`]],viewQuery:function(a,t){if(a&1&&ar(Xt,5)(Jt,5)(Zt,5),a&2){let i;Oe(i=ke$1())&&(t.monthView=i.first),Oe(i=ke$1())&&(t.yearView=i.first),Oe(i=ke$1())&&(t.multiYearView=i.first)}},hostAttrs:[1,`mat-calendar`],inputs:{headerComponent:`headerComponent`,startAt:`startAt`,startView:`startView`,selected:`selected`,minDate:`minDate`,maxDate:`maxDate`,dateFilter:`dateFilter`,dateClass:`dateClass`,comparisonStart:`comparisonStart`,comparisonEnd:`comparisonEnd`,startDateAccessibleName:`startDateAccessibleName`,endDateAccessibleName:`endDateAccessibleName`},outputs:{selectedChange:`selectedChange`,yearSelected:`yearSelected`,monthSelected:`monthSelected`,viewChanged:`viewChanged`,_userSelection:`_userSelection`,_userDragDrop:`_userDragDrop`},exportAs:[`matCalendar`],features:[De([na]),Le],decls:5,vars:2,consts:[[3,`cdkPortalOutlet`],[`cdkMonitorSubtreeFocus`,``,`tabindex`,`-1`,1,`mat-calendar-content`],[3,`activeDate`,`selected`,`dateFilter`,`maxDate`,`minDate`,`dateClass`,`comparisonStart`,`comparisonEnd`,`startDateAccessibleName`,`endDateAccessibleName`,`activeDrag`],[3,`activeDate`,`selected`,`dateFilter`,`maxDate`,`minDate`,`dateClass`],[3,`activeDateChange`,`_userSelection`,`dragStarted`,`dragEnded`,`activeDate`,`selected`,`dateFilter`,`maxDate`,`minDate`,`dateClass`,`comparisonStart`,`comparisonEnd`,`startDateAccessibleName`,`endDateAccessibleName`,`activeDrag`],[3,`activeDateChange`,`monthSelected`,`selectedChange`,`activeDate`,`selected`,`dateFilter`,`maxDate`,`minDate`,`dateClass`],[3,`activeDateChange`,`yearSelected`,`selectedChange`,`activeDate`,`selected`,`dateFilter`,`maxDate`,`minDate`,`dateClass`]],template:function(a,t){if(a&1&&(fn(0,va,0,0,`ng-template`,0),Se(1,`div`,1),Me(2,ya,1,11,`mat-month-view`,2)(3,Ca,1,6,`mat-year-view`,3)(4,wa,1,6,`mat-multi-year-view`,3),Re()),a&2){let i;sr(`cdkPortalOutlet`,t._calendarHeaderPortal),me(2),Ae((i=t.currentView)===`month`?2:i===`year`?3:i===`multi-year`?4:-1)}},dependencies:[As,WM,Xt,Jt,Zt],styles:[`.mat-calendar {
  display: block;
  line-height: normal;
  font-family: var(--%NS%mat-datepicker-calendar-text-font, var(--%NS%mat-sys-body-medium-font));
  font-size: var(--%NS%mat-datepicker-calendar-text-size, var(--%NS%mat-sys-body-medium-size));
}

.mat-calendar-header {
  padding: 8px 8px 0 8px;
}

.mat-calendar-content {
  padding: 0 8px 8px 8px;
  outline: none;
}

.mat-calendar-controls {
  display: flex;
  align-items: center;
  margin: 5% calc(4.7142857143% - 16px);
}

.mat-calendar-spacer {
  flex: 1 1 auto;
}

.mat-calendar-period-button {
  min-width: 0;
  margin: 0 8px;
  font-size: var(--%NS%mat-datepicker-calendar-period-button-text-size, var(--%NS%mat-sys-title-small-size));
  font-weight: var(--%NS%mat-datepicker-calendar-period-button-text-weight, var(--%NS%mat-sys-title-small-weight));
  --%NS%mat-button-text-label-text-color: var(--%NS%mat-datepicker-calendar-period-button-text-color, var(--%NS%mat-sys-on-surface-variant));
}

.mat-calendar-arrow {
  display: inline-block;
  width: 10px;
  height: 5px;
  margin: 0 0 0 5px;
  vertical-align: middle;
  fill: var(--%NS%mat-datepicker-calendar-period-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-calendar-arrow.mat-calendar-invert {
  transform: rotate(180deg);
}
[dir=rtl] .mat-calendar-arrow {
  margin: 0 5px 0 0;
}
@media (forced-colors: active) {
  .mat-calendar-arrow {
    fill: CanvasText;
  }
}

.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),
.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {
  color: var(--%NS%mat-datepicker-calendar-navigation-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-calendar-previous-button,
[dir=rtl] .mat-calendar-next-button {
  transform: rotate(180deg);
}

.mat-calendar-table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.mat-calendar-table-header th {
  text-align: center;
  padding: 0 0 8px 0;
  color: var(--%NS%mat-datepicker-calendar-header-text-color, var(--%NS%mat-sys-on-surface-variant));
  font-size: var(--%NS%mat-datepicker-calendar-header-text-size, var(--%NS%mat-sys-title-small-size));
  font-weight: var(--%NS%mat-datepicker-calendar-header-text-weight, var(--%NS%mat-sys-title-small-weight));
}

.mat-calendar-table-header-divider {
  position: relative;
  height: 1px;
}
.mat-calendar-table-header-divider::after {
  content: "";
  position: absolute;
  top: 0;
  left: -8px;
  right: -8px;
  height: 1px;
  background: var(--%NS%mat-datepicker-calendar-header-divider-color, transparent);
}

.mat-calendar-body-cell-content::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return n})();var Ra=new g(`mat-datepicker-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=f(F);return()=>Pp(n)}});var da=(()=>{class n{_elementRef=f(L);_animationsDisabled=zt$1();_changeDetectorRef=f(pn);_globalModel=f(re);_dateAdapter=f(l);_ngZone=f(C$1);_rangeSelectionStrategy=f(ia,{optional:!0});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=!1;_animationDone=new D;_isAnimating=!1;_closeButtonText;_closeButtonFocused=!1;_actionsPortal=null;_dialogLabelId=null;constructor(){if(f(st).load(_c),this._closeButtonText=f(Q).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,a=f(ce);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[a.listen(e,`animationstart`,this._handleAnimationEvent),a.listen(e,`animationend`,this._handleAnimationEvent),a.listen(e,`animationcancel`,this._handleAnimationEvent)])}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()}),this._calendar.focusActiveCell()}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete()}_handleUserSelection(e){let a=this._model.selection,t=e.value,i=a instanceof C;if(i&&this._rangeSelectionStrategy){let s=this._rangeSelectionStrategy.selectionFinished(t,a,e.event);this._model.updateSelection(s,this)}else t&&(i||!this._dateAdapter.sameDate(t,a))&&this._model.add(t);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close()}_handleUserDragDrop(e){this._model.updateSelection(e.value,this)}_startExitAnimation(){this._elementRef.nativeElement.classList.add(`mat-datepicker-content-exit`),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next()},200))}_handleAnimationEvent=e=>{let a=this._elementRef.nativeElement;e.target!==a||!e.animationName.startsWith(`_mat-datepicker-content`)||(clearTimeout(this._animationFallback),this._isAnimating=e.type===`animationstart`,a.classList.toggle(`mat-datepicker-content-animating`,this._isAnimating),this._isAnimating||this._animationDone.next())};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this)}_assignActions(e,a){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,a&&this._changeDetectorRef.detectChanges()}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-datepicker-content`]],viewQuery:function(a,t){if(a&1&&ar(tt,5),a&2){let i;Oe(i=ke$1())&&(t._calendar=i.first)}},hostAttrs:[1,`mat-datepicker-content`],hostVars:6,hostBindings:function(a,t){a&2&&(Dh(t.color?`mat-`+t.color:``),de(`mat-datepicker-content-touch`,t.datepicker.touchUi)(`mat-datepicker-content-animations-enabled`,!t._animationsDisabled))},inputs:{color:`color`},exportAs:[`matDatepickerContent`],decls:5,vars:26,consts:[[`cdkTrapFocus`,``,`role`,`dialog`,1,`mat-datepicker-content-container`],[3,`yearSelected`,`monthSelected`,`viewChanged`,`_userSelection`,`_userDragDrop`,`id`,`startAt`,`startView`,`minDate`,`maxDate`,`dateFilter`,`headerComponent`,`selected`,`dateClass`,`comparisonStart`,`comparisonEnd`,`startDateAccessibleName`,`endDateAccessibleName`],[3,`cdkPortalOutlet`],[`type`,`button`,`matButton`,`elevated`,1,`mat-datepicker-close-button`,3,`focus`,`blur`,`click`,`color`]],template:function(a,t){a&1&&(Se(0,`div`,0)(1,`mat-calendar`,1),dt(`yearSelected`,function(s){return t.datepicker._selectYear(s)})(`monthSelected`,function(s){return t.datepicker._selectMonth(s)})(`viewChanged`,function(s){return t.datepicker._viewChanged(s)})(`_userSelection`,function(s){return t._handleUserSelection(s)})(`_userDragDrop`,function(s){return t._handleUserDragDrop(s)}),Re(),fn(2,ka,0,0,`ng-template`,2),Se(3,`button`,3),dt(`focus`,function(){return t._closeButtonFocused=!0})(`blur`,function(){return t._closeButtonFocused=!1})(`click`,function(){return t.datepicker.close()}),Eh(4),Re()()),a&2&&(de(`mat-datepicker-content-container-with-custom-header`,t.datepicker.calendarHeaderComponent)(`mat-datepicker-content-container-with-actions`,t._actionsPortal),Fe(`aria-modal`,!0)(`aria-labelledby`,t._dialogLabelId??void 0),me(),Dh(t.datepicker.panelClass),sr(`id`,t.datepicker.id)(`startAt`,t.datepicker.startAt)(`startView`,t.datepicker.startView)(`minDate`,t.datepicker._getMinDate())(`maxDate`,t.datepicker._getMaxDate())(`dateFilter`,t.datepicker._getDateFilter())(`headerComponent`,t.datepicker.calendarHeaderComponent)(`selected`,t._getSelected())(`dateClass`,t.datepicker.dateClass)(`comparisonStart`,t.comparisonStart)(`comparisonEnd`,t.comparisonEnd)(`startDateAccessibleName`,t.startDateAccessibleName)(`endDateAccessibleName`,t.endDateAccessibleName),me(),sr(`cdkPortalOutlet`,t._actionsPortal),me(),de(`cdk-visually-hidden`,!t._closeButtonFocused),sr(`color`,t.color||`primary`),me(),Zl(t._closeButtonText))},dependencies:[sA,tt,As,x6],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-datepicker-content {
  display: block;
  background-color: var(--%NS%mat-datepicker-calendar-container-background-color, var(--%NS%mat-sys-surface-container-high));
  color: var(--%NS%mat-datepicker-calendar-container-text-color, var(--%NS%mat-sys-on-surface));
  box-shadow: var(--%NS%mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--%NS%mat-datepicker-calendar-container-shape, var(--%NS%mat-sys-corner-large));
}
.mat-datepicker-content.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content .mat-calendar {
  width: 296px;
  height: 354px;
}
.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {
  height: auto;
}
.mat-datepicker-content .mat-datepicker-close-button {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
}
.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {
  display: none;
}

.mat-datepicker-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mat-datepicker-content-touch {
  display: block;
  max-height: 80vh;
  box-shadow: var(--%NS%mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--%NS%mat-datepicker-calendar-container-touch-shape, var(--%NS%mat-sys-corner-extra-large));
  position: relative;
  overflow: visible;
  min-height: fit-content;
}
.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content-touch .mat-datepicker-content-container {
  min-height: fit-content;
  max-height: 788px;
  min-width: 250px;
  max-width: 750px;
}
.mat-datepicker-content-touch .mat-calendar {
  width: 100%;
  height: auto;
}

.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-exit 100ms linear;
}

@media all and (orientation: landscape) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 64vh;
    height: 80vh;
  }
}
@media all and (orientation: portrait) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 80vw;
    height: 100vw;
  }
}
`],encapsulation:2})}return n})();var ea=(()=>{class n{_injector=f(F);_viewContainerRef=f(Vt);_dateAdapter=f(l,{optional:!0});_dir=f(Gt$1,{optional:!0});_model=f(re);_animationsDisabled=zt$1();_scrollStrategy=f(Ra);_inputStateChanges=$.EMPTY;_document=f(M);calendarHeaderComponent;get startAt(){return this._startAt||(this.datepickerInput?this.datepickerInput.getStartValue():null)}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))}_startAt=null;startView=`month`;get color(){return this._color||(this.datepickerInput?this.datepickerInput.getThemePalette():void 0)}set color(e){this._color=e}_color;touchUi=!1;get disabled(){return this._disabled===void 0&&this.datepickerInput?this.datepickerInput.disabled:!!this._disabled}set disabled(e){e!==this._disabled&&(this._disabled=e,this.stateChanges.next(void 0))}_disabled;xPosition=`start`;yPosition=`below`;restoreFocus=!0;yearSelected=new U;monthSelected=new U;viewChanged=new U(!0);dateClass;openedStream=new U;closedStream=new U;get panelClass(){return this._panelClass}set panelClass(e){this._panelClass=Pq(e)}_panelClass;get opened(){return this._opened}set opened(e){e?this.open():this.close()}_opened=!1;id=f(ze).getId(`mat-datepicker-`);_getMinDate(){return this.datepickerInput&&this.datepickerInput.min}_getMaxDate(){return this.datepickerInput&&this.datepickerInput.max}_getDateFilter(){return this.datepickerInput&&this.datepickerInput.dateFilter}_overlayRef=null;_componentRef=null;_focusedElementBeforeOpen=null;_backdropHarnessClass=`${this.id}-backdrop`;_actionsPortal=null;datepickerInput;stateChanges=new D;_changeDetectorRef=f(pn);constructor(){this._dateAdapter,this._model.selectionChanged.subscribe(()=>{this._changeDetectorRef.markForCheck()})}ngOnChanges(e){let a=e.xPosition||e.yPosition;if(a&&!a.firstChange&&this._overlayRef){let t=this._overlayRef.getConfig().positionStrategy;t instanceof Fc&&(this._setConnectedPositions(t),this.opened&&this._overlayRef.updatePosition())}this.stateChanges.next(void 0)}ngOnDestroy(){this._destroyOverlay(),this.close(),this._inputStateChanges.unsubscribe(),this.stateChanges.complete()}select(e){this._model.add(e)}_selectYear(e){this.yearSelected.emit(e)}_selectMonth(e){this.monthSelected.emit(e)}_viewChanged(e){this.viewChanged.emit(e)}registerInput(e){return this.datepickerInput,this._inputStateChanges.unsubscribe(),this.datepickerInput=e,this._inputStateChanges=e.stateChanges.subscribe(()=>this.stateChanges.next(void 0)),this._model}registerActions(e){this._actionsPortal,this._actionsPortal=e,this._componentRef?.instance._assignActions(e,!0)}removeActions(e){e===this._actionsPortal&&(this._actionsPortal=null,this._componentRef?.instance._assignActions(null,!0))}open(){this._opened||this.disabled||this._componentRef?.instance._isAnimating||(this.datepickerInput,this._focusedElementBeforeOpen=ri(),this._openOverlay(),this._opened=!0,this.openedStream.emit())}close(){if(!this._opened||this._componentRef?.instance._isAnimating)return;let e=this.restoreFocus&&this._focusedElementBeforeOpen&&typeof this._focusedElementBeforeOpen.focus==`function`,a=()=>{this._opened&&(this._opened=!1,this.closedStream.emit())};if(this._componentRef){let{instance:t,location:i}=this._componentRef;t._animationDone.pipe(Je$1(1)).subscribe(()=>{let s=this._document.activeElement;e&&(!s||s===this._document.activeElement||i.nativeElement.contains(s))&&this._focusedElementBeforeOpen.focus(),this._focusedElementBeforeOpen=null,this._destroyOverlay()}),t._startExitAnimation()}e?setTimeout(a):a()}_applyPendingSelection(){this._componentRef?.instance?._applyPendingSelection()}_forwardContentValues(e){e.datepicker=this,e.color=this.color,e._dialogLabelId=this.datepickerInput.getOverlayLabelId(),e._assignActions(this._actionsPortal,!1)}_openOverlay(){this._destroyOverlay();let e=this.touchUi,a=new Qi(da,this._viewContainerRef),t=this._overlayRef=Os(this._injector,new li({positionStrategy:e?this._getDialogStrategy():this._getDropdownStrategy(),hasBackdrop:!0,backdropClass:[e?`cdk-overlay-dark-backdrop`:`mat-overlay-transparent-backdrop`,this._backdropHarnessClass],direction:this._dir||`ltr`,scrollStrategy:e?to(this._injector):this._scrollStrategy(),panelClass:`mat-datepicker-${e?`dialog`:`popup`}`,disableAnimations:this._animationsDisabled}));this._getCloseStream(t).subscribe(i=>{i&&i.preventDefault(),this.close()}),t.keydownEvents().subscribe(i=>{let s=i.keyCode;(s===38||s===40||s===37||s===39||s===33||s===34)&&i.preventDefault()}),this._componentRef=t.attach(a),this._forwardContentValues(this._componentRef.instance),e||un(()=>{t.updatePosition()},{injector:this._injector})}_destroyOverlay(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=this._componentRef=null)}_getDialogStrategy(){return no(this._injector).centerHorizontally().centerVertically()}_getDropdownStrategy(){let e=Vp(this._injector,this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(`.mat-datepicker-content`).withFlexibleDimensions(!1).withViewportMargin(8).withLockedPosition();return this._setConnectedPositions(e)}_setConnectedPositions(e){let a=this.xPosition===`end`?`end`:`start`,t=a===`start`?`end`:`start`,i=this.yPosition===`above`?`bottom`:`top`,s=i===`top`?`bottom`:`top`;return e.withPositions([{originX:a,originY:s,overlayX:a,overlayY:i},{originX:a,originY:i,overlayX:a,overlayY:s},{originX:t,originY:s,overlayX:t,overlayY:i},{originX:t,originY:i,overlayX:t,overlayY:s}])}_getCloseStream(e){let a=[`ctrlKey`,`shiftKey`,`metaKey`];return go(e.backdropClick(),e.detachments(),e.keydownEvents().pipe(ae$1(t=>t.keyCode===27&&!ur(t)||this.datepickerInput&&ur(t,`altKey`)&&t.keyCode===38&&a.every(i=>!ur(t,i)))))}static ɵfac=function(a){return new(a||n)};static ɵdir=I({type:n,inputs:{calendarHeaderComponent:`calendarHeaderComponent`,startAt:`startAt`,startView:`startView`,color:`color`,touchUi:[2,`touchUi`,`touchUi`,ie$1],disabled:[2,`disabled`,`disabled`,ie$1],xPosition:`xPosition`,yPosition:`yPosition`,restoreFocus:[2,`restoreFocus`,`restoreFocus`,ie$1],dateClass:`dateClass`,panelClass:`panelClass`,opened:[2,`opened`,`opened`,ie$1]},outputs:{yearSelected:`yearSelected`,monthSelected:`monthSelected`,viewChanged:`viewChanged`,openedStream:`opened`,closedStream:`closed`},features:[Le]})}return n})();var Pn=(()=>{class n extends ea{static ɵfac=(()=>{let e;return function(t){return(e||(e=He(n)))(t||n)}})();static ɵcmp=he({type:n,selectors:[[`mat-datepicker`]],exportAs:[`matDatepicker`],features:[De([na,{provide:ea,useExisting:n}]),Q$1],decls:0,vars:0,template:function(a,t){},encapsulation:2})}return n})();var q=class{target;targetElement;value=null;constructor(r,e){this.target=r,this.targetElement=e,this.value=this.target.value}};var Ta=(()=>{class n{_elementRef=f(L);_dateAdapter=f(l,{optional:!0});_dateFormats=f(d,{optional:!0});_isInitialized=!1;get value(){return this._model?this._getValueFromModel(this._model.selection):this._pendingValue}set value(e){this._assignValueProgrammatically(e,!0)}_model;get disabled(){return!!this._disabled||this._parentDisabled()}set disabled(e){let a=e,t=this._elementRef.nativeElement;this._disabled!==a&&(this._disabled=a,this.stateChanges.next(void 0)),a&&this._isInitialized&&t.blur&&t.blur()}_disabled;dateChange=new U;dateInput=new U;stateChanges=new D;_onTouched=()=>{};_validatorOnChange=()=>{};_cvaOnChange=()=>{};_valueChangesSubscription=$.EMPTY;_localeSubscription=$.EMPTY;_pendingValue=null;_parseValidator=()=>this._lastValueValid?null:{matDatepickerParse:{text:this._elementRef.nativeElement.value}};_filterValidator=e=>{let a=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value));return!a||this._matchesFilter(a)?null:{matDatepickerFilter:!0}};_minValidator=e=>{let a=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),t=this._getMinDate();return!t||!a||this._dateAdapter.compareDate(t,a)<=0?null:{matDatepickerMin:{min:t,actual:a}}};_maxValidator=e=>{let a=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),t=this._getMaxDate();return!t||!a||this._dateAdapter.compareDate(t,a)>=0?null:{matDatepickerMax:{max:t,actual:a}}};_getValidators(){return[this._parseValidator,this._minValidator,this._maxValidator,this._filterValidator]}_registerModel(e){this._model=e,this._valueChangesSubscription.unsubscribe(),this._pendingValue&&this._assignValue(this._pendingValue),this._valueChangesSubscription=this._model.selectionChanged.subscribe(a=>{if(this._shouldHandleChangeEvent(a)){let t=this._getValueFromModel(a.selection);this._lastValueValid=this._isValidValue(t),this._cvaOnChange(t),this._onTouched(),this._formatValue(t),this.dateInput.emit(new q(this,this._elementRef.nativeElement)),this.dateChange.emit(new q(this,this._elementRef.nativeElement))}})}_lastValueValid=!1;constructor(){this._localeSubscription=this._dateAdapter.localeChanges.subscribe(()=>{this._assignValueProgrammatically(this.value,!0)})}ngAfterViewInit(){this._isInitialized=!0}ngOnChanges(e){Pa(e,this._dateAdapter)&&this.stateChanges.next(void 0)}ngOnDestroy(){this._valueChangesSubscription.unsubscribe(),this._localeSubscription.unsubscribe(),this.stateChanges.complete()}registerOnValidatorChange(e){this._validatorOnChange=e}validate(e){return this._validator?this._validator(e):null}writeValue(e){this._assignValueProgrammatically(e,e!==this.value)}registerOnChange(e){this._cvaOnChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_onKeydown(e){ur(e,`altKey`)&&e.keyCode===40&&[`ctrlKey`,`shiftKey`,`metaKey`].every(i=>!ur(e,i))&&!this._elementRef.nativeElement.readOnly&&(this._openPopup(),e.preventDefault())}_onInput(e){let a=e.target.value,t=this._lastValueValid,i=this._dateAdapter.parse(a,this._dateFormats.parse.dateInput);this._lastValueValid=this._isValidValue(i),i=this._dateAdapter.getValidDateOrNull(i);let s=!this._dateAdapter.sameDate(i,this.value);!i||s?this._cvaOnChange(i):(a&&!this.value&&this._cvaOnChange(i),t!==this._lastValueValid&&this._validatorOnChange()),s&&(this._assignValue(i),this.dateInput.emit(new q(this,this._elementRef.nativeElement)))}_onChange(){this.dateChange.emit(new q(this,this._elementRef.nativeElement))}_onBlur(){this.value&&this._formatValue(this.value),this._onTouched()}_formatValue(e){this._elementRef.nativeElement.value=e!=null?this._dateAdapter.format(e,this._dateFormats.display.dateInput):``}_assignValue(e){this._model?(this._assignValueToModel(e),this._pendingValue=null):this._pendingValue=e}_isValidValue(e){return!e||this._dateAdapter.isValid(e)}_parentDisabled(){return!1}_assignValueProgrammatically(e,a){e=this._dateAdapter.deserialize(e),this._lastValueValid=this._isValidValue(e),e=this._dateAdapter.getValidDateOrNull(e),this._assignValue(e),a&&this._formatValue(e)}_matchesFilter(e){let a=this._getDateFilter();return!a||a(e)}static ɵfac=function(a){return new(a||n)};static ɵdir=I({type:n,inputs:{value:`value`,disabled:[2,`disabled`,`disabled`,ie$1]},outputs:{dateChange:`dateChange`,dateInput:`dateInput`},features:[Le]})}return n})();function Pa(n,r){let e=Object.keys(n);for(let a of e){let{previousValue:t,currentValue:i}=n[a];if(r.isDateInstance(t)&&r.isDateInstance(i)){if(!r.sameDate(t,i))return!0}else return!0}return!1}var Oa={provide:Us,useExisting:je(()=>la),multi:!0};var Ya={provide:pr,useExisting:je(()=>la),multi:!0};var la=(()=>{class n extends Ta{_formField=f(nd,{optional:!0});_closedSubscription=$.EMPTY;_openedSubscription=$.EMPTY;set matDatepicker(e){e&&(this._datepicker=e,this._ariaOwns.set(e.opened?e.id:null),this._closedSubscription=e.closedStream.subscribe(()=>{this._onTouched(),this._ariaOwns.set(null)}),this._openedSubscription=e.openedStream.subscribe(()=>{this._ariaOwns.set(e.id)}),this._registerModel(e.registerInput(this)))}_datepicker;_ariaOwns=pe(null);get min(){return this._min}set min(e){let a=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(a,this._min)||(this._min=a,this._validatorOnChange())}_min=null;get max(){return this._max}set max(e){let a=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(a,this._max)||(this._max=a,this._validatorOnChange())}_max=null;get dateFilter(){return this._dateFilter}set dateFilter(e){let a=this._matchesFilter(this.value);this._dateFilter=e,this._matchesFilter(this.value)!==a&&this._validatorOnChange()}_dateFilter;_validator=null;constructor(){super(),this._validator=Hs.compose(super._getValidators())}getConnectedOverlayOrigin(){return this._formField?this._formField.getConnectedOverlayOrigin():this._elementRef}getOverlayLabelId(){return this._formField?this._formField.getLabelId():this._elementRef.nativeElement.getAttribute(`aria-labelledby`)}getThemePalette(){return this._formField?this._formField.color:void 0}getStartValue(){return this.value}ngOnDestroy(){super.ngOnDestroy(),this._closedSubscription.unsubscribe(),this._openedSubscription.unsubscribe()}_openPopup(){this._datepicker&&this._datepicker.open()}_getValueFromModel(e){return e}_assignValueToModel(e){this._model&&this._model.updateSelection(e,this)}_getMinDate(){return this._min}_getMaxDate(){return this._max}_getDateFilter(){return this._dateFilter}_shouldHandleChangeEvent(e){return e.source!==this}static ɵfac=function(a){return new(a||n)};static ɵdir=I({type:n,selectors:[[`input`,`matDatepicker`,``]],hostAttrs:[1,`mat-datepicker-input`],hostVars:6,hostBindings:function(a,t){a&1&&dt(`input`,function(s){return t._onInput(s)})(`change`,function(){return t._onChange()})(`blur`,function(){return t._onBlur()})(`keydown`,function(s){return t._onKeydown(s)}),a&2&&(hn(`disabled`,t.disabled),Fe(`aria-haspopup`,t._datepicker?`dialog`:null)(`aria-owns`,t._ariaOwns())(`min`,t.min?t._dateAdapter.toIso8601(t.min):null)(`max`,t.max?t._dateAdapter.toIso8601(t.max):null)(`data-mat-calendar`,t._datepicker?t._datepicker.id:null))},inputs:{matDatepicker:`matDatepicker`,min:`min`,max:`max`,dateFilter:[0,`matDatepickerFilter`,`dateFilter`]},exportAs:[`matDatepickerInput`],features:[De([Oa,Ya,{provide:mC,useExisting:n}]),Q$1]})}return n})();var Ba=(()=>{class n{static ɵfac=function(a){return new(a||n)};static ɵdir=I({type:n,selectors:[[``,`matDatepickerToggleIcon`,``]]})}return n})();var La=(()=>{class n{_intl=f(Q);_changeDetectorRef=f(pn);_stateChanges=$.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e}_disabled;disableRipple=!1;_customIcon;_button;constructor(){let e=f(new hb(`tabindex`),{optional:!0}),a=Number(e);this.tabIndex=a||a===0?a:null}ngOnChanges(e){e.datepicker&&this._watchStateChanges()}ngOnDestroy(){this._stateChanges.unsubscribe()}ngAfterContentInit(){this._watchStateChanges()}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation())}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:Dr(),a=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:Dr(),t=this.datepicker?go(this.datepicker.openedStream,this.datepicker.closedStream):Dr();this._stateChanges.unsubscribe(),this._stateChanges=go(this._intl.changes,e,a,t).subscribe(()=>this._changeDetectorRef.markForCheck())}static ɵfac=function(a){return new(a||n)};static ɵcmp=he({type:n,selectors:[[`mat-datepicker-toggle`]],contentQueries:function(a,t,i){if(a&1&&zl(i,Ba,5),a&2){let s;Oe(s=ke$1())&&(t._customIcon=s.first)}},viewQuery:function(a,t){if(a&1&&ar(Aa,5),a&2){let i;Oe(i=ke$1())&&(t._button=i.first)}},hostAttrs:[1,`mat-datepicker-toggle`],hostVars:8,hostBindings:function(a,t){a&1&&dt(`click`,function(s){return t._open(s)}),a&2&&(Fe(`tabindex`,null)(`data-mat-calendar`,t.datepicker?t.datepicker.id:null),de(`mat-datepicker-toggle-active`,t.datepicker&&t.datepicker.opened)(`mat-accent`,t.datepicker&&t.datepicker.color===`accent`)(`mat-warn`,t.datepicker&&t.datepicker.color===`warn`))},inputs:{datepicker:[0,`for`,`datepicker`],tabIndex:`tabIndex`,ariaLabel:[0,`aria-label`,`ariaLabel`],disabled:[2,`disabled`,`disabled`,ie$1],disableRipple:`disableRipple`},exportAs:[`matDatepickerToggle`],features:[Le],ngContentSelectors:Ma,decls:4,vars:7,consts:[[`button`,``],[`matIconButton`,``,`type`,`button`,3,`tabIndex`,`disabled`,`disableRipple`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`fill`,`currentColor`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-datepicker-toggle-default-icon`],[`d`,`M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z`]],template:function(a,t){a&1&&(kn(Sa),Se(0,`button`,1,0),Me(2,Va,2,0,`:svg:svg`,2),be(3),Re()),a&2&&(sr(`tabIndex`,t.disabled?-1:t.tabIndex)(`disabled`,t.disabled)(`disableRipple`,t.disableRipple),Fe(`aria-haspopup`,t.datepicker?`dialog`:null)(`aria-label`,t.ariaLabel||t._intl.openCalendarLabel)(`aria-expanded`,t.datepicker?t.datepicker.opened:null),me(2),Ae(t._customIcon?-1:2))},dependencies:[CA],styles:[`.mat-datepicker-toggle {
  pointer-events: auto;
  color: var(--%NS%mat-datepicker-toggle-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-datepicker-toggle button {
  color: inherit;
}

.mat-datepicker-toggle-active {
  color: var(--%NS%mat-datepicker-toggle-active-state-icon-color, var(--%NS%mat-sys-primary));
}

@media (forced-colors: active) {
  .mat-datepicker-toggle-default-icon {
    color: CanvasText;
  }
}
`],encapsulation:2})}return n})();var On=(()=>{class n{static ɵfac=function(a){return new(a||n)};static ɵmod=W$1({type:n});static ɵinj=z({providers:[Q],imports:[N6,ks,mp,si,da,La,oa,Ke,Np]})}return n})();export{Ut as a,Pn as i,La as n,la as o,On as r,Kt as t};