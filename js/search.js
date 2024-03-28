const searchBtn=document.querySelector("#search-btn"),searchIpt=document.querySelector("#search-input"),searchResult=document.querySelector("#search-result"),searchClearBtn=document.querySelector("#search-clear"),searchMask=document.querySelector("#search-mask");let searchStatus=0;function showSearchDialog(){searchStatus||(searchMask.style.display="block",document.body.style.overflow="hidden",searchIpt.focus(),searchStatus=1)}function closeSearchDialog(){searchStatus&&(searchMask.style.display="None",document.body.style.overflow="inherit",searchIpt.value="",searchStatus=0)}function searchInitialize(e){fetch(e).then(e=>e.json()).then(e=>{var t=debounce(doSearch);searchBtn.style.display="flex",document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&"k"==e.key&&(searchStatus?closeSearchDialog:showSearchDialog)(),"Escape"==e.key&&closeSearchDialog()}),searchClearBtn.addEventListener("click",()=>{searchIpt.value="",clearResult()}),searchBtn.addEventListener("click",()=>{showSearchDialog()}),searchMask.addEventListener("click",e=>{e.target===searchMask&&closeSearchDialog()},!0),searchIpt.addEventListener("input",t.bind(searchIpt,e))})}function clearResult(){searchResult.innerHTML=""}function doSearch(e){if(this.value.trim().length<=0)return clearResult();renderSearchResult(search(e,this.value.trim().toLowerCase().split(/[\s\-]+/)),searchResult)}function search(e,t){const r=[];return e.filter(e=>e.content).forEach(e=>{let a=e.title&&e.title.trim();a=a&&0<a.length?a:"Untitled";const c=e.content.trim().replace(/<[^>]+>/g,""),n=[];t.forEach((e,t)=>{var r=a.toLowerCase().indexOf(e),e=c.toLowerCase().indexOf(e);r<0&&e<0||n.push(Math.max(e,0))}),n.length&&r.push({url:e.url,content:trimeContent(n,c,t),title:a})}),r}function renderSearchResult(e,t){t.innerHTML="",(!e||e.length<=0)&&(t.innerHTML='<div class="search-result-empty">无结果</div>');const c=document.createDocumentFragment();e.forEach(e=>{var t=document.createElement("a"),r=(t.className="search-result-item",t.href=e.url,document.createElement("DIV"));r.className="search-result__head",r.innerText=e.title;const a=document.createElement("DIV");a.className="search-result__body",e.content.forEach(e=>{var t=document.createElement("DIV");t.innerHTML=e,a.appendChild(t)}),t.append(r,a),c.append(t)}),t.appendChild(c)}function trimeContent(e,c,n,s=20){var t,r=/[\u4e00-\u9fa5]|\w+/dg;const l=[];for(;null!==(t=r.exec(c));)l.push(t.indices[0]);return e.map(e=>{var e=binaryFind(l,e),e=Math.max(0,e-10),t=Math.min(s+e,l.length-1);const r=l[e][0],a=l[t][1];return n.forEach(e=>{c=c.slice(r,a).replace(new RegExp(e,"ig"),`<span class="search-keyword">${e}</span>`)}),c})}function binaryFind(e,t){let r=0,a=e.length-1,c=a;for(;r<=a;){if(t<e[c][0])a=c-1;else{if(!(t>e[c][1]))return c;r=c+1}c=Math.floor((r+a)/2)}return c}function debounce(t,r=400){let a=null;return function(...e){clearTimeout(a),a=setTimeout(()=>{t.call(this,...e)},r)}}