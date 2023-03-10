let getUtils=function(e={}){return{cssClasses:{grabbingClass:"cursor-grabbing",grab:"cursor-grab",noUserSelection:"no-user-selection",sortingItem:"current-sorting",clonedPreview:"sorting-clone-preview",cloneMoving:"clone-moving",cloned:"cloned",sortMoving:"sort-moving",sortable:"sortable",containment:"sortable-containment",appendableClasss:"sort-appendable",defaultHeight:"default-height",fallBackElement:"fallback-element",fallBackPreview:"fallback-preview",disabledClass:"sortable-disabled",fallBackClone:"fallback-clone",handle:"sortable-handle"},sortableFigures:{mouseX:0,mouseY:0,windowScroll:{x:0,y:0},clonedPreview:null,sortableParent:null,orignalFallback:null,fallBackElement:null,fallBackClone:null,preventedContainerClasses:[],cloneDistance:{y:0,x:0},initial:{scrollY:0,scrollX:0,elementPosition:{left:0,top:0}},itemDetails:{startedFrom:{},endedOn:{}}},zoomedValue:1,interval:null,handle:null,injectCss(){let e=document.querySelector("[data-sortable-css]");if(!e){let s=`.${this.cssClasses.containment} {scroll-behavior: smooth;}.${this.cssClasses.sortable} {touch-action:none;}.${this.cssClasses.grab}:not(.${this.cssClasses.disabledClass}) , .${this.cssClasses.grab}:not(.${this.cssClasses.disabledClass}):hover {    cursor: grab;}.${this.cssClasses.grab}.${this.cssClasses.grabbingClass}:hover {    cursor: grabbing;}.${this.cssClasses.noUserSelection} , .${this.cssClasses.noUserSelection} * {    user-select: none !important;}.${this.cssClasses.sortMoving} {    background: #00000094 !important;    opacity: 0.5; pointer-events: none;}.${this.cssClasses.sortMoving} *{    opacity: 0 !important;}.${this.cssClasses.cloneMoving} {    opacity: 0.7;}.${this.cssClasses.appendableClasss} {  min-height:180px;}.${this.cssClasses.defaultHeight} , .${this.cssClasses.containment} {  padding: 8px;} .${this.cssClasses.handle} {    padding: 8px;position: absolute;left: 0;top: 0; display: none;} .${this.cssClasses.sortable}:hover .${this.cssClasses.handle} {display: block}`,t=document.createElement("style");t.dataset.sortableCss=!0,t.styleSheet?t.styleSheet.cssText=s:t.appendChild(document.createTextNode(s)),document.getElementsByTagName("head")[0].appendChild(t)}},getClone(s){let t=(t=>{let l=t.getBoundingClientRect(),a=t.cloneNode(!0),{top:i,left:n}=this.getElementPosition(s);return a.style.position="fixed",a.style.top=i+"px",a.style.left=n+"px",a.style.width=l.width+"px",a.style.height=l.height+"px",a.style.margin=0,a.style.zIndex=1e3,a.style.boxSizing="border-box",a.style.userSelect="none",a.style.pointerEvents="none",a.querySelectorAll("*").forEach(e=>e.style.pointerEvents="none"),this.updateClass(a,this.cssClasses.clonedPreview),this.updateClass(a,e.draggingClass),a})(s);return s?.after(t),t},appendHandleIfNeeded(s){if(e.handle){let t=null;return"boolean"==typeof e.handle?((t=document.createElement("div")).innerHTML=`<svg width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon fill="#979797" points="130.412 323.98 78.529 272.098 240 272.098 240 433.568 188.118 381.687 165.49 404.313 256 494.823 346.51 404.313 323.882 381.687 272 433.568 272 272.098 432.667 272.098 380.784 323.98 403.412 346.607 493.921 256.098 403.412 165.588 380.784 188.215 432.667 240.098 272 240.098 272 79.432 323.882 131.313 346.51 108.687 256 18.177 165.49 108.687 188.118 131.313 240 79.432 240 240.098 78.529 240.098 130.412 188.215 107.784 165.588 17.274 256.098 107.785 346.608 130.412 323.98" class="ci-primary"/>
 </svg>`,s.append(t)):(t=this.getNode(e.handle),s.append(t)),e.handleClass&&this.updateClass(t,e.handleClass),t.parentElement.style.position="relative",t.classList.add(this.cssClasses.handle),this.handle=t,t}},getZoomedValue(){let s=+(e.zoom||e.zoomedElement&&getComputedStyle(e.zoomedElement).zoom||1);return this.zoomedValue=s,s},throwError(e){let s=Error(e);s.name="SortableJS",console.error(s)},getItemDetail(e){let s=e.parentNode;if(!e||!s)return{};let t=Array.from(s.children).indexOf(e);return{element:e,index:t,parent:s}},anyChange({startedFrom:e,endedOn:s}){let t=!1;return Object.keys(e).forEach(l=>{e[l]!==s[l]&&(t=!0)}),t},getElementPosition(e,s){let t=e.getBoundingClientRect(),{y:l,x:a}=t,i=parseFloat(getComputedStyle(e).outlineWidth);if(s){let n=s.getBoundingClientRect(),o=s.scrollTop,r=s.scrollLeft;l=l-n.y+o,a=a-n.x+r}return s&&i&&(l-=i,a-=i),{top:l,left:a}},handleDefaultHeight(e){if(e){let s=30>parseInt(getComputedStyle(e).height);s&&this.updateClass(e,this.cssClasses.defaultHeight)}},getNode(e,s){if(!e)return null;if("string"==typeof e){let t=document.createElement("div");t.innerHTML=e;let l=3===t.childNodes[0].nodeType?t:t.childNodes[0];return this.updateClass(l,s),l}try{e.classList.add(s)}catch(a){this.throwError("Provided Element is Not a valid HTML element")}return e},setInitalData(s){this.updateClass(s,this.cssClasses.sortable),this.updateClass(s,e.itemClass);let t=s.closest("."+this.cssClasses.appendableClasss)||s.parentElement;if(t&&(this.sortableFigures.sortableParent=t,this.updateClass(t,this.cssClasses.containment)),e.containers&&"string"==typeof e.containers&&e.containers.split(",").forEach(e=>{document.querySelectorAll("."+e).forEach(e=>{this.updateClass(e,this.cssClasses.appendableClasss),this.handleDefaultHeight(e)})}),e.preventedContainers){let l=e.preventedContainers.split(",");l.forEach(e=>this.sortableFigures.preventedContainerClasses.push(e.trim()))}let a=this.getNode(e.fallBackElement,this.cssClasses.fallBackPreview);this.sortableFigures.orignalFallback=a;let i=this.appendHandleIfNeeded(s);i?this.updateClass(i,this.cssClasses.grab):this.updateClass(s,this.cssClasses.grab)},updateClass(e,s,t="add"){s&&e?.classList[t](s)},initMouseDown(s,t,l){if(t){let a=this.getItemDetail(t);this.updateClass(t,this.cssClasses.grabbingClass),this.updateClass(t,this.cssClasses.sortingItem),this.updateElementsInitialPosition(t),this.sortableFigures.itemDetails.startedFrom=a,e.onStart({startFrom:a})}l&&(this.updateClass(l,this.cssClasses.grabbingClass),this.sortableFigures.mouseY=s.pageY,this.sortableFigures.mouseX=s.pageX,this.sortableFigures.windowScroll={x:window.scrollX,y:window.scrollY}),this.updateClass(document.body,this.cssClasses.noUserSelection)},updateElementsInitialPosition(e){let s=this.sortableFigures.sortableParent?.scrollTop,t=this.sortableFigures.sortableParent?.scrollLeft;this.sortableFigures.initial.scrollY=s,this.sortableFigures.initial.scrollX=t},windowScrollIfNeeded({clientX:e,clientY:s}){let{innerHeight:t,innerWidth:l}=window,a=s<50,i=s>t-50;if((a||i)&&!this.interval){let n=a?-50:50;this.interval=setInterval(()=>{window.scrollTo(0,window.scrollY+n)},50)}a||i||(clearInterval(this.interval),this.interval=null)},movePreview({event:e}){let{pageY:s,pageX:t}=e,l=this.sortableFigures.clonedPreview,a=this.sortableFigures.mouseY-s,i=this.sortableFigures.mouseX-t,{y:n,x:o}=this.sortableFigures.cloneDistance,r=window.scrollX,c=window.scrollY,{x:d,y:h}=this.sortableFigures.windowScroll;r!==d&&(this.sortableFigures.windowScroll.x=r,o-=r-d),c!==h&&(n+=c-h);let u=t/this.zoomedValue-i,g=s/this.zoomedValue-a;l.style.left=u-o+"px",l.style.top=g-n+"px",this.sortableFigures.mouseY=s,this.sortableFigures.mouseX=t,this.windowScrollIfNeeded(e)},sortElement({event:s,sortingElement:t}){let{clientX:l,clientY:a}=s,i=document.elementsFromPoint(l,a),n=this.cssClasses,o=(e,s)=>e===s?.parentElement,r=(e,s,t)=>{let l=!e.classList.contains(n.clonedPreview),a=t.parentElement,i=!0;for(;a;)if((a=a.parentElement)===s){i=!1;break}return e!==s&&l&&i},c=i[0];if(!c?.classList.contains(this.cssClasses.sortable)){let d=c?.closest("."+this.cssClasses.sortable);d&&!c.classList.contains(this.cssClasses.appendableClasss)&&(c=d)}let h=i.find(e=>e?.classList.contains(n.containment)),u=i.find(e=>!e?.classList.contains(n.clonedPreview)&&e?.classList.contains(n.appendableClasss)),g=u||h,p=!c?.classList.contains(n.sortingItem)&&!c?.closest("."+n.sortingItem)&&c?.classList.contains(n.sortable),m=(()=>{let s=this.sortableFigures.orignalFallback;if(s){let t=this.sortableFigures.fallBackElement;if(t?.classList.contains(n.fallBackPreview)&&this.sortableFigures.itemDetails.startedFrom.parent===g&&t.remove(),e.fallBackClone){let l=this.sortableFigures.fallBackClone,a=!l?.classList.contains(n.fallBackClone);if(!a)return l;{let i=s.cloneNode(!0);return this.sortableFigures.fallBackClone=i,this.sortableFigures.fallBackElement=i,this.updateClass(i,n.fallBackClone),i}}return this.sortableFigures.fallBackElement=s,s}return!1})(),C=()=>{if(m&&this.sortableFigures.itemDetails.startedFrom.parent!==g)return!0},b=()=>{let s=!1;this.sortableFigures.preventedContainerClasses.forEach(e=>{g.classList.contains(e)&&(s=!0)});let l=e=>{if(!s){let l=e||t;!o(g,l)&&r(g,l,c)&&g.append(l)}};if(m)C()&&l(m);else if(u){let a=e.containers.split(","),i=u.classList,n=!1;for(let d=0;d<a.length;d++)if(i.contains(a[d].trim())){n=!0;break}n&&l()}else l()},f=()=>{let s=!1;this.sortableFigures.preventedContainerClasses.forEach(e=>{let l=c.parentElement;l?.classList.contains(e)&&l!==t.parentElement&&(s=!0)});let l=e=>{if(!s){let l=e||t,i=c.getBoundingClientRect(),o=i.y+i.height/2,r=c.classList.contains(n.appendableClasss);if(r)return!0;o<a/this.zoomedValue?c.after(l):c.before(l)}};if(m){if(C()){let i=l(m);if(i)return!0}}else if(u){if(e.containers){let o=l();if(o)return!0}}else{let r=l();if(r)return!0}};if(g){if(u){let v=()=>{e.containers&&b()},{top:$,bottom:E}=u.getBoundingClientRect(),_=a>=$&&a<$+10;if(p){if(_||a<=E&&a>E-10){let y=u.querySelector("."+n.sortable);if(y){let F=!1;if(this.sortableFigures.preventedContainerClasses.forEach(e=>{u?.parentElement.classList.contains(e)&&this.sortableFigures.itemDetails.startedFrom.parent!==u?.parentElement&&(F=!0)}),!F&&!m){if(u.parentElement.classList.contains(n.appendableClasss))_?u.before(t):u.after(t);else{let w=this.sortableFigures.itemDetails.startedFrom.parent.parentElement;if(!w.classList.contains("."+n.appendableClasss)){let L=w.closest("."+n.sortable),k=[...g.children,].some(e=>e===L);k&&(a>L.getBoundingClientRect().y?L.before(t):L.after(t))}}}}}else{let B=f();B&&v()}}else v()}else p?f():b()}},terminateMouseDown(s,t){let l="0.15s",a=1e3*parseFloat(l);if(s){let{scrollY:i,scrollX:n}=this.sortableFigures.initial;this.sortableFigures.sortableParent.scrollTo({top:i,left:n,behavior:"smooth"}),clearInterval(this.interval),this.interval=null;let o=this.sortableFigures.fallBackElement,r=Boolean(e.fallBackElement);if(o){o.classList.remove(this.cssClasses.fallBackClone),o.classList.remove(this.cssClasses.fallBackElement),o.classList.remove(this.cssClasses.fallBackPreview);let c=this.getItemDetail(o);this.sortableFigures.itemDetails.endedOn=c,this.sortableFigures.fallBackElement=null,this.sortableFigures.fallBackClone=null}else r||(this.sortableFigures.itemDetails.endedOn=this.getItemDetail(s));setTimeout(()=>{this.updateClass(s,this.cssClasses.grabbingClass,"remove"),this.updateClass(s,this.cssClasses.sortingItem,"remove")},a)}else console.error("element not found !");if(t){this.updateClass(t,this.cssClasses.grabbingClass,"remove"),t.style.transition=`${l}`;let{top:d,left:h}=this.getElementPosition(s,e.containment),{width:u,height:g}=getComputedStyle(s);t.style.top=d+"px",t.style.left=h+"px",t.style.width=u,t.style.height=g,setTimeout(()=>{t.remove(),this.updateClass(s,this.cssClasses.sortMoving,"remove")},a)}else console.error("cloned not found !");e.containment&&(e.containment.onscroll=null);let{itemDetails:p}=this.sortableFigures;p.endedOn?.element&&this.anyChange(p)&&e.onSort(p),e.onDrop(p),this.updateClass(document.body,this.cssClasses.noUserSelection,"remove")}}};function Sortable(e,s={}){if(!e)return console.error("Element is not provided !"),{};if(e.closest("pre"))return{disable(){}};let t={zoom:void 0,fallBackElement:null,fallBackClone:!0,zoomedElement:null,onStart(){},onSort(){},onDrop(){},itemClass:"",draggingClass:"",containers:"",handleClass:"",disabledClass:"",preventedContainers:"",handle:!1,...s},l=getUtils(t);l.injectCss(),l.setInitalData(e);let a=s=>{if(1===s.which){s.stopPropagation(),l.getZoomedValue();let t=l.getClone(e);l.sortableFigures.clonedPreview=t;let a={},{pageX:o,pageY:r}=s,c=s.currentTarget,{x:d,y:h}=c.getBoundingClientRect();a.y=r/l.zoomedValue-h,a.x=o/l.zoomedValue-d,l.sortableFigures.cloneDistance=a,l.initMouseDown(s,e,t),document.addEventListener("mousemove",i),document.addEventListener("touchmove",i),document.addEventListener("mouseup",n),document.addEventListener("touchend",n)}},i=s=>{let t="touchmove"===s.type;if(s.stopPropagation(),l.updateClass(l.sortableFigures.clonedPreview,l.cssClasses.cloneMoving),l.updateClass(e,l.cssClasses.sortMoving),t){let a=s.targetTouches[0];l.movePreview({event:a}),l.sortElement({event:a,sortingElement:e,path:s.path})}else l.movePreview({event:s}),l.sortElement({event:s,sortingElement:e,path:s.path});l.updateElementsInitialPosition(e)},n=s=>{s.stopPropagation(),l.terminateMouseDown(e,l.sortableFigures.clonedPreview),document.removeEventListener("mousemove",i),document.removeEventListener("touchmove",i),document.removeEventListener("mouseup",n)};(l.handle||e).addEventListener("pointerdown",a),this.disable=function(s=!0){e?s?(e.removeEventListener("pointerdown",a),e.classList.remove(l.cssClasses.sortable),t.disabledClass&&e.classList.add(t.disabledClass),e.classList.add(l.cssClasses.disabledClass)):(e.addEventListener("pointerdown",a),e.classList.add(l.cssClasses.sortable),t.disabledClass&&e.classList.remove(t.disabledClass),e.classList.remove(l.cssClasses.disabledClass)):console.error("Unable to disable because the  element you are trying to disable is not sortable")}};module.exports = Sortable