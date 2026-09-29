import{t as k}from"./chunk-USgBHqPl.js";import{$n as Y,$t as Ox,Aa as zl,Ar as de$1,Bn as W,Bt as Me,Ca as z,Cn as TY,Dr as cr,Er as cm,Et as L,G as Eh,Gt as N7,I as De,Ir as f,Ji as st,Kt as NY,Ma as zt,Mr as dt,N as DC,Nr as eZ,Pi as pe$1,Rt as MY,Sn as TE,St as Ke,T as C,Ti as nI,Vr as g,Wr as go,Wt as N6,Xr as hm,Xt as Oe,Y as F,Yr as he$1,Yt as OR,Zt as On,_r as bc,an as Q,b as Bc,bi as me$1,c as AR,ci as ke$1,d as Ae,dt as I,er as YA,et as Fe,ga as xs,gr as b4,hi as lm,hr as ar,jn as UN,k as Ch,l as AY,li as kn,ln as Qr,lr as Zl,m as Ax,ma as x6,mn as Re,n as $N,na as uC,pa as wp,qi as sr,rt as GD,sr as ZY,st as He,t as $$1,tr as YD,ut as Ht$1,vi as mR,vn as Se$1,w as Bt$1,wt as Ki,xn as T7,ya as yE,yr as be$1}from"./chunk-DHt8gz8m.js";import{H as Q$1,c as h}from"./main-MATDT4A4.js";import{n as u,t as f$1}from"./chunk-Cx9co7tx.js";import"./chunk-F_umVNHK.js";var Zt=[`*`];var Yt=[[[``,`mat-card-avatar`,``],[``,`matCardAvatar`,``]],[[`mat-card-title`],[`mat-card-subtitle`],[``,`mat-card-title`,``],[``,`mat-card-subtitle`,``],[``,`matCardTitle`,``],[``,`matCardSubtitle`,``]],`*`];var Jt=[`[mat-card-avatar], [matCardAvatar]`,`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,`*`];var te=new g(`MAT_CARD_CONFIG`);var jt=(()=>{class e{appearance;constructor(){let i=f(te,{optional:!0});this.appearance=i?.appearance||`raised`}static ɵfac=function(t){return new(t||e)};static ɵcmp=he$1({type:e,selectors:[[`mat-card`]],hostAttrs:[1,`mat-mdc-card`,`mdc-card`],hostVars:8,hostBindings:function(t,n){t&2&&de$1(`mat-mdc-card-outlined`,n.appearance===`outlined`)(`mdc-card--outlined`,n.appearance===`outlined`)(`mat-mdc-card-filled`,n.appearance===`filled`)(`mdc-card--filled`,n.appearance===`filled`)},inputs:{appearance:`appearance`},exportAs:[`matCard`],ngContentSelectors:Zt,decls:1,vars:0,template:function(t,n){t&1&&(kn(),be$1(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-elevated-container-elevation, var(--%NS%mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--%NS%mat-card-outlined-container-color, var(--%NS%mat-sys-surface));
  border-radius: var(--%NS%mat-card-outlined-container-shape, var(--%NS%mat-sys-corner-medium));
  border-width: var(--%NS%mat-card-outlined-outline-width, 1px);
  border-color: var(--%NS%mat-card-outlined-outline-color, var(--%NS%mat-sys-outline-variant));
  box-shadow: var(--%NS%mat-card-outlined-container-elevation, var(--%NS%mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--%NS%mat-card-filled-container-color, var(--%NS%mat-sys-surface-container-highest));
  border-radius: var(--%NS%mat-card-filled-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-filled-container-elevation, var(--%NS%mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--%NS%mat-card-title-text-font, var(--%NS%mat-sys-title-large-font));
  line-height: var(--%NS%mat-card-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-size: var(--%NS%mat-card-title-text-size, var(--%NS%mat-sys-title-large-size));
  letter-spacing: var(--%NS%mat-card-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
  font-weight: var(--%NS%mat-card-title-text-weight, var(--%NS%mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--%NS%mat-card-subtitle-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-card-subtitle-text-font, var(--%NS%mat-sys-title-medium-font));
  line-height: var(--%NS%mat-card-subtitle-text-line-height, var(--%NS%mat-sys-title-medium-line-height));
  font-size: var(--%NS%mat-card-subtitle-text-size, var(--%NS%mat-sys-title-medium-size));
  letter-spacing: var(--%NS%mat-card-subtitle-text-tracking, var(--%NS%mat-sys-title-medium-tracking));
  font-weight: var(--%NS%mat-card-subtitle-text-weight, var(--%NS%mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})}return e})();var Bt=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[`mat-card-title`],[``,`mat-card-title`,``],[``,`matCardTitle`,``]],hostAttrs:[1,`mat-mdc-card-title`]})}return e})();var Vt=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[`mat-card-content`]],hostAttrs:[1,`mat-mdc-card-content`]})}return e})();var Ht=(()=>{class e{align=`start`;static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[`mat-card-actions`]],hostAttrs:[1,`mat-mdc-card-actions`,`mdc-card__actions`],hostVars:2,hostBindings:function(t,n){t&2&&de$1(`mat-mdc-card-actions-align-end`,n.align===`end`)},inputs:{align:`align`},exportAs:[`matCardActions`]})}return e})();var Qt=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵcmp=he$1({type:e,selectors:[[`mat-card-header`]],hostAttrs:[1,`mat-mdc-card-header`],ngContentSelectors:Jt,decls:4,vars:0,consts:[[1,`mat-mdc-card-header-text`]],template:function(t,n){t&1&&(kn(Yt),be$1(0),Bt$1(1,`div`,0),be$1(2,1),Ht$1(),be$1(3,2))},encapsulation:2})}return e})();var qt=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵmod=W({type:e});static ɵinj=z({imports:[Ke]})}return e})();var ie=[`*`];var ne=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--%NS%mat-list-list-item-container-color, transparent);
  border-radius: var(--%NS%mat-list-list-item-container-shape, var(--%NS%mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--%NS%mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--%NS%mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--%NS%mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--%NS%mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--%NS%selected::before, .mdc-list-item.mdc-list-item--%NS%selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--%NS%with-leading-icon:hover .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
  height: var(--%NS%mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--%NS%mat-list-list-item-trailing-supporting-text-font, var(--%NS%mat-sys-label-small-font));
  line-height: var(--%NS%mat-list-list-item-trailing-supporting-text-line-height, var(--%NS%mat-sys-label-small-line-height));
  font-size: var(--%NS%mat-list-list-item-trailing-supporting-text-size, var(--%NS%mat-sys-label-small-size));
  font-weight: var(--%NS%mat-list-list-item-trailing-supporting-text-weight, var(--%NS%mat-sys-label-small-weight));
  letter-spacing: var(--%NS%mat-list-list-item-trailing-supporting-text-tracking, var(--%NS%mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
  width: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
  height: var(--%NS%mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--%NS%with-trailing-icon:hover .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-trailing-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-selected-trailing-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--%NS%mat-list-list-item-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-list-list-item-label-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-list-list-item-label-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-list-list-item-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-list-list-item-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-list-list-item-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-focus-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--%NS%mat-list-list-item-supporting-text-color, var(--%NS%mat-sys-on-surface-variant));
  font-family: var(--%NS%mat-list-list-item-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-list-list-item-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-list-list-item-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-list-list-item-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-list-list-item-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--%NS%mat-list-list-item-disabled-leading-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--%NS%mat-list-list-item-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--%NS%mat-list-list-item-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--%NS%mat-list-list-item-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--%NS%disabled::before {
  background-color: var(--%NS%mat-list-list-item-disabled-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-disabled-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--%NS%mat-list-list-item-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-list-list-item-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--%NS%mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--%NS%mat-list-list-item-leading-avatar-shape, var(--%NS%mat-sys-corner-full));
  background-color: var(--%NS%mat-list-list-item-leading-avatar-color, var(--%NS%mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--%NS%mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--%NS%activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--%NS%mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--%NS%mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-list-active-indicator-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--%NS%mat-list-active-indicator-color, var(--%NS%mat-sys-secondary-container));
}
`;var ae=[`unscopedContent`];var oe=[`text`];var re=[[[``,`matListItemAvatar`,``],[``,`matListItemIcon`,``]],[[``,`matListItemTitle`,``]],[[``,`matListItemLine`,``]],`*`,[[``,`matListItemMeta`,``]],[[`mat-divider`]]];var ce=[`[matListItemAvatar],[matListItemIcon]`,`[matListItemTitle]`,`[matListItemLine]`,`*`,`[matListItemMeta]`,`mat-divider`];var se=new g(`ListOption`);var U=(()=>{class e{_elementRef=f(L);static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[``,`matListItemTitle`,``]],hostAttrs:[1,`mat-mdc-list-item-title`,`mdc-list-item__primary-text`]})}return e})();var K=(()=>{class e{_elementRef=f(L);static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[``,`matListItemLine`,``]],hostAttrs:[1,`mat-mdc-list-item-line`,`mdc-list-item__secondary-text`]})}return e})();var le=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,selectors:[[``,`matListItemMeta`,``]],hostAttrs:[1,`mat-mdc-list-item-meta`,`mdc-list-item__end`]})}return e})();var Gt=(()=>{class e{_listOption=f(se,{optional:!0});_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()===`after`}static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,hostVars:4,hostBindings:function(t,n){t&2&&de$1(`mdc-list-item__start`,n._isAlignedAtStart())(`mdc-list-item__end`,!n._isAlignedAtStart())}})}return e})();var me=(()=>{class e extends Gt{static ɵfac=(()=>{let i;return function(n){return(i||(i=He(e)))(n||e)}})();static ɵdir=I({type:e,selectors:[[``,`matListItemAvatar`,``]],hostAttrs:[1,`mat-mdc-list-item-avatar`],features:[Q]})}return e})();var de=(()=>{class e extends Gt{static ɵfac=(()=>{let i;return function(n){return(i||(i=He(e)))(n||e)}})();static ɵdir=I({type:e,selectors:[[``,`matListItemIcon`,``]],hostAttrs:[1,`mat-mdc-list-item-icon`],features:[Q]})}return e})();var he=new g(`MAT_LIST_CONFIG`);var $=(()=>{class e{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(i){this._disableRipple=Ki(i)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(i){this._disabled.set(Ki(i))}_disabled=pe$1(!1);_defaultOptions=f(he,{optional:!0});static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,hostVars:1,hostBindings:function(t,n){t&2&&Fe(`aria-disabled`,n.disabled)},inputs:{disableRipple:`disableRipple`,disabled:`disabled`}})}return e})();var pe=(()=>{class e{_elementRef=f(L);_ngZone=f(C);_listBase=f($,{optional:!0});_platform=f(Y);_hostElement;_isButtonElement;_noopAnimations=zt();_avatars;_icons;set lines(i){this._explicitLines=cr(i,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(i){this._disableRipple=Ki(i)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(i){this._disabled.set(Ki(i))}_disabled=pe$1(!1);_subscriptions=new $$1;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){f(st).load(GD);let i=f(wp,{optional:!0});this.rippleConfig=i||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()===`button`,this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute(`type`)&&this._hostElement.setAttribute(`type`,`button`)}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add(`mat-mdc-list-item-interactive`),this._rippleRenderer=new xs(this,this._ngZone,this._hostElement,this._platform,f(F)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(go(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(i){if(!this._lines||!this._titles||!this._unscopedContent)return;i&&this._checkDomForUnscopedTextContent();let t=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle(`mat-mdc-list-item-single-line`,t<=1),this._hostElement.classList.toggle(`mdc-list-item--with-one-line`,t<=1),this._hostElement.classList.toggle(`mdc-list-item--with-two-lines`,t===2),this._hostElement.classList.toggle(`mdc-list-item--with-three-lines`,t===3),this._hasUnscopedTextContent){let l=this._titles.length===0&&t===1;n.classList.toggle(`mdc-list-item__primary-text`,l),n.classList.toggle(`mdc-list-item__secondary-text`,!l)}else n.classList.remove(`mdc-list-item__primary-text`),n.classList.remove(`mdc-list-item__secondary-text`)}_inferLinesFromContent(){let i=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(i+=1),i}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(i=>i.nodeType!==i.COMMENT_NODE).some(i=>!!(i.textContent&&i.textContent.trim()))}static ɵfac=function(t){return new(t||e)};static ɵdir=I({type:e,contentQueries:function(t,n,l){if(t&1&&zl(l,me,4)(l,de,4),t&2){let u;Oe(u=ke$1())&&(n._avatars=u),Oe(u=ke$1())&&(n._icons=u)}},hostVars:4,hostBindings:function(t,n){t&2&&(Fe(`aria-disabled`,n.disabled)(`disabled`,n._isButtonElement&&n.disabled||null),de$1(`mdc-list-item--disabled`,n.disabled))},inputs:{lines:`lines`,disableRipple:`disableRipple`,disabled:`disabled`}})}return e})();var $t=(()=>{class e extends ${static ɵfac=(()=>{let i;return function(n){return(i||(i=He(e)))(n||e)}})();static ɵcmp=he$1({type:e,selectors:[[`mat-list`]],hostAttrs:[1,`mat-mdc-list`,`mat-mdc-list-base`,`mdc-list`],exportAs:[`matList`],features:[De([{provide:$,useExisting:e}]),Q],ngContentSelectors:ie,decls:1,vars:0,template:function(t,n){t&1&&(kn(),be$1(0))},styles:[ne],encapsulation:2})}return e})();var Ut=(()=>{class e extends pe{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(i){this._activated=Ki(i)}_activated=!1;_getAriaCurrent(){return this._hostElement.nodeName===`A`&&this._activated?`page`:null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static ɵfac=(()=>{let i;return function(n){return(i||(i=He(e)))(n||e)}})();static ɵcmp=he$1({type:e,selectors:[[`mat-list-item`],[`a`,`mat-list-item`,``],[`button`,`mat-list-item`,``]],contentQueries:function(t,n,l){if(t&1&&zl(l,K,5)(l,U,5)(l,le,5),t&2){let u;Oe(u=ke$1())&&(n._lines=u),Oe(u=ke$1())&&(n._titles=u),Oe(u=ke$1())&&(n._meta=u)}},viewQuery:function(t,n){if(t&1&&ar(ae,5)(oe,5),t&2){let l;Oe(l=ke$1())&&(n._unscopedContent=l.first),Oe(l=ke$1())&&(n._itemText=l.first)}},hostAttrs:[1,`mat-mdc-list-item`,`mdc-list-item`],hostVars:13,hostBindings:function(t,n){t&2&&(Fe(`aria-current`,n._getAriaCurrent()),de$1(`mdc-list-item--activated`,n.activated)(`mdc-list-item--with-leading-avatar`,n._avatars.length!==0)(`mdc-list-item--with-leading-icon`,n._icons.length!==0)(`mdc-list-item--with-trailing-meta`,n._meta.length!==0)(`mat-mdc-list-item-both-leading-and-trailing`,n._hasBothLeadingAndTrailing())(`_mat-animation-noopable`,n._noopAnimations))},inputs:{activated:`activated`},exportAs:[`matListItem`],features:[Q],ngContentSelectors:ce,decls:10,vars:0,consts:[[`unscopedContent`,``],[1,`mdc-list-item__content`],[1,`mat-mdc-list-item-unscoped-content`,3,`cdkObserveContent`],[1,`mat-focus-indicator`]],template:function(t,n){t&1&&(kn(re),be$1(0),Se$1(1,`span`,1),be$1(2,1),be$1(3,2),Se$1(4,`span`,2,0),dt(`cdkObserveContent`,function(){return n._updateItemLines(!0)}),be$1(6,3),Re()(),be$1(7,4),be$1(8,5),Qr(9,`div`,3))},dependencies:[b4],encapsulation:2})}return e})();var Kt=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵmod=W({type:e});static ɵinj=z({imports:[bc,YD,h,Ke,f$1]})}return e})();var H=class e{dialogRef=f(Bc);data=f(YA);onCancel(){this.dialogRef.close(!1)}onConfirm(){this.dialogRef.close(!0)}static ɵfac=function(i){return new(i||e)};static ɵcmp=he$1({type:e,selectors:[[`app-confirm-dialog`]],decls:12,vars:5,consts:[[1,`dialog-mark`],[`mat-dialog-title`,``],[`align`,`end`],[`mat-button`,``,`type`,`button`,3,`click`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`color`]],template:function(i,t){i&1&&(Se$1(0,`div`,0),Eh(1,`⁂`),Re(),Se$1(2,`h2`,1),Eh(3),Re(),Se$1(4,`mat-dialog-content`)(5,`p`),Eh(6),Re()(),Se$1(7,`mat-dialog-actions`,2)(8,`button`,3),dt(`click`,function(){return t.onCancel()}),Eh(9),Re(),Se$1(10,`button`,4),dt(`click`,function(){return t.onConfirm()}),Eh(11),Re()()),i&2&&(me$1(3),Zl(t.data.title),me$1(3),Zl(t.data.message),me$1(3),Ch(` `,t.data.cancelText??`Cancelar`,` `),me$1(),sr(`color`,t.data.confirmColor??`primary`),me$1(),Ch(` `,t.data.confirmText??`Aceptar`,` `))},dependencies:[AY,NY,MY,TY,N6,x6],encapsulation:2})};var be=(e,o)=>o.time+o.detail;function fe(e,o){if(e&1&&(Se$1(0,`p`,10),Eh(1),Re()),e&2){let i=On();me$1(),Zl(i.errorPaginas())}}function ve(e,o){if(e&1&&(Se$1(0,`p`,11)(1,`strong`),Eh(2),Re(),Qr(3,`br`),Eh(4,` (palabras ÷ 300) + (capítulos × 0.6) `),Re()),e&2){let i=On();me$1(2),Ch(`Páginas estimadas: `,i.fmt(i.resultPaginasValue()))}}function xe(e,o){if(e&1&&(Se$1(0,`p`,10),Eh(1),Re()),e&2){let i=On();me$1(),Zl(i.errorPagina())}}function ye(e,o){if(e&1&&(Se$1(0,`p`,11)(1,`strong`),Eh(2),Re(),Qr(3,`br`),Eh(4),Re()),e&2){let i=o,t=On();me$1(2),Ch(`Estás en la página `,t.fmt(i.pagina)),me$1(2),Ch(` `,i.sub,` `)}}function ke(e,o){e&1&&(Se$1(0,`p`,18),Eh(1,`Aún no hay cálculos guardados.`),Re())}function we(e,o){if(e&1&&(Se$1(0,`mat-list-item`),Qr(1,`span`,24),Se$1(2,`span`,25),Eh(3),Re()(),Qr(4,`mat-divider`)),e&2){let i=o.$implicit;me$1(),sr(`innerHTML`,i.detail,nI),me$1(2),Zl(i.time)}}function Se(e,o){if(e&1&&(Se$1(0,`mat-list`),UN(1,we,5,2,null,null,be),Re()),e&2){let i=On();me$1(),$N(i.historyReversed())}}var Xt=`folio:kindle-data`;var Ce={totalPages:null,totalPosition:null,history:[]};var Wt=class e{dialog=f(yE);palabras=pe$1(null);capitulos=pe$1(null);resultPaginasValue=pe$1(null);errorPaginas=pe$1(null);posicionActual=pe$1(null);posicionTotal=pe$1(null);paginasTotalesStored=pe$1(null);resultPagina=pe$1(null);errorPagina=pe$1(null);history=pe$1([]);constructor(){this.loadState()}loadState(){try{let o=localStorage.getItem(Xt);if(o){let i=JSON.parse(o),t=k(k({},Ce),i);this.posicionTotal.set(t.totalPosition),this.paginasTotalesStored.set(t.totalPages),this.history.set(t.history??[])}}catch(o){console.warn(`No se pudo leer el almacenamiento local:`,o)}}saveState(){let o={totalPages:this.paginasTotalesStored(),totalPosition:this.posicionTotal(),history:this.history()};try{localStorage.setItem(Xt,JSON.stringify(o))}catch(i){console.error(`No se pudo guardar el estado:`,i),this.errorPaginas.set(`No se ha podido guardar el dato en este navegador (¿modo incógnito o almacenamiento bloqueado?).`)}}fmt(o){return new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:0}).format(o)}addHistory(o){let i=new Date().toLocaleString(`es-ES`,{day:`2-digit`,month:`2-digit`,hour:`2-digit`,minute:`2-digit`}),t=[...this.history(),{detail:o,time:i}];t.length>40&&t.shift(),this.history.set(t)}historyReversed(){return[...this.history()].reverse()}async showConfirmModal(o){return await DC(this.dialog.open(H,{data:o,autoFocus:`dialog`}).afterClosed())===!0}async calcularPaginas(){let o=this.palabras(),i=this.capitulos();if(this.errorPaginas.set(null),o==null||!Number.isFinite(o)||o<0||i==null||!Number.isFinite(i)||i<0){this.errorPaginas.set(`Introduce el número de palabras y de capítulos (valores válidos y positivos).`);return}let t=Math.ceil(o/300+i*.6);this.resultPaginasValue.set(t),await this.showConfirmModal({title:`${this.fmt(t)} p\xE1ginas`,message:`¿Quieres guardar este valor como páginas totales para usarlo en el cálculo de la página actual? Si no, se queda solo como resultado de esta consulta.`,confirmText:`Guardar y usar`,cancelText:`Solo ver resultado`,confirmColor:`tertiary`})?(this.paginasTotalesStored.set(t),this.saveState(),this.addHistory(`<strong>${this.fmt(t)} p\xE1ginas</strong> \xB7 ${this.fmt(o)} palabras, ${this.fmt(i)} cap\xEDtulos <em>(guardado)</em>`)):(this.addHistory(`${this.fmt(t)} p\xE1ginas \xB7 ${this.fmt(o)} palabras, ${this.fmt(i)} cap\xEDtulos <em>(sin guardar)</em>`),this.saveState())}calcularPaginaActual(){let o=this.posicionActual(),i=this.posicionTotal(),t=this.paginasTotalesStored();if(this.errorPagina.set(null),o==null||!Number.isFinite(o)||o<0){this.errorPagina.set(`Introduce tu posición actual del Kindle.`);return}if(i==null||!Number.isFinite(i)||i<=0||t==null||!Number.isFinite(t)||t<=0){this.errorPagina.set(`Faltan la posición total o las páginas totales. Complétalas (o calcúlalas primero en el bloque I).`);return}let n=Math.round(o/(i/t));this.saveState(),this.resultPagina.set({pagina:n,sub:`de ${this.fmt(t)} p\xE1ginas \xB7 posici\xF3n ${this.fmt(o)} de ${this.fmt(i)}`}),this.addHistory(`<strong>P\xE1gina ${this.fmt(n)}</strong> de ${this.fmt(t)} \xB7 pos. ${this.fmt(o)}/${this.fmt(i)}`),this.saveState()}onPosicionTotalChange(){this.saveState()}onPaginasTotalesStoredChange(){this.saveState()}async vaciarHistorial(){!this.history().length||!await this.showConfirmModal({title:`Vaciar historial`,message:`Esta acción no se puede deshacer. ¿Seguro que quieres borrar todo el historial?`,confirmText:`Vaciar`,cancelText:`Cancelar`,confirmColor:`secondary`})||(this.history.set([]),this.saveState())}async reiniciar(){await this.showConfirmModal({title:`Reiniciar valores`,message:`¿Seguro que quieres reiniciar la posición total y las páginas totales guardadas?`,confirmText:`Reiniciar`,cancelText:`Cancelar`,confirmColor:`secondary`})&&(this.posicionTotal.set(null),this.paginasTotalesStored.set(null),this.saveState(),this.resultPaginasValue.set(null),this.resultPagina.set(null))}static ɵfac=function(i){return new(i||e)};static ɵcmp=he$1({type:e,selectors:[[`app-pages-calculator`]],decls:73,vars:10,consts:[[1,`container`,`calculator-page`],[1,`page-header`],[1,`heading`],[1,`calculator-page__subtitle`],[1,`calculator-controllers-container`,`grid`],[`appearance`,`outlined`,1,`col-12`,`col-lg-4`],[1,`pages-form`],[`appearance`,`outline`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`1`,`inputmode`,`numeric`,`placeholder`,`ej. 95000`,3,`ngModelChange`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`1`,`inputmode`,`numeric`,`placeholder`,`ej. 24`,3,`ngModelChange`,`ngModel`],[1,`calculator-error`],[1,`calculator-result`],[`mat-flat-button`,``,`color`,`primary`,`type`,`button`,3,`click`],[`appearance`,`outlined`,1,`col-12`,`col-lg-8`],[1,`kindle-position-form`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`1`,`inputmode`,`numeric`,`placeholder`,`ej. 3120`,3,`ngModelChange`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`1`,`inputmode`,`numeric`,`placeholder`,`ej. 6840`,3,`ngModelChange`,`change`,`ngModel`],[`matInput`,``,`type`,`number`,`min`,`0`,`step`,`1`,`inputmode`,`numeric`,`placeholder`,`del bloque I`,3,`ngModelChange`,`change`,`ngModel`],[1,`calculator-hint`],[`appearance`,`outlined`,1,`calculator-history`],[`mat-button`,``,`color`,`secondary`,`type`,`button`,3,`click`],[1,`calculator-reset`],[`mat-stroked-button`,``,`color`,`secondary`,`type`,`button`,3,`click`],[1,`calculator-footnote`],[`matListItemTitle`,``,3,`innerHTML`],[`matListItemLine`,``]],template:function(i,t){if(i&1&&(Se$1(0,`div`,0)(1,`header`,1)(2,`div`,2)(3,`h1`),Eh(4,`Calculadora de lectura`),Re()()(),Se$1(5,`p`,3),Eh(6,` Estima las páginas de un libro y sigue tu progreso real en el Kindle. `),Re(),Se$1(7,`div`,4)(8,`mat-card`,5)(9,`mat-card-header`)(10,`mat-card-title`),Eh(11,`I. Páginas totales`),Re()(),Se$1(12,`mat-card-content`)(13,`div`,6)(14,`mat-form-field`,7)(15,`mat-label`),Eh(16,`Palabras totales`),Re(),Se$1(17,`input`,8),dt(`ngModelChange`,function(l){return t.palabras.set(l)}),Re(),Ax(),Re(),Se$1(18,`mat-form-field`,7)(19,`mat-label`),Eh(20,`Nº de capítulos`),Re(),Se$1(21,`input`,9),dt(`ngModelChange`,function(l){return t.capitulos.set(l)}),Re(),Ax(),Re()(),Me(22,fe,2,1,`p`,10),Me(23,ve,5,1,`p`,11),Re(),Se$1(24,`mat-card-actions`)(25,`button`,12),dt(`click`,function(){return t.calcularPaginas()}),Eh(26,` Calcular páginas `),Re()()(),Se$1(27,`mat-card`,13)(28,`mat-card-header`)(29,`mat-card-title`),Eh(30,`II. Página actual`),Re()(),Se$1(31,`mat-card-content`)(32,`div`,14)(33,`mat-form-field`,7)(34,`mat-label`),Eh(35,`Posición actual (Kindle)`),Re(),Se$1(36,`input`,15),dt(`ngModelChange`,function(l){return t.posicionActual.set(l)}),Re(),Ax(),Re(),Se$1(37,`mat-form-field`,7)(38,`mat-label`),Eh(39,`Posición total`),Re(),Se$1(40,`input`,16),dt(`ngModelChange`,function(l){return t.posicionTotal.set(l)})(`change`,function(){return t.onPosicionTotalChange()}),Re(),Ax(),Se$1(41,`mat-hint`),Eh(42,`Guardado`),Re()(),Se$1(43,`mat-form-field`,7)(44,`mat-label`),Eh(45,`Páginas totales`),Re(),Se$1(46,`input`,17),dt(`ngModelChange`,function(l){return t.paginasTotalesStored.set(l)})(`change`,function(){return t.onPaginasTotalesStoredChange()}),Re(),Ax(),Se$1(47,`mat-hint`),Eh(48,`Guardado`),Re()()(),Se$1(49,`p`,18),Eh(50,` Estos dos valores se recuerdan entre visitas. Se rellenan solos al calcular en el bloque I, pero puedes editarlos a mano en cualquier momento. `),Re(),Me(51,xe,2,1,`p`,10),Me(52,ye,5,2,`p`,11),Re(),Se$1(53,`mat-card-actions`)(54,`button`,12),dt(`click`,function(){return t.calcularPaginaActual()}),Eh(55,` Calcular página actual `),Re()()()(),Se$1(56,`mat-card`,19)(57,`mat-card-header`)(58,`mat-card-title`),Eh(59,`Historial`),Re()(),Se$1(60,`mat-card-content`),Me(61,ke,2,0,`p`,18)(62,Se,3,0,`mat-list`),Re(),Se$1(63,`mat-card-actions`)(64,`button`,20),dt(`click`,function(){return t.vaciarHistorial()}),Eh(65,` Vaciar historial `),Re()()(),Se$1(66,`div`,21)(67,`button`,22),dt(`click`,function(){return t.reiniciar()}),Eh(68,` Reiniciar posición y páginas totales `),Re(),Se$1(69,`p`,18),Eh(70,` Borra únicamente la posición total y las páginas totales guardadas. El historial no se ve afectado. `),Re()(),Se$1(71,`p`,23),Eh(72,`Los datos se guardan de forma persistente en este dispositivo.`),Re()()),i&2){let n;me$1(17),sr(`ngModel`,t.palabras()),Ox(),me$1(4),sr(`ngModel`,t.capitulos()),Ox(),me$1(),Ae(t.errorPaginas()?22:-1),me$1(),Ae(t.resultPaginasValue()!==null?23:-1),me$1(13),sr(`ngModel`,t.posicionActual()),Ox(),me$1(4),sr(`ngModel`,t.posicionTotal()),Ox(),me$1(6),sr(`ngModel`,t.paginasTotalesStored()),Ox(),me$1(5),Ae(t.errorPagina()?51:-1),me$1(),Ae((n=t.resultPagina())?52:-1,n),me$1(9),Ae(t.history().length===0?61:62)}},dependencies:[eZ,TE,OR,ZY,mR,AR,N6,x6,qt,jt,Ht,Vt,Qt,Bt,f$1,u,hm,uC,lm,cm,T7,N7,Kt,$t,Ut,K,U,Q$1],styles:[`.calculator-page[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1.5rem;padding-block:0 3rem}.calculator-page__subtitle[_ngcontent-%COMP%]{max-width:640px;color:var(--%NS%mat-sys-on-surface-variant);margin:-.75rem 0 0}.calculator-controllers-container[_ngcontent-%COMP%]{gap:1.5rem;margin-bottom:0;align-items:stretch}mat-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1.5rem;gap:1.5rem}mat-card-header[_ngcontent-%COMP%]{margin-bottom:1.5rem}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;gap:1rem}mat-card-actions[_ngcontent-%COMP%]{margin-top:auto}.pages-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.kindle-position-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start}.kindle-position-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 160px;min-width:0}.calculator-hint[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font-size:.85rem}.calculator-error[_ngcontent-%COMP%]{color:#e08585}.calculator-result[_ngcontent-%COMP%]{padding:.75rem 1rem;border-radius:var(--%NS%mat-sys-corner-medium, 10px);background:var(--%NS%mat-sys-surface-container-high);border:1px solid color-mix(in srgb,var(--%NS%mat-sys-primary) 25%,transparent)}.calculator-history[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{height:auto;padding-block:.5rem;align-items:flex-start}.calculator-history[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]     .mdc-list-item__content{align-self:center}.calculator-history[_ngcontent-%COMP%]   [matListItemTitle][_ngcontent-%COMP%]{white-space:normal;line-height:1.35}.calculator-reset[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.calculator-reset[_ngcontent-%COMP%]   .calculator-hint[_ngcontent-%COMP%]{margin:0;flex:1 1 260px}.calculator-footnote[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font-size:.75rem}@media(max-width:575px){.calculator-page[_ngcontent-%COMP%]{padding-block:0 2rem;gap:1.25rem}mat-card[_ngcontent-%COMP%]{padding:1rem;gap:1rem}mat-card-header[_ngcontent-%COMP%]{margin-bottom:1rem}.kindle-position-form[_ngcontent-%COMP%]{flex-direction:column}.kindle-position-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%;flex:0 0 auto}mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.calculator-reset[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.calculator-reset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}}@media(min-width:576px)and (max-width:767px){.kindle-position-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex-basis:calc(50% - .5rem)}}`]})};export{Wt as PagesCalculatorComponent};