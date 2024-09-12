let add_to_cart = fetchData();
let total_price = 0 ;
function fetchData() {
  return fetch("http://localhost:3000/add_to_cart")
    .then((response) => response.json())
    .then((data) => {
      let notify = 0; 
      data.forEach((element) => {
        let carts_container = document.querySelector("#add-to-cart");
        let cart_li = document.createElement("li");
        cart_li.classList.add("header-cart-item", "flex-w", "flex-t", "m-b-12");
        cart_li.innerHTML = `
                            <div class="header-cart-item-img">
							<img src="${element.img}" alt="IMG">
						</div>
						<div class="header-cart-item-txt p-t-8">
            	<div class="d-flex flex-sb">
						<span>
							<a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                            ${element.name}
							</a>
							<span class="header-cart-item-info">
                            ${element.price}
							</span>
             </span>
					<button class="btn btn-outline-danger" onclick="removeFromCart(${element.id})" >
							<i class="zmdi zmdi-delete"></i>
						</button>
						</div>
						</div>
            `;
        carts_container.appendChild(cart_li);
        notify++;
        
        total_price +=   parseInt(element.price);
      });

      document.querySelector("#total-price").innerHTML= '$' + total_price;
      document.querySelector("#cart-icon").setAttribute("data-notify", notify);
      document.querySelector("#cart-icon1").setAttribute("data-notify", notify);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}


function removeFromCart(id) {
  fetch(`http://localhost:3000/add_to_cart/${id}`)
      .then(response => {
          if (response.ok) {
              return fetch(`http://localhost:3000/add_to_cart/${id}`, {
                  method: 'DELETE'
              });
          } else {
              throw new Error('Item not found');
          }
      })
      .then(response => response.json())
      .then(data => {
          console.log('Item deleted:', data);
      })
      .catch(error => {
          console.error('Error deleting item:', error.message);
      });
}






