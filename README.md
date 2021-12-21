# React Hook - Ignite </br></br>
RocketShoes é uma aplicação desenvolvida pela RocketSeat utilizando React com TypeScript, styled-components, react-toastify, Json Server e LocalStorage. O intuilto da aplicação é aplicar os conhecimentos
de React Hooks e Context Api, adiquiridos no curso RocketSeat - Ignite. 

</br>
As principais funcionalidades da aplicação:</br></br>

* Listar os produtos contidos na Api do Json Server.</br>
* Adicionar um produto ao carrinho fazendo as verificações:</br>
  * O produto já existe, adicionar uma unidade.</br>
  * A quantidade em estoque, caso a quantidade solicitada seja maior um erro utilizando o toastify é emitido.</br>
  * Caso o produto não esteja no carrinho, adiciona-se este novo ao carrinho.</br>
  * Todas as alterações são salvas no LocalStorage.</br></br>
 
* Remover um produto do carrinho fazendo as verificações:</br>
  * Emitir um erro pelo toastify caso o produto não esteja no carrinho.</br>
  * Todas as alterações são salvas no LocalStorage.</br></br>
  
* Editar as quantidades dos produtos no carrinho fazendo as verificações:</br>
  * A quantidade em estoque, caso a quantidade solicitada seja maior um erro utilizando o toastify é emitido.</br>
  * Não editar a quantidade caso seja menor que uma(1) unidade.</br>
  * Todas as alterações são salvas no LocalStorage.</br></br>
  
* Listar os produtos contidos no carrinho na Page Cart, calculando os valores totais de cada item assim como o Total da compra.</br>


https://user-images.githubusercontent.com/40667808/146815205-ddc57fd4-288e-45ff-a0e2-5047f7792aef.mp4
