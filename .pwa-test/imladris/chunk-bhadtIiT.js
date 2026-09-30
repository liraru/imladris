import{n as l,t as k}from"./chunk-USgBHqPl.js";import{A as Cs,Aa as zl,Ar as de,Bn as W,Bt as Me,Ca as z,Ct as Kg,Da as z_,Et as L,Fi as pn,Gn as Wi,I as De,Ir as f,It as M,J as Et,Ji as st,Jn as Wr,L as Dh,Ln as Vg,M as D,Ma as zt$1,Mr as dt$1,Nt as Lg,Pi as pe,Qt as Os,Rn as Vp,St as Ke,T as C,Tr as ce,Tt as Kq,Vr as g,Wr as go,Xt as Oe,Y as F,Yr as he,Zr as hn,Zt as On,ai as jx,an as Q,bi as me,ci as ke,d as Ae,di as ks,dt as I,ei as ie$1,et as Fe,g as B,gt as Je$1,hr as ar,ia as ur,ii as jt,it as Gt,ji as oi,jt as L_,ka as ze,kn as U,li as kn,ln as Qr,mi as li,mn as Re,mr as ae,or as ZN,p as At,pt as Id,q as Es,qi as sr,qt as Np,ra as un,rn as Pp,rt as GD,t as $,tr as YD,ua as vp,ut as Ht,vn as Se,w as Bt,yr as be,z as Dr,zi as qt$1,zn as Vt,zt as Mc}from"./chunk-DHt8gz8m.js";import{T as Rn}from"./main-MATDT4A4.js";var ut=[[[`mat-icon`],[``,`matMenuItemIcon`,``]],`*`];var ct=[`mat-icon, [matMenuItemIcon]`,`*`];function dt(n,a){n&1&&(Kg(),Se(0,`svg`,2),Qr(1,`polygon`,3),Re())}var ht=[`*`];function ft(n,a){if(n&1){let e=ZN();Bt(0,`div`,0),z_(`click`,function(){Lg(e);return Vg(On().closed.emit(`click`))})(`animationstart`,function(i){Lg(e);return Vg(On()._onAnimationStart(i.animationName))})(`animationend`,function(i){Lg(e);return Vg(On()._onAnimationDone(i.animationName))})(`animationcancel`,function(i){Lg(e);return Vg(On()._onAnimationDone(i.animationName))}),Bt(1,`div`,1),be(2),Ht()()}if(n&2){let e=On();Dh(e._classList),de(`mat-menu-panel-animations-disabled`,e._animationsDisabled)(`mat-menu-panel-exit-animation`,e._panelAnimationState===`void`)(`mat-menu-panel-animating`,e._isAnimating()),hn(`id`,e.panelId),Fe(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e.ariaLabelledby||null)(`aria-describedby`,e.ariaDescribedby||null)}}var ie=new g(`MAT_MENU_PANEL`);var ne=(()=>{class n{_elementRef=f(L);_document=f(M);_focusMonitor=f(Wi);_parentMenu=f(ie,{optional:!0});_changeDetectorRef=f(pn);role=`menuitem`;disabled=!1;disableRipple=!1;_hovered=new D;_focused=new D;_highlighted=!1;_triggersSubmenu=!1;constructor(){f(st).load(GD),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll(`mat-icon, .material-icons`);for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||``}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[``,`mat-menu-item`,``]],hostAttrs:[1,`mat-mdc-menu-item`,`mat-focus-indicator`],hostVars:8,hostBindings:function(t,i){t&1&&dt$1(`click`,function(o){return i._checkDisabled(o)})(`mouseenter`,function(){return i._handleMouseEnter()}),t&2&&(Fe(`role`,i.role)(`tabindex`,i._getTabIndex())(`aria-disabled`,i.disabled)(`disabled`,i.disabled||null),de(`mat-mdc-menu-item-highlighted`,i._highlighted)(`mat-mdc-menu-item-submenu-trigger`,i._triggersSubmenu))},inputs:{role:`role`,disabled:[2,`disabled`,`disabled`,ie$1],disableRipple:[2,`disableRipple`,`disableRipple`,ie$1]},exportAs:[`matMenuItem`],ngContentSelectors:ct,decls:5,vars:3,consts:[[1,`mat-mdc-menu-item-text`],[`matRipple`,``,1,`mat-mdc-menu-ripple`,3,`matRippleDisabled`,`matRippleTrigger`],[`viewBox`,`0 0 5 10`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-mdc-menu-submenu-icon`],[`points`,`0,0 5,5 0,10`]],template:function(t,i){t&1&&(kn(ut),be(0),Se(1,`span`,0),be(2,1),Re(),Qr(3,`div`,1),Me(4,dt,2,0,`:svg:svg`,2)),t&2&&(me(3),sr(`matRippleDisabled`,i.disableRipple||i.disabled)(`matRippleTrigger`,i._getHostElement()),me(),Ae(i._triggersSubmenu?4:-1))},dependencies:[Kq],encapsulation:2})}return n})();var Je=new g(`MatMenuContent`);var Xt=(()=>{class n{_template=f(Et);_appRef=f(jt);_injector=f(F);_viewContainerRef=f(Vt);_document=f(M);_changeDetectorRef=f(pn);_portal;_outlet;_attached=new D;attach(e={}){this._portal||(this._portal=new oi(this._template,this._viewContainerRef)),this.detach(),this._outlet||(this._outlet=new Mc(this._document.createElement(`div`),this._appRef,this._injector));let t=this._template.elementRef.nativeElement;t.parentNode.insertBefore(this._outlet.outletElement,t),this._changeDetectorRef.markForCheck(),this._portal.attach(this._outlet,e),this._attached.next()}detach(){this._portal?.isAttached&&this._portal.detach()}ngOnDestroy(){this.detach(),this._outlet?.dispose()}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[`ng-template`,`matMenuContent`,``]],features:[De([{provide:Je,useExisting:n}])]})}return n})();var pt=new g(`mat-menu-default-options`,{providedIn:`root`,factory:()=>({overlapTrigger:!1,xPosition:`after`,yPosition:`below`,backdropClass:`cdk-overlay-transparent-backdrop`})});var te=`_mat-menu-enter`;var P=`_mat-menu-exit`;var R=(()=>{class n{_elementRef=f(L);_changeDetectorRef=f(pn);_injector=f(F);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=zt$1();_allItems;_directDescendantItems=new Wr;_classList={};_panelAnimationState=`void`;_animationDone=new D;_isAnimating=pe(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,i=k({},this._classList);t&&t.length&&t.split(` `).forEach(s=>{i[s]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(` `).forEach(s=>{i[s]=!0}),this._elementRef.nativeElement.className=``),this._classList=i}_previousPanelClass=``;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new U;close=this.closed;panelId=f(ze).getId(`mat-menu-panel-`);constructor(){let e=f(pt);this.overlayPanelClass=e.overlayPanelClass||``,this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new vp(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit(`tab`)),this._directDescendantItems.changes.pipe(At(this._directDescendantItems),Id(e=>go(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState===`enter`&&t.activeItem?._hasFocus()){let i=e.toArray(),s=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[s]&&!i[s].disabled?t.setActiveItem(s):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(At(this._directDescendantItems),Id(t=>go(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:ur(e)||(e.preventDefault(),this.closed.emit(`keydown`));break;case 37:this.parentMenu&&this.direction===`ltr`&&this.closed.emit(`keydown`);break;case 39:this.parentMenu&&this.direction===`rtl`&&this.closed.emit(`keydown`);break;default:(t===38||t===40)&&i.setFocusOrigin(`keyboard`),i.onKeydown(e);return}}focusFirstItem(e=`program`){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=un(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=l(k({},this._classList),{"mat-menu-before":e===`before`,"mat-menu-after":e===`after`,"mat-menu-above":t===`above`,"mat-menu-below":t===`below`}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===P;(t||e===te)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?`void`:`enter`),this._isAnimating.set(!1))}_onAnimationStart(e){(e===te||e===P)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?`enter`:`void`,e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(P),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?te:P)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(At(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest(`[role="menu"]`)),e}static ɵfac=function(t){return new(t||n)};static ɵcmp=he({type:n,selectors:[[`mat-menu`]],contentQueries:function(t,i,s){if(t&1&&zl(s,Je,5)(s,ne,5)(s,ne,4),t&2){let o;Oe(o=ke())&&(i.lazyContent=o.first),Oe(o=ke())&&(i._allItems=o),Oe(o=ke())&&(i.items=o)}},viewQuery:function(t,i){if(t&1&&ar(Et,5),t&2){let s;Oe(s=ke())&&(i.templateRef=s.first)}},hostVars:3,hostBindings:function(t,i){t&2&&Fe(`aria-label`,null)(`aria-labelledby`,null)(`aria-describedby`,null)},inputs:{backdropClass:`backdropClass`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],xPosition:`xPosition`,yPosition:`yPosition`,overlapTrigger:[2,`overlapTrigger`,`overlapTrigger`,ie$1],hasBackdrop:[2,`hasBackdrop`,`hasBackdrop`,e=>e==null?null:ie$1(e)],panelClass:[0,`class`,`panelClass`],classList:`classList`},outputs:{closed:`closed`,close:`close`},exportAs:[`matMenu`],features:[De([{provide:ie,useExisting:n}])],ngContentSelectors:ht,decls:1,vars:0,consts:[[`tabindex`,`-1`,`role`,`menu`,1,`mat-mdc-menu-panel`,3,`click`,`animationstart`,`animationend`,`animationcancel`,`id`],[1,`mat-mdc-menu-content`]],template:function(t,i){t&1&&(kn(),L_(0,ft,3,12,`ng-template`))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--%NS%mat-menu-item-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-menu-item-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-menu-item-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-menu-item-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-menu-item-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--%NS%mat-menu-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-menu-container-color, var(--%NS%mat-sys-surface-container));
  box-shadow: var(--%NS%mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--%NS%mat-menu-divider-color, var(--%NS%mat-sys-surface-variant));
  margin-bottom: var(--%NS%mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--%NS%mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--%NS%mat-menu-item-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--%NS%mat-menu-item-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--%NS%mat-menu-item-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--%NS%mat-menu-item-spacing, 12px);
  height: var(--%NS%mat-menu-item-icon-size, 24px);
  width: var(--%NS%mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--%NS%mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--%NS%mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--%NS%mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--%NS%mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--%NS%mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--%NS%mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2})}return n})();var gt=new g(`mat-menu-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=f(F);return()=>Pp(n)}});var c=new WeakMap;var _t=(()=>{class n{_canHaveBackdrop;_element=f(L);_viewContainerRef=f(Vt);_menuItemInstance=f(ne,{optional:!0,self:!0});_dir=f(Gt,{optional:!0});_focusMonitor=f(Wi);_ngZone=f(C);_injector=f(F);_scrollStrategy=f(gt);_changeDetectorRef=f(pn);_animationsDisabled=zt$1();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=$.EMPTY;_menuCloseSubscription=$.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t===`click`||t===`tab`)&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=f(ie,{optional:!0});this._parentMaterialMenu=t instanceof R?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&c.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let i=c.get(t);c.set(t,this),i&&i!==this&&i._closeMenu();let s=this._createOverlay(t),o=s.getConfig(),l=o.positionStrategy;this._setPosition(t,l),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??!1,s.hasAttached()||(s.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||`program`),this._setIsMenuOpen(!0),t instanceof R&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(qt$1(t.close)).subscribe(()=>{l.withLockedPosition(!1).reapplyLastPosition(),l.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,i=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof R&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(Je$1(1)).subscribe(()=>{t.detach(),c.has(i)||i.lazyContent?.detach()}),i._setIsOpen(!1)):(t.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&c.delete(i),this.restoreFocus&&(e===`keydown`||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=Os(this._injector,t),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof R&&this._menu._handleKeydown(i)})}return this._overlayRef}_getOverlayConfig(e){return new li({positionStrategy:Vp(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(`.mat-menu-panel, .mat-mdc-menu-panel`),backdropClass:e.backdropClass||`cdk-overlay-transparent-backdrop`,panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||`ltr`,disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let s=i.connectionPair.overlayX===`start`?`after`:`before`,o=i.connectionPair.overlayY===`top`?`below`:`above`;e.setPositionClasses(s,o)})})}_setPosition(e,t){let[i,s]=e.xPosition===`before`?[`end`,`start`]:[`start`,`end`],[o,l]=e.yPosition===`above`?[`bottom`,`top`]:[`top`,`bottom`],[F,E]=[o,l],[N,O]=[i,s],d=0;if(this._triggersSubmenu()){if(O=i=e.xPosition===`before`?`start`:`end`,s=N=i===`end`?`start`:`end`,this._parentMaterialMenu){if(this._parentInnerPadding==null){let ae=this._parentMaterialMenu.items.first;this._parentInnerPadding=ae?ae._getHostElement().offsetTop:0}d=o===`bottom`?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(F=o===`top`?`bottom`:`top`,E=l===`top`?`bottom`:`top`);t.withPositions([{originX:i,originY:F,overlayX:N,overlayY:o,offsetY:d},{originX:s,originY:F,overlayX:O,overlayY:o,offsetY:d},{originX:i,originY:E,overlayX:N,overlayY:l,offsetY:-d},{originX:s,originY:E,overlayX:O,overlayY:l,offsetY:-d}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments();return go(e,this._parentMaterialMenu?this._parentMaterialMenu.closed:Dr(),this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(ae(o=>this._menuOpen&&o!==this._menuItemInstance)):Dr(),t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new oi(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return c.get(e)===this}_triggerIsAriaDisabled(){return ie$1(this._element.nativeElement.getAttribute(`aria-disabled`))}static ɵfac=function(t){jx()};static ɵdir=I({type:n})}return n})();var zt=(()=>{class n extends _t{_cleanupTouchstart;_hoverSubscription=$.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new U;onMenuOpen=this.menuOpened;menuClosed=new U;onMenuClose=this.menuClosed;constructor(){super(!0);let e=f(ce);this._cleanupTouchstart=e.listen(this._element.nativeElement,`touchstart`,t=>{Cs(t)||(this._openedBy=`touch`)},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Es(e)||(this._openedBy=e.button===0?`mouse`:void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy=`keyboard`),this.triggersSubmenu()&&(t===39&&this.dir===`ltr`||t===37&&this.dir===`rtl`)&&(this._openedBy=`keyboard`,this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!==`void`&&(this._openedBy=`mouse`,this._openMenu(!1))}))}static ɵfac=function(t){return new(t||n)};static ɵdir=I({type:n,selectors:[[``,`mat-menu-trigger-for`,``],[``,`matMenuTriggerFor`,``]],hostAttrs:[1,`mat-mdc-menu-trigger`],hostVars:3,hostBindings:function(t,i){t&1&&dt$1(`click`,function(o){return i._handleClick(o)})(`mousedown`,function(o){return i._handleMousedown(o)})(`keydown`,function(o){return i._handleKeydown(o)}),t&2&&Fe(`aria-haspopup`,i.menu?`menu`:null)(`aria-expanded`,i.menuOpen)(`aria-controls`,i.menuOpen?i.menu?.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,`mat-menu-trigger-for`,`_deprecatedMatMenuTriggerFor`],menu:[0,`matMenuTriggerFor`,`menu`],menuData:[0,`matMenuTriggerData`,`menuData`],restoreFocus:[0,`matMenuTriggerRestoreFocus`,`restoreFocus`]},outputs:{menuOpened:`menuOpened`,onMenuOpen:`onMenuOpen`,menuClosed:`menuClosed`,onMenuClose:`onMenuClose`},exportAs:[`matMenuTrigger`],features:[Q]})}return n})();var qt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=W({type:n});static ɵinj=z({imports:[YD,ks,Ke,Np]})}return n})();var et=`
  *,
  fanfic_fandoms(fandom:fandoms(*)),
  fanfic_ships(ship:ships(*, fandom:fandoms(*)))
`;function tt(n){let a=(n.fanfic_fandoms??[]).map(({fandom:t})=>({id:t.id,name:t.name,origin:t.origin})),e=(n.fanfic_ships??[]).map(({ship:t})=>{let i=t.fandom;return{id:t.id,characters:t.characters??[],fandom:{id:i.id,name:i.name,origin:i.origin}}});return{id:n.id,title:n.title,authors:n.authors??[],fandoms:a,ships:e,rating:n.rating,words:n.words,chapters:n.chapters,pages:n.pages??void 0,readingStatus:n.reading_status,releaseDate:n.release_date??void 0,adquisitionDate:n.adquisition_date??void 0,startDate:n.start_date??void 0,finishDate:n.finish_date??void 0,triggerWarnings:n.trigger_warnings??void 0,language:n.language,tags:n.tags??void 0,summary:n.summary??void 0,fileUrl:n.file_url??void 0,originalUrl:n.original_url??void 0,coverUrl:n.cover_url??void 0,notes:n.notes??void 0}}function T(n){if(!n)return null;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,`0`)}-${String(n.getDate()).padStart(2,`0`)}`}function nt(n){let a={};return n.title!==void 0&&(a.title=n.title),n.authors!==void 0&&(a.authors=n.authors),n.rating!==void 0&&(a.rating=n.rating),n.words!==void 0&&(a.words=n.words),n.chapters!==void 0&&(a.chapters=n.chapters),n.pages!==void 0&&(a.pages=n.pages??null),n.readingStatus!==void 0&&(a.reading_status=n.readingStatus),n.releaseDate!==void 0&&(a.release_date=T(n.releaseDate)),n.adquisitionDate!==void 0&&(a.adquisition_date=T(n.adquisitionDate)),n.startDate!==void 0&&(a.start_date=T(n.startDate)),n.finishDate!==void 0&&(a.finish_date=T(n.finishDate)),n.triggerWarnings!==void 0&&(a.trigger_warnings=n.triggerWarnings??[]),n.language!==void 0&&(a.language=n.language),n.tags!==void 0&&(a.tags=n.tags??[]),n.summary!==void 0&&(a.summary=n.summary??null),n.fileUrl!==void 0&&(a.file_url=n.fileUrl??null),n.originalUrl!==void 0&&(a.original_url=n.originalUrl??null),n.coverUrl!==void 0&&(a.cover_url=n.coverUrl??null),n.notes!==void 0&&(a.notes=n.notes??null),a}var it=class n{supabase=f(Rn).client;table=`fanfics`;async getAll(){let{data:a,error:e}=await this.supabase.from(this.table).select(et).order(`title`);if(e)throw e;return(a??[]).map(t=>tt(t))}async getById(a){let{data:e,error:t}=await this.supabase.from(this.table).select(et).eq(`id`,a).maybeSingle();if(t)throw t;return e?tt(e):null}async create(a){let{data:e,error:t}=await this.supabase.from(this.table).insert(nt(a)).select(`id`).single();if(t)throw t;let i=e.id;await this._syncFandoms(i,a.fandomIds),await this._syncShips(i,a.shipIds);let s=await this.getById(i);if(!s)throw new Error(`No se pudo recuperar el fanfic recién creado.`);return s}async update(a,e){let t=nt(e);if(Object.keys(t).length>0){let{error:s}=await this.supabase.from(this.table).update(t).eq(`id`,a);if(s)throw s}e.fandomIds!==void 0&&await this._syncFandoms(a,e.fandomIds),e.shipIds!==void 0&&await this._syncShips(a,e.shipIds);let i=await this.getById(a);if(!i)throw new Error(`No se pudo recuperar el fanfic actualizado.`);return i}async remove(a){let{error:e}=await this.supabase.from(this.table).delete().eq(`id`,a);if(e)throw e}async _syncFandoms(a,e){let{error:t}=await this.supabase.from(`fanfic_fandoms`).delete().eq(`fanfic_id`,a);if(t)throw t;if(e.length===0)return;let{error:i}=await this.supabase.from(`fanfic_fandoms`).insert(e.map(s=>({fanfic_id:a,fandom_id:s})));if(i)throw i}async _syncShips(a,e){let{error:t}=await this.supabase.from(`fanfic_ships`).delete().eq(`fanfic_id`,a);if(t)throw t;if(e.length===0)return;let{error:i}=await this.supabase.from(`fanfic_ships`).insert(e.map(s=>({fanfic_id:a,ship_id:s})));if(i)throw i}static ɵfac=function(e){return new(e||n)};static ɵprov=B({token:n,factory:n.ɵfac,providedIn:`root`})};export{qt as a,ne as i,Xt as n,zt as o,it as r,R as t};