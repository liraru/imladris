import{$i as td,$n as Y,Aa as zl,Ai as oe,Ar as de,Bn as W,Bt as Me,Ca as z,Ct as Kg,Di as nd,Et as L,Fi as pn$1,G as Eh,Gn as Wi$1,Gr as gp,Ht as Mp,I as De,Ir as f,It as M,J as Et,Ji as st,Jn as Wr,Jr as hb,Jt as Ns,L as Dh,Ln as Vg,M as D,Ma as zt,Mi as om,Mn as U_,Mr as dt,Mt as Le,Ni as pC,Nt as Lg,Pi as pe,Pt as Lh,Rr as fn$1,Si as mo,St as Ke$1,T as C,Ta as zD,Tr as ce,Ur as gC,Vi as rd,Vr as g,Wr as go,Xn as Xi$1,Xr as hm,Xt as Oe,Y as F,Yr as he,Zr as hn$1,Zt as On$1,_a as xt$1,an as Q,ba as yd,bi as me$1,bn as Sm,bt as KD,ci as ke,d as Ae,di as ks,dt as I,ei as ie,et as Fe,fi as lA,fr as _r,g as B,gt as Je,ha as xm,hr as ar,ia as ur,ir as Yl,it as Gt,ka as ze,kn as U,kt as LA,li as kn$1,ln as Qr,lr as Zl,lt as Hs,mn as Re,mr as ae,nn as Ph,oa as va,or as ZN,p as At,pa as wp,pt as Id,qi as sr,qt as Np,ra as un$1,ri as jp,rn as Pp,rr as Ye,rt as GD,s as A6,st as He,ti as im,tn as P3,tr as YD,ua as vp,ui as kp,ur as _c,ut as Ht,vn as Se,vt as K6,w as Bt,x as Bm,yr as be,z as Dr,zi as qt,zn as Vt}from"./chunk-DHt8gz8m.js";import{T as Rn,a as at,n as J,o as kt$1,r as Nt,s as rt,t as Dt$1}from"./main-MATDT4A4.js";import{n as g$1,t as d}from"./chunk-F_umVNHK.js";function Ve(n){return{id:n.id,name:n.name,country:n.country,notes:n.notes??void 0}}function ji(n){return{name:n.name,country:n.country,notes:n.notes??null}}var yi=class n{supabase=f(Rn).client;table=`authors`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(`*`).order(`name`);if(e)throw e;return(o??[]).map(Ve)}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(`*`).eq(`id`,o).maybeSingle();if(t)throw t;return e?Ve(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert(ji(o)).select().single();if(t)throw t;return Ve(e)}async update(o,e){let t={};e.name!==void 0&&(t.name=e.name),e.country!==void 0&&(t.country=e.country),e.notes!==void 0&&(t.notes=e.notes??null);let{data:i,error:a}=await this.supabase.from(this.table).update(t).eq(`id`,o).select().single();if(a)throw a;return Ve(i)}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let[o,e,t]=await Promise.all([this.supabase.from(`book_authors`).select(`author_id`),this.supabase.from(`manga_authors`).select(`author_id`),this.supabase.from(`manga_volume_authors`).select(`author_id`)]);if(o.error)throw o.error;if(e.error)throw e.error;if(t.error)throw t.error;let i=new Set;for(let a of o.data??[])i.add(a.author_id);for(let a of e.data??[])i.add(a.author_id);for(let a of t.data??[])i.add(a.author_id);return i}async getUsageCounts(){let[o,e]=await Promise.all([this.supabase.from(`book_authors`).select(`author_id`),this.supabase.from(`manga_volume_authors`).select(`author_id`)]);if(o.error)throw o.error;if(e.error)throw e.error;let t=new Map,i=a=>t.set(a,(t.get(a)??0)+1);for(let a of o.data??[])i(a.author_id);for(let a of e.data??[])i(a.author_id);return t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};var je=`*, editorial:editorials(*)`;function qe(n){let o=n.editorial;return{id:n.id,title:n.title,editorial:{id:o.id,name:o.name,country:o.country,website:o.website??void 0,logo:o.logo??void 0}}}var vi=class n{supabase=f(Rn).client;table=`book_series`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(je).order(`title`);if(e)throw e;return(o??[]).map(t=>qe(t))}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(je).eq(`id`,o).maybeSingle();if(t)throw t;return e?qe(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert({title:o.title,editorial_id:o.editorialId}).select(je).single();if(t)throw t;return qe(e)}async update(o,e){let t={};e.title!==void 0&&(t.title=e.title),e.editorialId!==void 0&&(t.editorial_id=e.editorialId);let{data:i,error:a}=await this.supabase.from(this.table).update(t).eq(`id`,o).select(je).single();if(a)throw a;return qe(i)}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let{data:o,error:e}=await this.supabase.from(`books`).select(`serie_id`).not(`serie_id`,`is`,null);if(e)throw e;return new Set((o??[]).map(t=>t.serie_id))}async getUsageCounts(){let{data:o,error:e}=await this.supabase.from(`books`).select(`serie_id`).not(`serie_id`,`is`,null);if(e)throw e;let t=new Map;for(let i of o??[]){let a=i.serie_id;t.set(a,(t.get(a)??0)+1)}return t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};function Qe(n){return{id:n.id,name:n.name,country:n.country,website:n.website??void 0,logo:n.logo??void 0}}var bi=class n{supabase=f(Rn).client;table=`editorials`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(`*`).order(`name`);if(e)throw e;return(o??[]).map(Qe)}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(`*`).eq(`id`,o).maybeSingle();if(t)throw t;return e?Qe(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert({name:o.name,country:o.country,website:o.website??null,logo:o.logo??null}).select().single();if(t)throw t;return Qe(e)}async update(o,e){let t={};e.name!==void 0&&(t.name=e.name),e.country!==void 0&&(t.country=e.country),e.website!==void 0&&(t.website=e.website??null),e.logo!==void 0&&(t.logo=e.logo??null);let{data:i,error:a}=await this.supabase.from(this.table).update(t).eq(`id`,o).select().single();if(a)throw a;return Qe(i)}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let[o,e,t]=await Promise.all([this.supabase.from(`books`).select(`editorial_id`),this.supabase.from(`manga_volumes`).select(`editorial_id`),this.supabase.from(`book_series`).select(`editorial_id`)]);if(o.error)throw o.error;if(e.error)throw e.error;if(t.error)throw t.error;let i=new Set;for(let a of o.data??[])i.add(a.editorial_id);for(let a of e.data??[])i.add(a.editorial_id);for(let a of t.data??[])i.add(a.editorial_id);return i}async getUsageCounts(){let[o,e]=await Promise.all([this.supabase.from(`books`).select(`editorial_id`),this.supabase.from(`manga_volumes`).select(`editorial_id`)]);if(o.error)throw o.error;if(e.error)throw e.error;let t=new Map,i=a=>t.set(a,(t.get(a)??0)+1);for(let a of o.data??[])i(a.editorial_id);for(let a of e.data??[])i(a.editorial_id);return t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};var wi=`
  *,
  manga_authors(author:authors(*)),
  manga_genres(genre)
`;function Ci(n){return{id:n.id,title:n.title,authors:(n.manga_authors??[]).map(({author:o})=>({id:o.id,name:o.name,country:o.country,notes:o.notes??void 0})),demographic:n.demographic,genres:(n.manga_genres??[]).map(({genre:o})=>o)}}var Si=class n{supabase=f(Rn).client;table=`mangas`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(wi).order(`title`);if(e)throw e;return(o??[]).map(t=>Ci(t))}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(wi).eq(`id`,o).maybeSingle();if(t)throw t;return e?Ci(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert({title:o.title,demographic:o.demographic}).select(`id`).single();if(t)throw t;let i=e.id;await this.syncAuthors(i,o.authorIds),await this.syncGenres(i,o.genres);let a=await this.getById(i);if(!a)throw new Error(`No se pudo recuperar el manga recién creado.`);return a}async update(o,e){let t={};if(e.title!==void 0&&(t.title=e.title),e.demographic!==void 0&&(t.demographic=e.demographic),Object.keys(t).length>0){let{error:a}=await this.supabase.from(this.table).update(t).eq(`id`,o);if(a)throw a}e.authorIds!==void 0&&await this.syncAuthors(o,e.authorIds),e.genres!==void 0&&await this.syncGenres(o,e.genres);let i=await this.getById(o);if(!i)throw new Error(`No se pudo recuperar el manga actualizado.`);return i}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let{data:o,error:e}=await this.supabase.from(`manga_volumes`).select(`manga_id`);if(e)throw e;return new Set((o??[]).map(t=>t.manga_id))}async getUsageCounts(){let{data:o,error:e}=await this.supabase.from(`manga_volumes`).select(`manga_id`);if(e)throw e;let t=new Map;for(let i of o??[]){let a=i.manga_id;t.set(a,(t.get(a)??0)+1)}return t}async syncAuthors(o,e){let{error:t}=await this.supabase.from(`manga_authors`).delete().eq(`manga_id`,o);if(t)throw t;if(e.length===0)return;let{error:i}=await this.supabase.from(`manga_authors`).insert(e.map(a=>({manga_id:o,author_id:a})));if(i)throw i}async syncGenres(o,e){let{error:t}=await this.supabase.from(`manga_genres`).delete().eq(`manga_id`,o);if(t)throw t;if(e.length===0)return;let{error:i}=await this.supabase.from(`manga_genres`).insert(e.map(a=>({manga_id:o,genre:a})));if(i)throw i}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};var Wi=[[[`caption`]],[[`colgroup`],[`col`]],`*`];var Ki=[`caption`,`colgroup, col`,`*`];function $i(n,o){n&1&&be(0,2)}function Yi(n,o){n&1&&(Se(0,`thead`,0),U_(1,1),Re(),Se(2,`tbody`,0),U_(3,2)(4,3),Re(),Se(5,`tfoot`,0),U_(6,4),Re())}function Xi(n,o){n&1&&U_(0,1)(1,2)(2,3)(3,4)}var q=new g(`CDK_TABLE`);var We=(()=>{class n{template=f(Et);static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`cdkCellDef`,``]]})}return n})();var Ke=(()=>{class n{template=f(Et);static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`cdkHeaderCellDef`,``]]})}return n})();var Ri=(()=>{class n{template=f(Et);static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`cdkFooterCellDef`,``]]})}return n})();var me=(()=>{class n{_table=f(q,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,`-`),this._updateColumnCssClassName())}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`cdkColumnDef`,``]],contentQueries:function(t,i,a){if(t&1&&zl(a,We,5)(a,Ke,5)(a,Ri,5),t&2){let r;Oe(r=ke())&&(i.cell=r.first),Oe(r=ke())&&(i.headerCell=r.first),Oe(r=ke())&&(i.footerCell=r.first)}},inputs:{name:[0,`cdkColumnDef`,`name`],sticky:[2,`sticky`,`sticky`,ie],stickyEnd:[2,`stickyEnd`,`stickyEnd`,ie]}})}return n})();var Ue=class{constructor(o,e){e.nativeElement.classList.add(...o._columnCssClassName)}};var xi=(()=>{class n extends Ue{constructor(){super(f(me),f(L))}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`cdk-header-cell`],[`th`,`cdk-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`cdk-header-cell`],features:[Q]})}return n})();var Ni=(()=>{class n extends Ue{constructor(){let e=f(me),t=f(L);super(e,t);let i=e._table?._getCellRole();i&&t.nativeElement.setAttribute(`role`,i)}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`cdk-cell`],[`td`,`cdk-cell`,``]],hostAttrs:[1,`cdk-cell`],features:[Q]})}return n})();var mt=(()=>{class n{template=f(Et);_differs=f(Ph);columns;_columnsDiffer;ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof ye?e.headerCell.template:this instanceof pt?e.footerCell.template:e.cell.template}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,features:[Le]})}return n})();var ye=(()=>{class n extends mt{_table=f(q,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`cdkHeaderRowDef`,``]],inputs:{columns:[0,`cdkHeaderRowDef`,`columns`],sticky:[2,`cdkHeaderRowDefSticky`,`sticky`,ie]},features:[Q,Le]})}return n})();var pt=(()=>{class n extends mt{_table=f(q,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`cdkFooterRowDef`,``]],inputs:{columns:[0,`cdkFooterRowDef`,`columns`],sticky:[2,`cdkFooterRowDefSticky`,`sticky`,ie]},features:[Q,Le]})}return n})();var $e=(()=>{class n extends mt{_table=f(q,{optional:!0});when;static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`cdkRowDef`,``]],inputs:{columns:[0,`cdkRowDefColumns`,`columns`],when:[0,`cdkRowDefWhen`,`when`]},features:[Q]})}return n})();var ne=(()=>{class n{_viewContainer=f(Vt);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`cdkCellOutlet`,``]]})}return n})();var ut=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`cdk-header-row`],[`tr`,`cdk-header-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-header-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&U_(0,0)},dependencies:[ne],encapsulation:2,changeDetection:1})}return n})();var ft=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`cdk-row`],[`tr`,`cdk-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&U_(0,0)},dependencies:[ne],encapsulation:2,changeDetection:1})}return n})();var Ii=(()=>{class n{templateRef=f(Et);_contentClassNames=[`cdk-no-data-row`,`cdk-row`];_cellClassNames=[`cdk-cell`,`cdk-no-data-cell`];_cellSelector=`td, cdk-cell, [cdk-cell], .cdk-cell`;static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`ng-template`,`cdkNoDataRow`,``]]})}return n})();var ki=[`top`,`bottom`,`left`,`right`];var ht=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(o=>this._updateCachedSizes(o)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(o,e,t=!0,i=!0,a,r,c){this._isNativeHtmlTable=o,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=i,this.direction=a,this._positionListener=r,this._tableInjector=c,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(o,e){(e.includes(`left`)||e.includes(`right`))&&this._removeFromStickyColumnReplayQueue(o);let t=[];for(let i of o)i.nodeType===i.ELEMENT_NODE&&t.push(i,...Array.from(i.children));un$1({write:()=>{for(let i of t)this._removeStickyStyle(i,e)}},{injector:this._tableInjector})}updateStickyColumns(o,e,t,i=!0,a=!0){if(!o.length||!this._isBrowser||!(e.some(V=>V)||t.some(V=>V))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let r=o[0],c=r.children.length,l=this.direction===`rtl`,f=l?`right`:`left`,w=l?`left`:`right`,B=e.lastIndexOf(!0),R=t.indexOf(!0),x,Nt,It;a&&this._updateStickyColumnReplayQueue({rows:[...o],stickyStartStates:[...e],stickyEndStates:[...t]}),un$1({earlyRead:()=>{x=this._getCellWidths(r,i),Nt=this._getStickyStartColumnPositions(x,e),It=this._getStickyEndColumnPositions(x,t)},write:()=>{for(let V of o)for(let T=0;T<c;T++){let Mt=V.children[T];e[T]&&this._addStickyStyle(Mt,f,Nt[T],T===B),t[T]&&this._addStickyStyle(Mt,w,It[T],T===R)}this._positionListener&&x.some(V=>!!V)&&(this._positionListener.stickyColumnsUpdated({sizes:B===-1?[]:x.slice(0,B+1).map((V,T)=>e[T]?V:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:R===-1?[]:x.slice(R).map((V,T)=>t[T+R]?V:null).reverse()}))}},{injector:this._tableInjector})}stickRows(o,e,t){if(!this._isBrowser)return;let i=t===`bottom`?o.slice().reverse():o,a=t===`bottom`?e.slice().reverse():e,r=[],c=[],l=[];un$1({earlyRead:()=>{for(let f=0,w=0;f<i.length;f++){if(!a[f])continue;r[f]=w;let B=i[f];l[f]=this._isNativeHtmlTable?Array.from(B.children):[B];let R=this._retrieveElementSize(B).height;w+=R,c[f]=R}},write:()=>{let f=a.lastIndexOf(!0);for(let w=0;w<i.length;w++){if(!a[w])continue;let B=r[w],R=w===f;for(let x of l[w])this._addStickyStyle(x,t,B,R)}t===`top`?this._positionListener?.stickyHeaderRowsUpdated({sizes:c,offsets:r,elements:l}):this._positionListener?.stickyFooterRowsUpdated({sizes:c,offsets:r,elements:l})}},{injector:this._tableInjector})}updateStickyFooterContainer(o,e){this._isNativeHtmlTable&&un$1({write:()=>{let t=o.querySelector(`tfoot`);t&&(e.some(i=>!i)?this._removeStickyStyle(t,[`bottom`]):this._addStickyStyle(t,`bottom`,0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(o,e){if(!o.classList.contains(this._stickCellCss))return;for(let i of e)o.style[i]=``,o.classList.remove(this._borderCellCss[i]);ki.some(i=>e.indexOf(i)===-1&&o.style[i])?o.style.zIndex=this._getCalculatedZIndex(o):(o.style.zIndex=``,this._needsPositionStickyOnElement&&(o.style.position=``),o.classList.remove(this._stickCellCss))}_addStickyStyle(o,e,t,i){o.classList.add(this._stickCellCss),i&&o.classList.add(this._borderCellCss[e]),o.style[e]=`${t}px`,o.style.zIndex=this._getCalculatedZIndex(o),this._needsPositionStickyOnElement&&(o.style.cssText+=`position: -webkit-sticky; position: sticky; `)}_getCalculatedZIndex(o){let e={top:100,bottom:10,left:1,right:1},t=0;for(let i of ki)o.style[i]&&(t+=e[i]);return t?`${t}`:``}_getCellWidths(o,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],i=o.children;for(let a=0;a<i.length;a++){let r=i[a];t.push(this._retrieveElementSize(r).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(o,e){let t=[],i=0;for(let a=0;a<o.length;a++)e[a]&&(t[a]=i,i+=o[a]);return t}_getStickyEndColumnPositions(o,e){let t=[],i=0;for(let a=o.length;a>0;a--)e[a]&&(t[a]=i,i+=o[a]);return t}_retrieveElementSize(o){let e=this._elemSizeCache.get(o);if(e)return e;let t=o.getBoundingClientRect(),i={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(o,i),this._resizeObserver.observe(o,{box:`border-box`})),i}_updateStickyColumnReplayQueue(o){this._removeFromStickyColumnReplayQueue(o.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(o)}_removeFromStickyColumnReplayQueue(o){let e=new Set(o);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(i=>!e.has(i));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(o){let e=!1;for(let t of o){let i=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};i.width!==this._elemSizeCache.get(t.target)?.width&&Zi(t.target)&&(e=!0),this._elemSizeCache.set(t.target,i)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function Zi(n){return[`cdk-cell`,`cdk-header-cell`,`cdk-footer-cell`].some(o=>n.classList.contains(o))}var ge=new g(`STICKY_POSITIONING_LISTENER`);var _t=(()=>{class n{viewContainer=f(Vt);elementRef=f(L);constructor(){let e=f(q);e._rowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`rowOutlet`,``]]})}return n})();var gt=(()=>{class n{viewContainer=f(Vt);elementRef=f(L);constructor(){let e=f(q);e._headerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`headerRowOutlet`,``]]})}return n})();var yt=(()=>{class n{viewContainer=f(Vt);elementRef=f(L);constructor(){let e=f(q);e._footerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`footerRowOutlet`,``]]})}return n})();var vt=(()=>{class n{viewContainer=f(Vt);elementRef=f(L);constructor(){let e=f(q);e._noDataRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`noDataRowOutlet`,``]]})}return n})();var bt=(()=>{class n{_differs=f(Ph);_changeDetectorRef=f(pn$1);_elementRef=f(L);_dir=f(Gt,{optional:!0});_platform=f(Y);_viewRepeater;_viewportRuler=f(Xi$1);_injector=f(F);_virtualScrollViewport=f(K6,{optional:!0,host:!0});_positionListener=f(ge,{optional:!0})||f(ge,{optional:!0,skipSelf:!0});_document=f(M);_data;_renderedRange;_onDestroy=new D;_renderRows;_renderChangeSubscription=null;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass=`cdk-table-sticky`;needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new D;_footerRowStickyUpdates=new D;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute(`role`);return e===`grid`||e===`treegrid`?`gridcell`:`cell`}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new D;_dataStream=new D;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new U;viewChange=new _r({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;get renderedRows(){return this._renderRows}constructor(){f(new hb(`role`),{optional:!0})||this._elementRef.nativeElement.setAttribute(`role`,`table`),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName===`TABLE`,this._dataDiffer=this._differs.find([]).create((t,i)=>this.trackBy?this.trackBy(i.dataIndex,i.data):i)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(qt(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new KD:new g$1,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),A6(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(i,a,r)=>this._getEmbeddedViewArgs(i.item,r),i=>i.item.data,i=>{i.operation===Ns.INSERTED&&i.context&&this._renderCellTemplateForItem(i.record.item.rowDef,i.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(i=>{let a=t.get(i.currentIndex);a.context.$implicit=i.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let i=Di(this._headerRowOutlet,`thead`);i&&(i.style.display=e.length?``:`none`)}let t=this._headerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,[`top`]),this._stickyStyler.stickRows(e,t,`top`),this._headerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let i=Di(this._footerRowOutlet,`tfoot`);i&&(i.style.display=e.length?``:`none`)}let t=this._footerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,[`bottom`]),this._stickyStyler.stickRows(e,t,`bottom`),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),i=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...i],[`left`,`right`]),this._stickyColumnStylesNeedReset=!1),e.forEach((a,r)=>{this._addStickyColumnStyles([a],this._headerRowDefs[r])}),this._rowDefs.forEach(a=>{let r=[];for(let c=0;c<t.length;c++)this._renderRows[c].rowDef===a&&r.push(t[c]);this._addStickyColumnStyles(r,a)}),i.forEach((a,r)=>{this._addStickyColumnStyles([a],this._footerRowDefs[r])}),Array.from(this._columnDefsByName.values()).forEach(a=>a.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),i=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let a=this._renderedRange.start;a<t;a++){let r=this._data[a],c=this._getRenderRowsForData(r,a,i.get(r));this._cachedRenderRowsMap.has(r)||this._cachedRenderRowsMap.set(r,new WeakMap);for(let l=0;l<c.length;l++){let f=c[l],w=this._cachedRenderRowsMap.get(f.data);w.has(f.rowDef)?w.get(f.rowDef).push(f):w.set(f.rowDef,[f]),e.push(f)}}return e}_getRenderRowsForData(e,t,i){return this._getRowDefs(e,t).map(r=>{let c=i&&i.has(r)?i.get(r):[];if(c.length){let l=c.shift();return l.dataIndex=t,l}else return{data:e,rowDef:r,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),Ge(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=Ge(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=Ge(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=Ge(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(r,c)=>{let l=!!c.getColumnsDiff();return r||l},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let i=this._headerRowDefs.reduce(e,!1);i&&this._forceRenderHeaderRows();let a=this._footerRowDefs.reduce(e,!1);return a&&this._forceRenderFooterRows(),t||i||a}_switchDataSource(e){this._data=[],A6(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;A6(this.dataSource)?e=this.dataSource.connect(this):Bm(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=Dr(this.dataSource)),this._renderChangeSubscription=yd([e,this.viewChange]).pipe(qt(this._onDestroy)).subscribe(([t,i])=>{this._data=t||[],this._renderedRange=i,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let i=Array.from(t?.columns||[]).map(c=>{return this._columnDefsByName.get(c)}),a=i.map(c=>c.sticky),r=i.map(c=>c.stickyEnd);this._stickyStyler.updateStickyColumns(e,a,r,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let i=0;i<e.viewContainer.length;i++){let a=e.viewContainer.get(i);t.push(a.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let i=[];if(this.multiTemplateDataRows)i=this._rowDefs.filter(a=>!a.when||a.when(t,e));else{let a=this._rowDefs.find(r=>r.when&&r.when(t,e))||this._defaultRowDef;a&&i.push(a)}return i.length,i}_getEmbeddedViewArgs(e,t){let i=e.rowDef,a={$implicit:e.data};return{templateRef:i.template,context:a,index:t}}_renderRow(e,t,i,a={}){let r=e.viewContainer.createEmbeddedView(t.template,a,i);return this._renderCellTemplateForItem(t,a),r}_renderCellTemplateForItem(e,t){for(let i of this._getCellTemplates(e))ne.mostRecentCellOutlet&&ne.mostRecentCellOutlet._viewContainer.createEmbeddedView(i,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,i=e.length;t<i;t++){let r=e.get(t).context;r.count=i,r.first=t===0,r.last=t===i-1,r.even=t%2===0,r.odd=!r.even,this.multiTemplateDataRows?(r.dataIndex=this._renderRows[t].dataIndex,r.renderIndex=t):r.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let i=this._columnDefsByName.get(t);return e.extractCellTemplate(i)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,i)=>t||i.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:`ltr`,t=this._injector;this._stickyStyler=new ht(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:Dr()).pipe(qt(this._onDestroy)).subscribe(i=>{this._stickyStyler.direction=i,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<`u`?xm:Sm;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(va(0,t),qt(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(i,a)=>this._measureRangeSize(i,a)}),yd([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(qt(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let c=a.elements[r];if(c){let l=a.offsets[r],f=i!==0?Math.max(i-l,l):-l;for(let w of c)w.style.top=`${-f}px`}}}),yd([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(qt(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let c=a.elements[r];if(c)for(let l of c)l.style.bottom=`${i+a.offsets[r]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let i=this._noDataRowOutlet.viewContainer;if(t){let a=i.createEmbeddedView(e.templateRef),r=a.rootNodes[0];if(a.rootNodes.length===1&&r?.nodeType===this._document.ELEMENT_NODE){r.setAttribute(`role`,`row`),r.classList.add(...e._contentClassNames);let c=r.querySelectorAll(e._cellSelector);for(let l=0;l<c.length;l++)c[l].classList.add(...e._cellClassNames)}}else i.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!==`vertical`)return 0;let i=this.viewChange.value,a=this._rowOutlet.viewContainer;e.start<i.start||(e.end,i.end);let r=e.start-i.start,c=e.end-e.start,l,f;for(let R=0;R<c;R++){let x=a.get(R+r);if(x&&x.rootNodes.length){l=f=x.rootNodes[0];break}}for(let R=c-1;R>-1;R--){let x=a.get(R+r);if(x&&x.rootNodes.length){f=x.rootNodes[x.rootNodes.length-1];break}}let w=l?.getBoundingClientRect?.(),B=f?.getBoundingClientRect?.();return w&&B?B.bottom-w.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`cdk-table`],[`table`,`cdk-table`,``]],contentQueries:function(t,i,a){if(t&1&&zl(a,Ii,5)(a,me,5)(a,$e,5)(a,ye,5)(a,pt,5),t&2){let r;Oe(r=ke())&&(i._noDataRow=r.first),Oe(r=ke())&&(i._contentColumnDefs=r),Oe(r=ke())&&(i._contentRowDefs=r),Oe(r=ke())&&(i._contentHeaderRowDefs=r),Oe(r=ke())&&(i._contentFooterRowDefs=r)}},hostAttrs:[1,`cdk-table`],hostVars:2,hostBindings:function(t,i){t&2&&de(`cdk-table-fixed-layout`,i.fixedLayout)},inputs:{trackBy:`trackBy`,dataSource:`dataSource`,multiTemplateDataRows:[2,`multiTemplateDataRows`,`multiTemplateDataRows`,ie],fixedLayout:[2,`fixedLayout`,`fixedLayout`,ie],recycleRows:[2,`recycleRows`,`recycleRows`,ie]},outputs:{contentChanged:`contentChanged`},exportAs:[`cdkTable`],features:[De([{provide:q,useExisting:n},{provide:ge,useValue:null}])],ngContentSelectors:Ki,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(t,i){t&1&&(kn$1(Wi),be(0),be(1,1),Me(2,$i,1,0),Me(3,Yi,7,0)(4,Xi,4,0)),t&2&&(me$1(2),Ae(i._isServer?2:-1),me$1(),Ae(i._isNativeHtmlTable?3:4))},dependencies:[gt,_t,vt,yt],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2,changeDetection:1})}return n})();function Ge(n,o){return n.concat(Array.from(o))}function Di(n,o){let e=o.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let i=t.nodeType===1?t.nodeName:null;if(i===e)return t;if(i===`TABLE`)break;t=t.parentNode}return null}var Mi=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=W({type:n});static ɵinj=z({imports:[Mp]})}return n})();var Ji=[[[`caption`]],[[`colgroup`],[`col`]],`*`];var en=[`caption`,`colgroup, col`,`*`];function tn(n,o){n&1&&be(0,2)}function nn(n,o){n&1&&(Se(0,`thead`,0),U_(1,1),Re(),Se(2,`tbody`,2),U_(3,3)(4,4),Re(),Se(5,`tfoot`,0),U_(6,5),Re())}function an(n,o){n&1&&U_(0,1)(1,3)(2,4)(3,5)}var Ta=(()=>{class n extends bt{stickyCssClass=`mat-mdc-table-sticky`;needsPositionStickyOnElement=!1;static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵcmp=he({type:n,selectors:[[`mat-table`],[`table`,`mat-table`,``]],hostAttrs:[1,`mat-mdc-table`,`mdc-data-table__table`],hostVars:2,hostBindings:function(t,i){t&2&&de(`mat-table-fixed-layout`,i.fixedLayout)},exportAs:[`matTable`],features:[De([{provide:bt,useExisting:n},{provide:q,useExisting:n},{provide:ge,useValue:null}]),Q],ngContentSelectors:en,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`role`,`rowgroup`,1,`mdc-data-table__content`],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(t,i){t&1&&(kn$1(Ji),be(0),be(1,1),Me(2,tn,1,0),Me(3,nn,7,0)(4,an,4,0)),t&2&&(me$1(2),Ae(i._isServer?2:-1),me$1(),Ae(i._isNativeHtmlTable?3:4))},dependencies:[gt,_t,vt,yt],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--%NS%mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--%NS%mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--%NS%mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--%NS%mat-table-background-color, var(--%NS%mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-header-container-height, 56px);
  color: var(--%NS%mat-table-header-headline-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-header-headline-font, var(--%NS%mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-header-headline-line-height, var(--%NS%mat-sys-title-small-line-height));
  font-size: var(--%NS%mat-table-header-headline-size, var(--%NS%mat-sys-title-small-size, 14px));
  font-weight: var(--%NS%mat-table-header-headline-weight, var(--%NS%mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--%NS%mat-table-row-item-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-table-row-item-label-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-row-item-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-row-item-label-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-row-item-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-footer-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-footer-supporting-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-footer-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-footer-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-footer-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-table-footer-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-header-headline-tracking, var(--%NS%mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2,changeDetection:1})}return n})();var Aa=(()=>{class n extends We{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matCellDef`,``]],features:[De([{provide:We,useExisting:n}]),Q]})}return n})();var Pa=(()=>{class n extends Ke{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matHeaderCellDef`,``]],features:[De([{provide:Ke,useExisting:n}]),Q]})}return n})();var Ba=(()=>{class n extends me{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matColumnDef`,``]],inputs:{name:[0,`matColumnDef`,`name`]},features:[De([{provide:me,useExisting:n}]),Q]})}return n})();var La=(()=>{class n extends xi{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[`mat-header-cell`],[`th`,`mat-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`mat-mdc-header-cell`,`mdc-data-table__header-cell`],features:[Q]})}return n})();var Ha=(()=>{class n extends Ni{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[`mat-cell`],[`td`,`mat-cell`,``]],hostAttrs:[1,`mat-mdc-cell`,`mdc-data-table__cell`],features:[Q]})}return n})();var za=(()=>{class n extends ye{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matHeaderRowDef`,``]],inputs:{columns:[0,`matHeaderRowDef`,`columns`],sticky:[2,`matHeaderRowDefSticky`,`sticky`,ie]},features:[De([{provide:ye,useExisting:n}]),Q]})}return n})();var Va=(()=>{class n extends $e{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matRowDef`,``]],inputs:{columns:[0,`matRowDefColumns`,`columns`],when:[0,`matRowDefWhen`,`when`]},features:[De([{provide:$e,useExisting:n}]),Q]})}return n})();var ja=(()=>{class n extends ut{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵcmp=he({type:n,selectors:[[`mat-header-row`],[`tr`,`mat-header-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-header-row`,`mdc-data-table__header-row`],exportAs:[`matHeaderRow`],features:[De([{provide:ut,useExisting:n}]),Q],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&U_(0,0)},dependencies:[ne],encapsulation:2,changeDetection:1})}return n})();var qa=(()=>{class n extends ft{static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵcmp=he({type:n,selectors:[[`mat-row`],[`tr`,`mat-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-row`,`mdc-data-table__row`],exportAs:[`matRow`],features:[De([{provide:ft,useExisting:n}]),Q],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&U_(0,0)},dependencies:[ne],encapsulation:2,changeDetection:1})}return n})();var Qa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=W({type:n});static ɵinj=z({imports:[Mi,Ke$1]})}return n})();var sn=[`*`,[[`mat-chip-avatar`],[``,`matChipAvatar`,``]],[[`mat-chip-trailing-icon`],[``,`matChipRemove`,``],[``,`matChipTrailingIcon`,``]]];var cn=[`*`,`mat-chip-avatar, [matChipAvatar]`,`mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]`];function ln(n,o){n&1&&(Se(0,`span`,3),be(1,1),Re())}function dn(n,o){n&1&&(Se(0,`span`,6),be(1,2),Re())}var hn=`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-outline-width, 1px);
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-evolution-chip__action--%NS%primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--%NS%mat-chip-focus-outline-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--%NS%mat-chip-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-chip-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-chip-label-text-size, var(--%NS%mat-sys-label-large-size));
  font-weight: var(--%NS%mat-chip-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-chip-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  height: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--%NS%selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--%NS%mat-chip-trailing-action-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--%NS%mat-chip-trailing-action-focus-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  height: var(--%NS%mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--%NS%mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  height: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  font-size: var(--%NS%mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --%NS%mat-chip-with-icon-icon-color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-elevated-container-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
  --%NS%mat-chip-label-text-color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-outline-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-hover-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-hover-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--%NS%mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--%NS%mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-trailing-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--%NS%mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--%NS%mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-trailing-action-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-selected-trailing-action-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--%NS%mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--%NS%mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`;var mn=[[[``,`matChipEdit`,``]],[[`mat-chip-avatar`],[``,`matChipAvatar`,``]],[[``,`matChipEditInput`,``]],`*`,[[`mat-chip-trailing-icon`],[``,`matChipRemove`,``],[``,`matChipTrailingIcon`,``]]];var pn=[`[matChipEdit]`,`mat-chip-avatar, [matChipAvatar]`,`[matChipEditInput]`,`*`,`mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]`];function un(n,o){n&1&&Qr(0,`span`,0)}function fn(n,o){n&1&&(Se(0,`span`,1),be(1),Re())}function _n(n,o){n&1&&(Se(0,`span`,3),be(1,1),Re())}function gn(n,o){n&1&&be(0,2)}function yn(n,o){n&1&&Qr(0,`span`,7)}function vn(n,o){if(n&1&&Me(0,gn,1,0)(1,yn,1,0,`span`,7),n&2)Ae(On$1().contentEditInput?0:1)}function bn(n,o){n&1&&be(0,3)}function wn(n,o){n&1&&(Se(0,`span`,6),be(1,4),Re())}var Ai=[`*`];var Cn=`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`;var Pi=new g(`mat-chips-default-options`,{providedIn:`root`,factory:()=>({separatorKeyCodes:[13]})});var Ei=new g(`MatChipAvatar`);var Fi=new g(`MatChipTrailingIcon`);var Oi=new g(`MatChipEdit`);var Ct=new g(`MatChipRemove`);var Dt=new g(`MatChip`);var Bi=(()=>{class n{_elementRef=f(L);_parentChip=f(Dt);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(e){this._disabled=e}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?``:null}constructor(){f(st).load(GD),this._elementRef.nativeElement.nodeName===`BUTTON`&&this._elementRef.nativeElement.setAttribute(`type`,`button`)}focus(){this._elementRef.nativeElement.focus()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`matChipContent`,``]],hostAttrs:[1,`mat-mdc-chip-action`,`mdc-evolution-chip__action`,`mdc-evolution-chip__action--presentational`],hostVars:8,hostBindings:function(t,i){t&2&&(Fe(`disabled`,i._getDisabledAttribute())(`aria-disabled`,i.disabled),de(`mdc-evolution-chip__action--primary`,i._isPrimary)(`mdc-evolution-chip__action--secondary`,!i._isPrimary)(`mdc-evolution-chip__action--trailing`,!i._isPrimary&&!i._isLeading))},inputs:{disabled:[2,`disabled`,`disabled`,ie],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?-1:Lh(e)],_allowFocusWhenDisabled:`_allowFocusWhenDisabled`}})}return n})();var Rt=(()=>{class n extends Bi{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matChipAction`,``]],hostVars:3,hostBindings:function(t,i){t&1&&dt(`click`,function(r){return i._handleClick(r)})(`keydown`,function(r){return i._handleKeydown(r)}),t&2&&(Fe(`tabindex`,i._getTabindex()),de(`mdc-evolution-chip__action--presentational`,!1))},features:[Q]})}return n})();var wo=(()=>{class n extends Rt{_isPrimary=!1;_handleClick(e){this.disabled||(e.stopPropagation(),e.preventDefault(),this._parentChip.remove())}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&(e.stopPropagation(),e.preventDefault(),this._parentChip.remove())}static ɵfac=(()=>{let e;return function(i){return(e||(e=He(n)))(i||n)}})();static ɵdir=I({type:n,selectors:[[``,`matChipRemove`,``]],hostAttrs:[`role`,`button`,1,`mat-mdc-chip-remove`,`mat-mdc-chip-trailing-icon`,`mat-focus-indicator`,`mdc-evolution-chip__icon`,`mdc-evolution-chip__icon--trailing`],hostVars:1,hostBindings:function(t,i){t&2&&Fe(`aria-hidden`,null)},features:[De([{provide:Ct,useExisting:n}]),Q]})}return n})();var St=(()=>{class n{_changeDetectorRef=f(pn$1);_elementRef=f(L);_tagName=f(P3);_ngZone=f(C);_focusMonitor=f(Wi$1);_globalRippleOptions=f(wp,{optional:!0});_document=f(M);_onFocus=new D;_onBlur=new D;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=zt();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=f(ze).getId(`mat-mdc-chip-`);ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e}_disabled=!1;removed=new U;destroyed=new U;basicChipAttrName=`mat-basic-chip`;leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=f(zD);_injector=f(F);constructor(){let e=f(st);e.load(GD),e.load(_c),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:`mat-mdc-chip-ripple`,disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(`.mat-mdc-chip-action-label`),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=go(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(e){return this._getActions().find(t=>{let i=t._elementRef.nativeElement;return i===e||i.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{let t=e!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-basic-chip`],[``,`mat-basic-chip`,``],[`mat-chip`],[``,`mat-chip`,``]],contentQueries:function(t,i,a){if(t&1&&zl(a,Ei,5)(a,Oi,5)(a,Fi,5)(a,Ct,5)(a,Ei,5)(a,Fi,5)(a,Oi,5)(a,Ct,5),t&2){let r;Oe(r=ke())&&(i.leadingIcon=r.first),Oe(r=ke())&&(i.editIcon=r.first),Oe(r=ke())&&(i.trailingIcon=r.first),Oe(r=ke())&&(i.removeIcon=r.first),Oe(r=ke())&&(i._allLeadingIcons=r),Oe(r=ke())&&(i._allTrailingIcons=r),Oe(r=ke())&&(i._allEditIcons=r),Oe(r=ke())&&(i._allRemoveIcons=r)}},viewQuery:function(t,i){if(t&1&&ar(Rt,5),t&2){let a;Oe(a=ke())&&(i.primaryAction=a.first)}},hostAttrs:[1,`mat-mdc-chip`],hostVars:31,hostBindings:function(t,i){t&1&&dt(`keydown`,function(r){return i._handleKeydown(r)}),t&2&&(hn$1(`id`,i.id),Fe(`role`,i.role)(`aria-label`,i.ariaLabel),Dh(`mat-`+(i.color||`primary`)),de(`mdc-evolution-chip`,!i._isBasicChip)(`mdc-evolution-chip--disabled`,i.disabled)(`mdc-evolution-chip--with-trailing-action`,i._hasTrailingIcon())(`mdc-evolution-chip--with-primary-graphic`,i.leadingIcon)(`mdc-evolution-chip--with-primary-icon`,i.leadingIcon)(`mdc-evolution-chip--with-avatar`,i.leadingIcon)(`mat-mdc-chip-with-avatar`,i.leadingIcon)(`mat-mdc-chip-highlighted`,i.highlighted)(`mat-mdc-chip-disabled`,i.disabled)(`mat-mdc-basic-chip`,i._isBasicChip)(`mat-mdc-standard-chip`,!i._isBasicChip)(`mat-mdc-chip-with-trailing-icon`,i._hasTrailingIcon())(`_mat-animation-noopable`,i._animationsDisabled))},inputs:{role:`role`,id:`id`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaDescription:[0,`aria-description`,`ariaDescription`],value:`value`,color:`color`,removable:[2,`removable`,`removable`,ie],highlighted:[2,`highlighted`,`highlighted`,ie],disableRipple:[2,`disableRipple`,`disableRipple`,ie],disabled:[2,`disabled`,`disabled`,ie]},outputs:{removed:`removed`,destroyed:`destroyed`},exportAs:[`matChip`],features:[De([{provide:Dt,useExisting:n}])],ngContentSelectors:cn,decls:8,vars:2,consts:[[1,`mat-mdc-chip-focus-overlay`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--primary`],[`matChipContent`,``],[1,`mdc-evolution-chip__graphic`,`mat-mdc-chip-graphic`],[1,`mdc-evolution-chip__text-label`,`mat-mdc-chip-action-label`],[1,`mat-mdc-chip-primary-focus-indicator`,`mat-focus-indicator`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--trailing`]],template:function(t,i){t&1&&(kn$1(sn),Qr(0,`span`,0),Se(1,`span`,1)(2,`span`,2),Me(3,ln,2,0,`span`,3),Se(4,`span`,4),be(5),Qr(6,`span`,5),Re()()(),Me(7,dn,2,0,`span`,6)),t&2&&(me$1(3),Ae(i.leadingIcon?3:-1),me$1(4),Ae(i._hasTrailingIcon()?7:-1))},dependencies:[Bi],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-outline-width, 1px);
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-evolution-chip__action--%NS%primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--%NS%mat-chip-focus-outline-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--%NS%mat-chip-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-chip-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-chip-label-text-size, var(--%NS%mat-sys-label-large-size));
  font-weight: var(--%NS%mat-chip-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-chip-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  height: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--%NS%selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--%NS%mat-chip-trailing-action-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--%NS%mat-chip-trailing-action-focus-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  height: var(--%NS%mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--%NS%mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  height: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  font-size: var(--%NS%mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --%NS%mat-chip-with-icon-icon-color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-elevated-container-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
  --%NS%mat-chip-label-text-color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-outline-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-hover-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-hover-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--%NS%mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--%NS%mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-trailing-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--%NS%mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--%NS%mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-trailing-action-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-selected-trailing-action-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--%NS%mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--%NS%mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})}return n})();var wt=(()=>{class n{_elementRef=f(L);_document=f(M);initialize(e){this.getNativeElement().focus(),this.setValue(e)}getNativeElement(){return this._elementRef.nativeElement}setValue(e){this.getNativeElement().textContent=e,this._moveCursorToEndOfInput()}getValue(){return this.getNativeElement().textContent||``}_moveCursorToEndOfInput(){let e=this._document.createRange();e.selectNodeContents(this.getNativeElement()),e.collapse(!1);let t=window.getSelection();t.removeAllRanges(),t.addRange(e)}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`span`,`matChipEditInput`,``]],hostAttrs:[`role`,`textbox`,`tabindex`,`-1`,`contenteditable`,`true`,1,`mat-chip-edit-input`]})}return n})();var Sn=(()=>{class n extends St{basicChipAttrName=`mat-basic-chip-row`;_renderer=f(ce);_cleanupMousedown;_editStartPending=!1;editable=!1;edited=new U;defaultEditInput;contentEditInput;_alreadyFocused=!1;_isEditing=!1;constructor(){super(),this.role=`row`,this._onBlur.pipe(qt(this.destroyed)).subscribe(()=>{this._isEditing&&!this._editStartPending&&this._onEditFinish(),this._alreadyFocused=!1})}ngAfterViewInit(){super.ngAfterViewInit(),this._cleanupMousedown=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`mousedown`,()=>{this._alreadyFocused=this._hasFocus()}))}ngOnDestroy(){super.ngOnDestroy(),this._cleanupMousedown?.()}_hasLeadingActionIcon(){return!this._isEditing&&!!this.editIcon}_hasTrailingIcon(){return!this._isEditing&&super._hasTrailingIcon()}_handleFocus(){!this._isEditing&&!this.disabled&&this.focus()}_handleKeydown(e){e.keyCode===13&&!this.disabled?this._isEditing?(e.preventDefault(),this._onEditFinish()):this.editable&&this._startEditing(e):this._isEditing?e.stopPropagation():super._handleKeydown(e)}_handleClick(e){!this.disabled&&this.editable&&!this._isEditing&&this._alreadyFocused&&(e.preventDefault(),e.stopPropagation(),this._startEditing(e))}_handleDoubleclick(e){!this.disabled&&this.editable&&this._startEditing(e)}_edit(){this._changeDetectorRef.markForCheck(),this._startEditing()}_startEditing(e){if(!this.primaryAction||this.removeIcon&&e&&this._getSourceAction(e.target)===this.removeIcon)return;let t=this.value;this._isEditing=this._editStartPending=!0,un$1(()=>{this._getEditInput().initialize(t),setTimeout(()=>this._ngZone.run(()=>this._editStartPending=!1))},{injector:this._injector})}_onEditFinish(){this._isEditing=this._editStartPending=!1,this.edited.emit({chip:this,value:this._getEditInput().getValue()}),(this._document.activeElement===this._getEditInput().getNativeElement()||this._document.activeElement===this._document.body)&&this.primaryAction.focus()}_isRippleDisabled(){return super._isRippleDisabled()||this._isEditing}_getEditInput(){return this.contentEditInput||this.defaultEditInput}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-chip-row`],[``,`mat-chip-row`,``],[`mat-basic-chip-row`],[``,`mat-basic-chip-row`,``]],contentQueries:function(t,i,a){if(t&1&&zl(a,wt,5),t&2){let r;Oe(r=ke())&&(i.contentEditInput=r.first)}},viewQuery:function(t,i){if(t&1&&ar(wt,5),t&2){let a;Oe(a=ke())&&(i.defaultEditInput=a.first)}},hostAttrs:[1,`mat-mdc-chip`,`mat-mdc-chip-row`,`mdc-evolution-chip`],hostVars:29,hostBindings:function(t,i){t&1&&dt(`focus`,function(){return i._handleFocus()})(`click`,function(r){return i._hasInteractiveActions()?i._handleClick(r):null})(`dblclick`,function(r){return i._handleDoubleclick(r)}),t&2&&(hn$1(`id`,i.id),Fe(`tabindex`,i.disabled?null:-1)(`aria-label`,null)(`aria-description`,null)(`role`,i.role),de(`mat-mdc-chip-with-avatar`,i.leadingIcon)(`mat-mdc-chip-disabled`,i.disabled)(`mat-mdc-chip-editing`,i._isEditing)(`mat-mdc-chip-editable`,i.editable)(`mdc-evolution-chip--disabled`,i.disabled)(`mdc-evolution-chip--with-leading-action`,i._hasLeadingActionIcon())(`mdc-evolution-chip--with-trailing-action`,i._hasTrailingIcon())(`mdc-evolution-chip--with-primary-graphic`,i.leadingIcon)(`mdc-evolution-chip--with-primary-icon`,i.leadingIcon)(`mdc-evolution-chip--with-avatar`,i.leadingIcon)(`mat-mdc-chip-highlighted`,i.highlighted)(`mat-mdc-chip-with-trailing-icon`,i._hasTrailingIcon()))},inputs:{editable:`editable`},outputs:{edited:`edited`},features:[De([{provide:St,useExisting:n},{provide:Dt,useExisting:n}]),Q],ngContentSelectors:pn,decls:9,vars:8,consts:[[1,`mat-mdc-chip-focus-overlay`],[`role`,`gridcell`,1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--leading`],[`role`,`gridcell`,`matChipAction`,``,1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--primary`,3,`disabled`],[1,`mdc-evolution-chip__graphic`,`mat-mdc-chip-graphic`],[1,`mdc-evolution-chip__text-label`,`mat-mdc-chip-action-label`],[`aria-hidden`,`true`,1,`mat-mdc-chip-primary-focus-indicator`,`mat-focus-indicator`],[`role`,`gridcell`,1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--trailing`],[`matChipEditInput`,``]],template:function(t,i){t&1&&(kn$1(mn),Me(0,un,1,0,`span`,0),Me(1,fn,2,0,`span`,1),Se(2,`span`,2),Me(3,_n,2,0,`span`,3),Se(4,`span`,4),Me(5,vn,2,1)(6,bn,1,0),Qr(7,`span`,5),Re()(),Me(8,wn,2,0,`span`,6)),t&2&&(Ae(i._isEditing?-1:0),me$1(),Ae(i._hasLeadingActionIcon()?1:-1),me$1(),sr(`disabled`,i.disabled),Fe(`aria-description`,i.ariaDescription)(`aria-label`,i.ariaLabel),me$1(),Ae(i.leadingIcon?3:-1),me$1(2),Ae(i._isEditing?5:6),me$1(3),Ae(i._hasTrailingIcon()?8:-1))},dependencies:[Rt,wt],styles:[hn],encapsulation:2})}return n})();var kn=(()=>{class n{_elementRef=f(L);_changeDetectorRef=f(pn$1);_dir=f(Gt,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new D;_defaultRole=`presentation`;get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Wr;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e)}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e))}_getChipStream(e){return this._chips.changes.pipe(At(null),Id(()=>go(...this._chips.map(e))))}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains(`mat-mdc-chip`))return!0;t=t.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(At(this._chips)).subscribe(e=>{let t=[];e.forEach(i=>i._getActions().forEach(a=>t.push(a))),this._chipActions.reset(t),this._chipActions.notifyOnChanges()}),this._keyManager=new vp(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:`ltr`).withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(qt(this._destroyed)).subscribe(({chip:e})=>{let t=e._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t)}),this._dir?.change.pipe(qt(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e))}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(At(null),qt(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(qt(this._destroyed)).subscribe(e=>{let i=this._chips.toArray().indexOf(e.chip),a=e.chip._hasFocus(),r=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),c=a||r;this._isValidIndex(i)&&c&&(this._lastDestroyedFocusedChipIndex=i)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[e];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-chip-set`]],contentQueries:function(t,i,a){if(t&1&&zl(a,St,5),t&2){let r;Oe(r=ke())&&(i._chips=r)}},hostAttrs:[1,`mat-mdc-chip-set`,`mdc-evolution-chip-set`],hostVars:1,hostBindings:function(t,i){t&1&&dt(`keydown`,function(r){return i._handleKeydown(r)}),t&2&&Fe(`role`,i.role)},inputs:{disabled:[2,`disabled`,`disabled`,ie],role:`role`,tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:Lh(e)]},ngContentSelectors:Ai,decls:2,vars:0,consts:[[`role`,`presentation`,1,`mdc-evolution-chip-set__chips`]],template:function(t,i){t&1&&(kn$1(),Bt(0,`div`,0),be(1),Ht())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})}return n})();var kt=class{source;value;constructor(o,e){this.source=o,this.value=e}};var Co=(()=>{class n extends kn{ngControl=f(xt$1,{optional:!0,self:!0});controlType=`mat-chip-grid`;_chipInput;_defaultRole=`grid`;_errorStateTracker;_uid=f(ze).getId(`mat-chip-grid-`);_ariaDescribedbyIds=[];_onTouched=()=>{};_onChange=()=>{};get disabled(){return this.ngControl?!!this.ngControl.disabled:this._disabled}set disabled(e){this._disabled=e,this._syncChipsState(),this.stateChanges.next()}get id(){return this._chipInput?this._chipInput.id:this._uid}get empty(){return(!this._chipInput||this._chipInput.empty)&&(!this._chips||this._chips.length===0)}get placeholder(){return this._chipInput?this._chipInput.placeholder:this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder=``;get focused(){return this._chipInput?.focused||this._hasFocusedChip()}get required(){return this._required??this.ngControl?.control?.hasValidator(Hs.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get shouldLabelFloat(){return!this.empty||this.focused}get value(){return this._value}set value(e){this._value=e}_value=[];get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}get chipBlurChanges(){return this._getChipStream(e=>e._onBlur)}change=new U;valueChange=new U;_chips=void 0;stateChanges=new D;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}constructor(){super();let e=f(im,{optional:!0}),t=f(om,{optional:!0}),i=f(gC),a=f(pC,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._errorStateTracker=new rd(i,a||this.ngControl,t,e,this.stateChanges)}ngAfterContentInit(){this.chipBlurChanges.pipe(qt(this._destroyed)).subscribe(()=>{this._blur(),this.stateChanges.next()}),go(this.chipFocusChanges,this._chips.changes).pipe(qt(this._destroyed)).subscribe(()=>this.stateChanges.next())}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){super.ngOnDestroy(),this.stateChanges.complete()}registerInput(e){this._chipInput=e,this._chipInput.setDescribedByIds(this._ariaDescribedbyIds),this._elementRef.nativeElement.removeAttribute(`aria-describedby`)}onContainerClick(e){!this.disabled&&!this._originatesFromChip(e)&&this.focus()}focus(){if(!(this.disabled||this._chipInput?.focused)){if(!this._chips.length||this._chips.first.disabled){if(!this._chipInput)return;Promise.resolve().then(()=>this._chipInput.focus())}else{let e=this._keyManager.activeItem;e?e.focus():this._keyManager.setFirstItemActive()}this.stateChanges.next()}}get describedByIds(){if(this._chipInput)return this._chipInput.describedByIds||[];let e=this._elementRef.nativeElement.getAttribute(`aria-describedby`);return e?e.split(` `):[]}setDescribedByIds(e){this._ariaDescribedbyIds=e,this._chipInput?this._chipInput.setDescribedByIds(e):e.length?this._elementRef.nativeElement.setAttribute(`aria-describedby`,e.join(` `)):this._elementRef.nativeElement.removeAttribute(`aria-describedby`)}writeValue(e){this._value=e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this.stateChanges.next()}updateErrorState(){this._errorStateTracker.updateErrorState()}_blur(){this.disabled||setTimeout(()=>{this.focused||(this._propagateChanges(),this._markAsTouched())})}_allowFocusEscape(){this._chipInput?.focused||super._allowFocusEscape()}_handleKeydown(e){let t=e.keyCode,i=this._keyManager.activeItem;if(t===9)this._chipInput?.focused&&ur(e,`shiftKey`)&&this._chips.length&&!this._chips.last.disabled?(e.preventDefault(),i?this._keyManager.setActiveItem(i):this._focusLastChip()):super._allowFocusEscape();else if(!this._chipInput?.focused)if((t===38||t===40)&&i){let a=this._chipActions.filter(l=>l._isPrimary===i._isPrimary&&!this._skipPredicate(l)),r=a.indexOf(i),c=e.keyCode===38?-1:1;e.preventDefault(),r>-1&&this._isValidIndex(r+c)&&this._keyManager.setActiveItem(a[r+c])}else super._handleKeydown(e);this.stateChanges.next()}_redirectDestroyedChipFocus(){this._lastDestroyedFocusedChipIndex!==null&&(super._redirectDestroyedChipFocus(),(!this._chips.length||this._chips.length===1&&this._chips.first.disabled)&&this._keyManager.updateActiveItem(-1))}_focusLastChip(){this._chips.length&&this._chips.last.focus()}_propagateChanges(){let e=this._chips.length?this._chips.toArray().map(t=>t.value):[];this._value=e,this.change.emit(new kt(this,e)),this.valueChange.emit(e),this._onChange(e),this._changeDetectorRef.markForCheck()}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-chip-grid`]],contentQueries:function(t,i,a){if(t&1&&zl(a,Sn,5),t&2){let r;Oe(r=ke())&&(i._chips=r)}},hostAttrs:[1,`mat-mdc-chip-set`,`mat-mdc-chip-grid`,`mdc-evolution-chip-set`],hostVars:10,hostBindings:function(t,i){t&1&&dt(`focus`,function(){return i.focus()})(`blur`,function(){return i._blur()}),t&2&&(Fe(`role`,i.role)(`tabindex`,i.disabled||i._chips&&i._chips.length===0?-1:i.tabIndex)(`aria-disabled`,i.disabled.toString())(`aria-invalid`,i.errorState),de(`mat-mdc-chip-list-disabled`,i.disabled)(`mat-mdc-chip-list-invalid`,i.errorState)(`mat-mdc-chip-list-required`,i.required))},inputs:{disabled:[2,`disabled`,`disabled`,ie],placeholder:`placeholder`,required:[2,`required`,`required`,ie],value:`value`,errorStateMatcher:`errorStateMatcher`},outputs:{change:`change`,valueChange:`valueChange`},features:[De([{provide:td,useExisting:n}]),Q],ngContentSelectors:Ai,decls:2,vars:0,consts:[[`role`,`presentation`,1,`mdc-evolution-chip-set__chips`]],template:function(t,i){t&1&&(kn$1(),Bt(0,`div`,0),be(1),Ht())},styles:[Cn],encapsulation:2})}return n})();var So=(()=>{class n{_elementRef=f(L);focused=!1;get chipGrid(){return this._chipGrid}set chipGrid(e){e&&(this._chipGrid=e,this._chipGrid.registerInput(this))}_chipGrid;addOnBlur=!1;separatorKeyCodes;chipEnd=new U;placeholder=``;id=f(ze).getId(`mat-mdc-chip-list-input-`);get disabled(){return this._disabled||this._chipGrid&&this._chipGrid.disabled}set disabled(e){this._disabled=e}_disabled=!1;readonly=!1;disabledInteractive;get empty(){return!this.inputElement.value}inputElement;constructor(){let e=f(Pi),t=f(nd,{optional:!0});this.inputElement=this._elementRef.nativeElement,this.separatorKeyCodes=e.separatorKeyCodes,this.disabledInteractive=e.inputDisabledInteractive??!1,t&&this.inputElement.classList.add(`mat-mdc-form-field-input-control`)}ngOnChanges(){this._chipGrid.stateChanges.next()}ngOnDestroy(){this.chipEnd.complete()}_keydown(e){this.empty&&e.keyCode===8?(e.repeat||this._chipGrid._focusLastChip(),e.preventDefault()):this._emitChipEnd(e)}_blur(){this.addOnBlur&&this._emitChipEnd(),this.focused=!1,this._chipGrid.focused||this._chipGrid._blur(),this._chipGrid.stateChanges.next()}_focus(){this.focused=!0,this._chipGrid.stateChanges.next()}_emitChipEnd(e){(!e||this._isSeparatorKey(e)&&!e.repeat)&&(this.chipEnd.emit({input:this.inputElement,value:this.inputElement.value,chipInput:this}),e?.preventDefault())}_onInput(){this._chipGrid.stateChanges.next()}focus(){this.inputElement.focus()}clear(){this.inputElement.value=``}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}_isSeparatorKey(e){if(!this.separatorKeyCodes)return!1;for(let t of this.separatorKeyCodes){let i,a;typeof t==`number`?(i=t,a=null):(i=t.keyCode,a=t.modifiers);let r=a?.length?ur(e,...a):!ur(e);if(i===e.keyCode&&r)return!0}return!1}_getReadonlyAttribute(){return this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`input`,`matChipInputFor`,``]],hostAttrs:[1,`mat-mdc-chip-input`,`mat-mdc-input-element`,`mdc-text-field__input`,`mat-input-element`],hostVars:8,hostBindings:function(t,i){t&1&&dt(`keydown`,function(r){return i._keydown(r)})(`blur`,function(){return i._blur()})(`focus`,function(){return i._focus()})(`input`,function(){return i._onInput()}),t&2&&(hn$1(`id`,i.id),Fe(`disabled`,i.disabled&&!i.disabledInteractive?``:null)(`placeholder`,i.placeholder||null)(`aria-invalid`,i._chipGrid&&i._chipGrid.ngControl?i._chipGrid.ngControl.invalid:null)(`aria-required`,i._chipGrid&&i._chipGrid.required||null)(`aria-disabled`,i.disabled&&i.disabledInteractive?`true`:null)(`readonly`,i._getReadonlyAttribute())(`required`,i._chipGrid&&i._chipGrid.required||null))},inputs:{chipGrid:[0,`matChipInputFor`,`chipGrid`],addOnBlur:[2,`matChipInputAddOnBlur`,`addOnBlur`,ie],separatorKeyCodes:[0,`matChipInputSeparatorKeyCodes`,`separatorKeyCodes`],placeholder:`placeholder`,id:`id`,disabled:[2,`disabled`,`disabled`,ie],readonly:[2,`readonly`,`readonly`,ie],disabledInteractive:[2,`matChipInputDisabledInteractive`,`disabledInteractive`,ie]},outputs:{chipEnd:`matChipInputTokenEnd`},exportAs:[`matChipInput`,`matChipInputFor`],features:[Le]})}return n})();var ko=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=W({type:n});static ɵinj=z({providers:[gC,{provide:Pi,useValue:{separatorKeyCodes:[13]}}],imports:[YD,Ke$1]})}return n})();var In=[`trigger`];var Mn=[`panel`];var En=[[[`mat-select-trigger`]],`*`];var Fn=[`mat-select-trigger`,`*`];function On(n,o){if(n&1&&(Se(0,`span`,4),Eh(1),Re()),n&2){let e=On$1();me$1(),Zl(e.placeholder)}}function Tn(n,o){n&1&&be(0)}function An(n,o){if(n&1&&(Se(0,`span`,11),Eh(1),Re()),n&2){let e=On$1(2);me$1(),Zl(e.triggerValue)}}function Pn(n,o){if(n&1&&(Se(0,`span`,5),Me(1,Tn,1,0)(2,An,2,1,`span`,11),Re()),n&2){let e=On$1();me$1(),Ae(e.customTrigger?1:2)}}function Bn(n,o){if(n&1){let e=ZN();Se(0,`div`,12,1),dt(`keydown`,function(i){Lg(e);return Vg(On$1()._handleKeydown(i))}),be(2,1),Re()}if(n&2){let e=On$1();Dh(e.panelClass),de(`mat-select-panel-animations-enabled`,!e._animationsDisabled)(`mat-primary`,e._parentFormField?.color===`primary`)(`mat-accent`,e._parentFormField?.color===`accent`)(`mat-warn`,e._parentFormField?.color===`warn`)(`mat-undefined`,!e._parentFormField?.color),Fe(`id`,e.id+`-panel`)(`aria-multiselectable`,e.multiple)(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e._getPanelAriaLabelledby())}}var Ln=new g(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=f(F);return()=>Pp(n)}});var Hn=new g(`MAT_SELECT_CONFIG`);var Li=new g(`MatSelectTrigger`);var xt=class{source;value;constructor(o,e){this.source=o,this.value=e}};var er=(()=>{class n{_viewportRuler=f(Xi$1);_changeDetectorRef=f(pn$1);_elementRef=f(L);_dir=f(Gt,{optional:!0});_idGenerator=f(ze);_renderer=f(ce);_parentFormField=f(nd,{optional:!0});ngControl=f(xt$1,{self:!0,optional:!0});_liveAnnouncer=f(lA);_defaultOptions=f(Hn,{optional:!0});_animationsDisabled=zt();_popoverLocation;_initialized=new D;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=kt$1(e,this.options,this.optionGroups),r=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=Nt(r.offsetTop,r.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new xt(this,e)}_scrollStrategyFactory=f(Ln);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new D;_errorStateTracker;stateChanges=new D;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=pe(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Hs.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=mo(()=>{let e=this.options;return e?e.changes.pipe(At(e),Id(()=>go(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Id(()=>this.optionSelectionChanges))});openedChange=new U;_openedStream=this.openedChange.pipe(ae(e=>e),oe(()=>{}));_closedStream=this.openedChange.pipe(ae(e=>!e),oe(()=>{}));selectionChange=new U;valueChange=new U;constructor(){let e=f(gC),t=f(im,{optional:!0}),i=f(om,{optional:!0}),a=f(new hb(`tabindex`),{optional:!0}),r=f(jp,{optional:!0}),c=f(pC,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new rd(e,c||this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=r?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new d(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(qt(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(qt(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(At(null),qt(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute(`aria-labelledby`,e):i.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(Je(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,a=>{a.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,r=this._keyManager;if(!r.isTyping()&&a&&!ur(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let c=this.selected;r.onKeydown(e);let l=this.selected;l&&c!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,r=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!r&&(i===13||i===32)&&t.activeItem&&!ur(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!r&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let c=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(c?l.select():l.deselect())})}else{let c=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==c&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!ur(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return(i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof kp?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new gp(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=go(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(qt(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),go(...this.options.map(t=>t._stateChanges)).pipe(qt(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=Ye(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-select`]],contentQueries:function(t,i,a){if(t&1&&zl(a,Li,5)(a,J,5)(a,rt,5),t&2){let r;Oe(r=ke())&&(i.customTrigger=r.first),Oe(r=ke())&&(i.options=r),Oe(r=ke())&&(i.optionGroups=r)}},viewQuery:function(t,i){if(t&1&&ar(In,5)(Mn,5)(LA,5),t&2){let a;Oe(a=ke())&&(i.trigger=a.first),Oe(a=ke())&&(i.panel=a.first),Oe(a=ke())&&(i._overlayDir=a.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(t,i){t&1&&dt(`keydown`,function(r){return i._handleKeydown(r)})(`focus`,function(){return i._onFocus()})(`blur`,function(){return i._onBlur()}),t&2&&(Fe(`id`,i.id)(`tabindex`,i.disabled?-1:i.tabIndex)(`aria-controls`,i.panelOpen?i.id+`-panel`:null)(`aria-expanded`,i.panelOpen)(`aria-label`,i.ariaLabel||null)(`aria-required`,i.required.toString())(`aria-disabled`,i.disabled.toString())(`aria-invalid`,i.errorState)(`aria-activedescendant`,i._getAriaActiveDescendant()),de(`mat-mdc-select-disabled`,i.disabled)(`mat-mdc-select-invalid`,i.errorState)(`mat-mdc-select-required`,i.required)(`mat-mdc-select-empty`,i.empty)(`mat-mdc-select-multiple`,i.multiple)(`mat-select-open`,i.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,ie],disableRipple:[2,`disableRipple`,`disableRipple`,ie],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:Lh(e)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,ie],placeholder:`placeholder`,required:[2,`required`,`required`,ie],multiple:[2,`multiple`,`multiple`,ie],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,ie],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,Lh],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,ie]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[De([{provide:td,useExisting:n},{provide:at,useExisting:n}]),Le],ngContentSelectors:Fn,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(t,i){if(t&1&&(kn$1(En),Se(0,`div`,2,0),dt(`click`,function(){return i.open()}),Se(3,`div`,3),Me(4,On,2,1,`span`,4)(5,Pn,3,1,`span`,5),Re(),Se(6,`div`,6)(7,`div`,7),Kg(),Se(8,`svg`,8),Qr(9,`path`,9),Re()()()(),fn$1(10,Bn,3,16,`ng-template`,10),dt(`detach`,function(){return i.close()})(`backdropClick`,function(){return i.close()})(`overlayKeydown`,function(r){return i._handleOverlayKeydown(r)})),t&2){let a=Yl(1);me$1(3),Fe(`id`,i._valueId),me$1(),Ae(i.empty?4:5),me$1(6),sr(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,i._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,i._scrollStrategy)(`cdkConnectedOverlayOrigin`,i._preferredOverlayOrigin||a)(`cdkConnectedOverlayPositions`,i._positions)(`cdkConnectedOverlayWidth`,i._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,i._popoverLocation)}},dependencies:[kp,LA],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return n})();var tr=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`mat-select-trigger`]],features:[De([{provide:Li,useExisting:n}])]})}return n})();var ir=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=W({type:n});static ɵinj=z({imports:[ks,Dt$1,Ke$1,Np,hm,Dt$1]})}return n})();function Xe(n){return{id:n.id,name:n.name,origin:n.origin}}var Hi=class n{supabase=f(Rn).client;table=`fandoms`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(`*`).order(`name`);if(e)throw e;return(o??[]).map(Xe)}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(`*`).eq(`id`,o).maybeSingle();if(t)throw t;return e?Xe(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert({name:o.name,origin:o.origin}).select().single();if(t)throw t;return Xe(e)}async update(o,e){let t={};e.name!==void 0&&(t.name=e.name),e.origin!==void 0&&(t.origin=e.origin);let{data:i,error:a}=await this.supabase.from(this.table).update(t).eq(`id`,o).select().single();if(a)throw a;return Xe(i)}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let[o,e]=await Promise.all([this.supabase.from(`fanfic_fandoms`).select(`fandom_id`),this.supabase.from(`ships`).select(`fandom_id`)]);if(o.error)throw o.error;if(e.error)throw e.error;let t=new Set;for(let i of o.data??[])t.add(i.fandom_id);for(let i of e.data??[])t.add(i.fandom_id);return t}async getUsageCounts(){let{data:o,error:e}=await this.supabase.from(`fanfic_fandoms`).select(`fandom_id`);if(e)throw e;let t=new Map;for(let i of o??[]){let a=i.fandom_id;t.set(a,(t.get(a)??0)+1)}return t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};var we=`*, fandom:fandoms(*)`;function Ce(n){let o=n.fandom;return{id:n.id,characters:n.characters??[],fandom:{id:o.id,name:o.name,origin:o.origin}}}function zi(n){let o={};return n.characters!==void 0&&(o.characters=n.characters),n.fandomId!==void 0&&(o.fandom_id=n.fandomId),o}var Vi=class n{supabase=f(Rn).client;table=`ships`;async getAll(){let{data:o,error:e}=await this.supabase.from(this.table).select(we).order(`id`);if(e)throw e;return(o??[]).map(t=>Ce(t))}async getByFandom(o){let{data:e,error:t}=await this.supabase.from(this.table).select(we).eq(`fandom_id`,o).order(`id`);if(t)throw t;return(e??[]).map(i=>Ce(i))}async getById(o){let{data:e,error:t}=await this.supabase.from(this.table).select(we).eq(`id`,o).maybeSingle();if(t)throw t;return e?Ce(e):null}async create(o){let{data:e,error:t}=await this.supabase.from(this.table).insert(zi(o)).select(we).single();if(t)throw t;return Ce(e)}async update(o,e){let{data:t,error:i}=await this.supabase.from(this.table).update(zi(e)).eq(`id`,o).select(we).single();if(i)throw i;return Ce(t)}async remove(o){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,o);if(e)throw e}async getUsedIds(){let{data:o,error:e}=await this.supabase.from(`fanfic_ships`).select(`ship_id`);if(e)throw e;return new Set((o??[]).map(t=>t.ship_id))}async getUsageCounts(){let{data:o,error:e}=await this.supabase.from(`fanfic_ships`).select(`ship_id`);if(e)throw e;let t=new Map;for(let i of o??[]){let a=i.ship_id;t.set(a,(t.get(a)??0)+1)}return t}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};export{tr as C,za as D,yi as E,qa as S,wo as T,er as _,Hi as a,kn as b,Qa as c,So as d,St as f,bi as g,Vi as h,Ha as i,Si as l,Va as m,Ba as n,La as o,Ta as p,Co as r,Pa as s,Aa as t,Sn as u,ir as v,vi as w,ko as x,ja as y};