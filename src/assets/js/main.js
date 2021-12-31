window.onload = () => {
  const menu = document.getElementById("button-menu");
  const menuHijos = document.querySelectorAll(".navegacion .menu .item-submenu .submenu-hijo"
  );

  menuHijos.forEach((item) => {
    item.addEventListener("click", () => {
      console.log('si da click');
      const pos = item.parentElement.getAttribute("menu");
      const identificacion = '.item-submenu[menu="' + pos + '"] .submenu';
      let nodoHijo = document.querySelector(identificacion);
      nodoHijo.classList.add("l-cero");
      nodoHijo.classList.remove("l-minus-320");
      
      let show = document.querySelectorAll('.op-1');
      show.forEach((i) => {
          i.classList.remove('op-1');
          i.classList.add('op-0')
      })
    });
  });

//   function backMenu() {
    let atrasArray = document.querySelectorAll(
      ".navegacion .submenu li.go-back"
    );

    atrasArray.forEach((atras) => {
      atras.addEventListener("click", () => {
        let nodo = atras.parentElement;
        nodo.classList.add("l-minus-320");
        nodo.classList.remove("l-cero");
        // console.log(nodo);

        let show = document.querySelectorAll('.op-0');
      show.forEach((i) => {
          i.classList.remove('op-0');
          i.classList.add('op-1')
      })
      });
    });
//   }


};
