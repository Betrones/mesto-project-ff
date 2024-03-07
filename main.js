(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Sq:()=>B,cN:()=>j,Wu:()=>U,ic:()=>T});var t=function(e,t,n){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);"8d457b6c91b7578275b3a7b8"!==n.owner._id&&o.querySelector(".card__delete-button").setAttribute("style","display: none");var c=o.querySelector(".card__delete-button"),r=o.querySelector(".card__like-button"),a=o.querySelector(".card__like-counter"),i=o.querySelector(".card__image");return o.setAttribute("id","card".concat(n._id)),i.src=n.link,i.alt=n.name,a.textContent=n.likes.length,o.querySelector(".card__title").textContent=n.name,c.addEventListener("click",e),r.addEventListener("click",t),i.addEventListener("click",(function(e){return j(n.name,n.link)})),n.likes.forEach((function(e){"8d457b6c91b7578275b3a7b8"===e._id?r.classList.add("card__like-button_is-active"):r.classList.remove("card__like-button_is-active")})),o},n=function(e){e.target.closest(".card"),U(e)},o=function(e){T(e)},c=function(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))},r=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)},a=function(e){e.classList.remove("popup_is-opened"),document.addEventListener("keydown",c),document.removeEventListener("keydown",c)};document.addEventListener("click",(function(e){e.target.classList.contains("popup")&&!e.target.classList.contains("popup__conent")&&B(e)}));var i,s,u,l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-7/",baseHeaders:{authorization:"16c74c35-c061-46ba-a700-55d16a046848","Content-Type":"application/json"}},p=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},f=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){p(e,n,t)})),_(n,o,t),o.classList.add(t.inactiveButtonClass),e.reset()},_=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},m=document.querySelector(".places__list"),v=document.forms,y=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__image"),S=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_delete"),E=document.querySelector(".popup_type_avatar"),k=document.querySelectorAll(".popup__close"),C=document.querySelectorAll(".popup"),P=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),x=document.querySelector(".profile__image");i=P,s=A,u=x,fetch("".concat(d.baseUrl,"users/me"),{headers:d.baseHeaders}).then((function(e){return e.json()})).then((function(e){i.textContent=e.name,s.textContent=e.about,u.setAttribute("style","background-image: url(".concat(e.avatar,")"))})).catch((function(e){console.log("Ошибка: ".concat(e))})),function(e,t,n,o){fetch("".concat(d.baseUrl,"cards"),{headers:d.baseHeaders}).then((function(e){return e.json()})).then((function(c){t.innerHTML="",c.forEach((function(c){t.append(e(n,o,c))}))})).catch((function(e){console.log("Ошибка: ".concat(e))}))}(t,m,n,o);var w=document.querySelector(".popup__image"),H=document.querySelector(".popup__caption"),T=function(e){var t;e.target.classList.contains("card__like-button_is-active")?(function(e){fetch("".concat(d.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:d.baseHeaders}).then((function(e){return e.json()})).then((function(e){document.querySelector("#card".concat(e._id)).querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ".concat(e))}))}(e.target.closest(".card").id.slice(4)),e.target.classList.remove("card__like-button_is-active")):(t=e.target.closest(".card").id.slice(4),fetch("".concat(d.baseUrl,"cards/likes/").concat(t),{method:"PUT",headers:d.baseHeaders}).then((function(e){return e.json()})).then((function(e){document.querySelector("#card".concat(e._id)).querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){console.log("Ошибка: ".concat(e))})),e.target.classList.add("card__like-button_is-active"))},U=function(e){r(g);var t=e.target.closest(".card").id;document.querySelector("#".concat(t)).classList.add("deleteThis")},j=function(e,t){w.src=t,H.textContent=e,w.alt=e,r(L)},B=function(e){a(e.target.closest(".popup"))};k.forEach((function(e){e.addEventListener("click",B)})),C.forEach((function(e){return e.classList.add("popup_is-animated")})),v.editProfile.addEventListener("submit",(function(e){e.preventDefault(),P.textContent=v.editProfile.name.value,A.textContent=v.editProfile.description.value,function(e,t){fetch("".concat(d.baseUrl,"users/me"),{method:"PATCH",headers:d.baseHeaders,body:JSON.stringify({name:e,about:t})}).catch((function(e){console.log("Ошибка: ".concat(e))}))}(v.editProfile.name.value,v.editProfile.description.value),v.editProfile.reset(),a(e.target.closest(".popup"))})),v.newPlace.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,o,c,r){fetch("".concat(d.baseUrl,"cards"),{method:"POST",headers:d.baseHeaders,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.json()})).then((function(e){c.prepend(r(n,o,e)),console.log(c)})).catch((function(e){console.log("Ошибка: ".concat(e))}))}(v.newPlace.placeName.value,v.newPlace.link.value,n,o,m,t),v.newPlace.reset(),B(e)})),v.deleteCard.addEventListener("submit",(function(e){e.preventDefault();var t,n=document.querySelector(".deleteThis");t=n.id.slice(4),fetch("".concat(d.baseUrl,"cards/").concat(t),{method:"DELETE",headers:d.baseHeaders}),n.classList.remove("deleteThis"),n.remove(),a(g)})),v.updateAvatar.addEventListener("submit",(function(e){e.preventDefault();var t=v.updateAvatar.url.value;h.setAttribute("style","background-image: url(".concat(t,")")),function(e){var t=e;fetch("".concat(d.baseUrl,"users/me/avatar"),{method:"PATCH",headers:d.baseHeaders,body:JSON.stringify({avatar:t})}).catch((function(e){console.log("Ошибка: ".concat(e))}))}(t),v.updateAvatar.reset(),a(E)})),y.addEventListener("click",(function(){var e=P.textContent,t=A.textContent;f(v.editProfile,l),v.editProfile.name.value=e,v.editProfile.description.value=t,r(S)})),b.addEventListener("click",(function(){r(q),f(v.newPlace,l)})),h.addEventListener("click",(function(e){r(E)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);_(n,o,t),n.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.err):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),c.textContent=n,c.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,c,t),_(n,o,t)}))}))}(t,e)}))}(l)})();