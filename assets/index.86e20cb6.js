(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const s=[{id:1,name:"Chokladmunk med vaniljfyllning",price:23,categories:["glazed","filled"],images:["img/chocolate-iced-custard-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:5,discount:!1},{id:2,name:"Chokladmunk",price:18,categories:["glazed"],images:["img/chocolate-iced-glazed.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4.5,discount:!1},{id:3,name:"Kanelpudrad munk med \xE4ppelfyllning",price:25,categories:["filled","sprinkles"],images:["img/cinnamon-apple-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4.5,discount:!1},{id:4,name:"Glaserad kanelmunk",price:13,categories:["glazed","sprinkles"],images:["img/glazed-cinnamon.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:5,discount:!1},{id:5,name:"Glaserad munk med citronfyllning",price:23,categories:["glazed","filled"],images:["img/glazed-lemon-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4,discount:!1},{id:6,name:"Munk med chokladfyllning",price:16,categories:["filled"],images:["img/original-filled-chocolate-kreme\u2122.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4,discount:!1},{id:7,name:"Glaserad munk",price:7,categories:["glazed"],images:["img/original-glazed-doughnut.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:5,discount:!1},{id:8,name:"Pudrad munk med bl\xE5b\xE4rsfyllning",price:25,categories:["sprinkles","filled"],images:["img/powdered-blueberry-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4.5,discount:!1},{id:9,name:"Pudrad munk med jordgubbsfyllning",price:25,categories:["sprinkles","filled"],images:["img/powdered-strawberry-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:4,discount:!1},{id:10,name:"Jordgubbsmunk",price:11,categories:["glazed"],images:["img/strawberry-iced.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:5,discount:!1}],ie=new Set,I=new Set;let u=[...s];const U=[{id:11,name:"Luciamunk",price:1,categories:["sprinkles","filled"],images:["img/chocolate-iced-custard-filled.jpeg","img/chocolate-iced-custard-filled.jpeg"],rating:5}],_=new Date,b=_.getDay(),k=_.getHours(),Z=_.getMonth(),X=_.getDate(),ce=()=>{if(Z===11&&X===24){document.body.style.backgroundImage="url('/img/christmasbg.webp')",document.body.style.backgroundSize="cover",document.body.style.backgroundRepeat="no-repeat",document.body.style.backgroundAttachment="fixed";const e=document.querySelectorAll(".donuts__item_info p:first-child");for(let t=0;t<e.length;++t)e[t].style.color="red"}},ae=()=>{if(b>=5&&k>=15||b===6||b===1&&k<=3)for(const e of s)e.price=Math.round(e.price*1.15)};ae();const l=[],se=0,L=document.querySelector(".donuts");let H=L.querySelectorAll(".donuts__item_quantity > button"),Q=L.querySelectorAll(".donuts__item_addcart");const de=()=>{H=L.querySelectorAll(".donuts__item_quantity > button"),Q=L.querySelectorAll(".donuts__item_addcart");for(const e of H)e.getAttribute("data-type")==="decrease"?e.addEventListener("click",()=>{ue(e.getAttribute("data-id"))}):e.getAttribute("data-type")==="increase"&&e.addEventListener("click",()=>{le(e.getAttribute("data-id"))});for(const e of Q)e.addEventListener("click",()=>{me(e.getAttribute("data-id"))})},B=()=>{const e=l.reduce((r,o)=>r+o.totPrice,0),t=l.reduce((r,o)=>r+o.count,0),n=document.querySelector("#cart-counter"),i=t;n.textContent=i,fe(e,t)},le=e=>{const t=document.querySelector(`[data-id="${e}"]`),n=t.querySelector(".donuts__item_quantity input");let i=Number(n.value)+1;const r=Number(e),o=s.find(c=>c.id===r);i>99&&(i=99),n.value=i,t.querySelector(".donuts__item_addcart span").innerText=o.price*i;const a=o.price*i>=0?o.price*i:o.price;t.querySelector(".donuts__item_addcart span").innerText=a;for(const c of l)c.id===e&&c.count>0&&(c.count-=1,c.totPrice=c.count*c.price,console.log(l),T())},ue=e=>{const t=document.querySelector(`[data-id="${e}"]`),n=t.querySelector(".donuts__item_quantity input"),i=Number(n.value)-1,r=Number(e),o=s.find(c=>c.id===r);n.value>0&&(n.value=i,t.querySelector(".donuts__item_addcart span").innerText=o.price*i);const a=o.price*i>=0?o.price*i:o.price;t.querySelector(".donuts__item_addcart span").innerText=a;for(const c of l)c.id===e&&c.count>0&&(c.count-=1,c.totPrice=c.count*c.price,console.log(l),T())},me=e=>{const t=Number(e),n=Number(document.querySelector(`[data-id="${e}"] .donuts__item_quantity input`).value);if(n>0){const i=s.find(a=>a.id===t),r=i.price*n;if(document.querySelector(`[data-id="${e}"] .donuts__item_quantity input`).value="0",se+r>2e3){alert("Du kan inte best\xE4lla f\xF6r mer \xE4n 2000kr");return}if(l.find(a=>a.id===t))for(const a of l)a.count+=n,a.totPrice+=r;else l.push({...i,count:n,totPrice:r});B(),T()}},T=()=>{let e="";for(const t of l){console.log(t);const n=`
			<li data-id="cart-${t.id}">
				<div className="name">
					<img src=${t.images[1]} width="30" height="30"/>
					<p>${t.name}</p>
				</div>
				<div className="donuts__item_quantity">
					<button 
						class="button button--background"
						onClick="updateCartQuantity('cart-${t.id}', 'dec')"
					>-</button>
					<input type="number" value="${t.count}" data-id="cart-${t.id}"/>
					<button 
						class="button button--background" 
						onClick="updateCartQuantity('cart-${t.id}', 'inc')"
					>+</button>
					<p>${t.totPrice} kr</p>
				</div>
			</li>`;e+=n}document.querySelector("#cart article ul").innerHTML=e,B()},fe=(e,t)=>{const n=Math.round(25+e*.1),i=document.getElementById("freight-sum"),r=document.getElementById("cart-sum"),o=document.getElementById("delivery-time"),a=document.querySelector('[name="discount-code"]');a.addEventListener("keyup",B);let c=e+n;const R=new Intl.NumberFormat("sv-SE",{style:"currency",currency:"SEK"}).format(n),h=new Intl.NumberFormat("sv-SE",{style:"currency",currency:"SEK"}).format(c);r.textContent=`Totalpris: ${h}.`,i.textContent=`Frakt: ${R}.`,o.textContent="Best\xE4llningen skickas 30 minuter efter orderl\xE4ggning.",e>=800?document.getElementById("invoice-radio").disabled=!0:document.getElementById("invoice-radio").disabled=!1;const K={month:11,date:13};Z===K.month&&X===K.date&&l.length>=1&&(l.push(...U),U.pop()),b===1&&k<=10?(c=Math.round(h*.9),r.textContent=`Totalpris: M\xE5ndagsrabatt: 10 % p\xE5 hela best\xE4llningen ${h}.`):r.textContent=`Totalpris: ${h}.`,t>=15?(c=e,r.textContent=`Totalpris: ${h}.`,i.textContent="Fraktfritt."):(c=e+n,i.textContent=`Frakt: ${R}.`),a.value==="a_damn_fine-cup_of-coffee"?(c=0,r.textContent="Din best\xE4llning \xE4r kostnadsfri!",i.textContent="Fraktfritt."):c=e+n,(b===6||b===0)&&(o.textContent="Best\xE4llningen skickas 90 minuter efter orderl\xE4ggning."),(b!==6||b!==0&&k>=0&&k<=5)&&(o.textContent="Best\xE4llningen skickas 45 minuter efter orderl\xE4ggning."),b===5&&k>=11&&k<=13&&(o.textContent="Leveranstiden \xE4r ber\xE4knad till 15:00"),(()=>{const y=new Date(_.getFullYear(),0,1),oe=Math.floor((_-y)/(24*60*60*1e3));Math.ceil(oe/7)%2===0&&b===5&&c>=25&&(c-=25,r.textContent=`Totalpris efter 25 kr rabatt: ${h}.`)})(),(()=>{for(const y of l)y.count>=10&&y.discount===!1?(y.totPrice=Math.round(y.totPrice*.9),y.discount=!0):y.count<10&&y.discount===!0&&(y.discount=!1)})()},ge=e=>{const t='<i class="fa-solid fa-star"></i>',n='<i class="fa-solid fa-star-half"></i>',i=e.toString().split("."),r=i[0],o=i.length>1?i[1]:0;let a="";for(let c=0;c<Number(r);c++)a+=t;return o&&(a+=n),a},v=()=>{L.innerHTML="";for(const e of u)L.innerHTML+=`
      <article class="donuts__item" data-id=${e.id}>
        <h2>${e.name}</h2>
				<div class="donuts__item_image">
					<button id ="prev-${e.id}" class="prev">&#10094;</button>
					<img id = "img-${e.id}" src="${e.images[0]}" alt="A picture of a donut"/>
					<button id ="next-${e.id}" class="next">&#10095;</button>
				</div>
				<div class="donuts__item_info">
					<p>${e.price} kr</p>
					<p>${ge(e.rating)}</p>
				</div>
        <div class="donuts__item_quantity">
          <button 
						class="button button--background" 
						data-id=${e.id}
						data-type='decrease'
					><i class="fa-solid fa-minus" title="Decrease count"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
          >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button 
						class="button button--background" 
						data-id=${e.id}
						data-type='increase'
					><i class="fa-solid fa-plus" title="Increase count"></i></button>
        </div>
        <button 
					class="donuts__item_addcart button button--background" 
					data-id=${e.id}
				>L\xE4gg till f\xF6r <span>${e.price}</span> kr</button>
      </article>
    `;de()},pe=()=>{for(const e of s)for(const t of e.categories)ie.add(t)};function ye(e){const t=e.currentTarget.id.replace("prev-",""),n=document.querySelector(`#img-${t}`);n.getAttribute("src")===s[t].images[0]?n.setAttribute("src",s[t].images[1]):n.setAttribute("src",s[t].images[0])}function be(e){const t=e.currentTarget.id.replace("next-",""),n=document.querySelector(`#img-${t}`);n.getAttribute("src")===s[t].images[0]?n.setAttribute("src",s[t].images[1]):n.setAttribute("src",s[t].images[0])}const ve=document.querySelectorAll("button.prev"),ke=document.querySelectorAll("button.next");ve.forEach(e=>{e.addEventListener("click",ye)});ke.forEach(e=>{e.addEventListener("click",be)});const G=document.querySelector("form"),V=document.querySelector('[name="name"]'),$=document.querySelector('[name="address"]'),J=document.querySelector('[name="post-code"]'),w=document.querySelector('[name="city"]'),he=document.querySelector('[name="tel"]'),Se=document.querySelector('[name="email"]'),q=document.querySelector('[name="card-number"]'),A=document.querySelector('[name="date"]'),C=document.querySelector('[name="cvc"]'),E=document.querySelector('[name="social-security-number"]'),qe=document.querySelector("#card-radio"),Ee=document.querySelector("#invoice-radio"),_e=Array.from(document.querySelectorAll('[name="payment-method"]')),W=document.querySelector('[name="personal-data"]'),Y=document.querySelector("#order-btn"),D=document.querySelector("#card-payment-form"),j=document.querySelector("#invoice-payment-form"),d={name:!1,address:!1,postCode:!1,city:!1,tel:!1,email:!1,payment:!1,personalData:!1},x={cardNumber:!1,expirationDate:!1,cvc:!1},Le=e=>{for(const t in e)if(!e[t])return!1;return!0},Ae=()=>{if(qe.checked){for(const e in x)if(!x[e]){d.payment=!1;return}d.payment=!0}else if(Ee.checked){if(E.value===""){d.payment=!1;return}d.payment=!0}},m=()=>{Ae(),Le(d)?(Y.removeAttribute("disabled"),G.setAttribute("onsubmit","submitOrder()")):(Y.setAttribute("disabled",""),G.removeAttribute("onsubmit"))};V.addEventListener("keyup",()=>{d.name=V.value.indexOf(" ")>0,m()});$.addEventListener("keyup",()=>{d.address=/\d/.test($.value)?/[A-Za-zÅåÄäÖö]/.test($.value):!1,m()});J.addEventListener("keyup",()=>{d.postCode=J.value.length===5,m()});w.addEventListener("keyup",()=>{d.city=w.value!=="",m()});he.addEventListener("keyup",()=>{d.tel=w.value!=="",m()});Se.addEventListener("keyup",()=>{d.email=w.value!=="",m()});for(const e of _e)e.addEventListener("click",()=>{switch(m(),e.value){case"card":D.style.display="flex",j.style.display="none",q.setAttribute("required",""),A.setAttribute("required",""),C.setAttribute("required",""),E.removeAttribute("required");break;case"invoice":D.style.display="none",j.style.display="flex",E.setAttribute("required",""),q.removeAttribute("required"),A.removeAttribute("required"),C.removeAttribute("required");break;default:D.style.display="flex",j.style.display="none",q.setAttribute("required",""),A.setAttribute("required",""),C.setAttribute("required",""),E.removeAttribute("required")}});q.addEventListener("keyup",()=>{x.cardNumber=/\d/.test(q.value),console.log(/\d/.test(q.value)),m()});A.addEventListener("keyup",()=>{x.expirationDate=A.value!=="",m()});C.addEventListener("keyup",()=>{x.cvc=C.value!=="",m()});E.addEventListener("keyup",()=>{d.payment=/\d/.test(E.value),m()});W.addEventListener("click",()=>{d.personalData=W.checked,m()});document.querySelector("form").addEventListener("reset",e=>{confirm("\xC4r du s\xE4ker att du vill \xE5terst\xE4lla formul\xE4ret?")&&(e.preventDefault(),Be())});const N=document.querySelector("#filterMenuButton"),Ce=document.querySelector("#filterMenuResetButton"),S=document.querySelector("#filterMenu"),P=document.querySelector('[name="searchQuery"]'),xe=document.querySelector("#searchButton");let F=!1;const ee=e=>{e&&e!==""&&(u=s.filter(n=>n.name.toLowerCase().includes(e.toLowerCase())),v())};N.addEventListener("click",()=>{N.setAttribute("aria-expanded",!F),F=JSON.parse(N.getAttribute("aria-expanded")),F?(S.style.display="flex",window.setTimeout(()=>{S.style.opacity=1,S.style.transform="scale(1)"},0)):(S.style.opacity=0,S.style.transform="scale(0)",window.setTimeout(()=>{S.style.display="none"},200))});Ce.addEventListener("click",()=>{u=[...s],v()});xe.addEventListener("click",()=>{ee(P.value)});document.addEventListener("keydown",e=>{e.key==="Enter"&&document.activeElement===P&&ee(P.value)});const Ie=e=>{I.has(e)?I.delete(e):I.add(e),u=[];for(const t of s)for(const n of t.categories)I.has(n)&&!u.find(i=>i.id===t.id)&&u.push(t);v()},we=document.querySelectorAll(".navbar__dropdown_item_categories input");for(const e of we)e.addEventListener("click",t=>Ie(t.target.name));const f=document.querySelector("#price-sort"),g=document.querySelector("#rating-sort"),p=document.querySelector("#name-sort");f.style.transform="scale(-1, 1)";g.style.transform="scale(-1, 1)";p.style.transform="scale(-1, 1)";f.addEventListener("click",O);g.addEventListener("click",z);p.addEventListener("click",M);const $e=(e,t)=>(p.removeEventListener("click",M),p.addEventListener("click",te),e.name<t.name?-1:1);function M(){u.sort($e),v(),p.style.transition="0.6s ease",p.style.transform="rotate(-0.5turn)"}const De=(e,t)=>(p.removeEventListener("click",te),p.addEventListener("click",M),e.name<t.name?1:-1);function te(){u.sort(De),v(),p.style.transition="0.6s ease",p.style.transform="scale(-1, 1)",p.style.transform="rotate(deg0)"}const je=(e,t)=>(g.removeEventListener("click",z),g.addEventListener("click",ne),e.rating<t.rating?-1:1);function z(){u.sort(je),v(),g.style.transition="0.6s ease",g.style.transform="rotate(-0.5turn)"}const Ne=(e,t)=>(g.removeEventListener("click",ne),g.addEventListener("click",z),e.rating<t.rating?1:-1);function ne(){u.sort(Ne),v(),g.style.transition="0.6s ease",g.style.transform="scale(-1, 1)",g.style.transform="rotate(deg0)"}const Fe=(e,t)=>(f.removeEventListener("click",O),f.addEventListener("click",re),e.price<t.price?-1:1);function O(){u.sort(Fe),v(),f.style.transition="0.6s ease",f.style.transform="rotate(-0.5turn)"}const Pe=(e,t)=>(f.removeEventListener("click",re),f.addEventListener("click",O),e.price<t.price?1:-1);function re(){u.sort(Pe),v(),f.style.transition="0.6s ease",f.style.transform="scale(-1, 1)",f.style.transform="rotate(deg0)"}const Be=()=>{window.location.reload()};v();pe();ce();
