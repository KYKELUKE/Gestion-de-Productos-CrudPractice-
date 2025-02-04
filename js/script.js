document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const agregarBtn = document.getElementById("agregarProducto");
  const listadoBtn = document.getElementById("listaproductos");
  const modal = document.getElementById("modal");
  const cerrarModal = document.getElementById("cerrarModal");
  const tablaProductos = document
    .getElementById("tablaProductos")
    .getElementsByTagName("tbody")[0];

  const modalConfirmacion = document.getElementById("modalConfirmacion");
  const btnAceptar = document.getElementById("btnAceptar");
  const btnCancelar = document.getElementById("btnCancelar");

  let productos = [];
  let productoEditando = null;

  listadoBtn.addEventListener("click", function () {
    tablaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
      const row = tablaProductos.insertRow();

      row.insertCell(0).textContent = producto.nombre;
      row.insertCell(1).textContent = producto.cantidad;
      row.insertCell(2).textContent = producto.categoria;
      row.insertCell(3).textContent = producto.fecha;
      row.insertCell(4).textContent = producto.precio;

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.onclick = function () {
        productos.splice(index, 1);
        row.remove();
      };
      row.insertCell(5).appendChild(eliminarBtn);

      const editarBtn = document.createElement("button");
      editarBtn.textContent = "Editar";
      editarBtn.onclick = function () {
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("cantidad").value = producto.cantidad;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("fecha").value = producto.fecha;
        document.getElementById("precio").value = producto.precio;

        productoEditando = index;

        agregarBtn.textContent = "Actualizar Producto";

        modal.style.display = "none";
      };
      row.insertCell(6).appendChild(editarBtn);
    });

    modal.style.display = "flex";
  });

  cerrarModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  agregarBtn.addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const cantidad = document.getElementById("cantidad").value;
    const categoria = document.getElementById("categoria").value;
    const fecha = document.getElementById("fecha").value;
    const precio = document.getElementById("precio").value;

    if (nombre && cantidad && categoria && fecha && precio) {
      if (productoEditando !== null) {
        modalConfirmacion.style.display = "flex";

        btnAceptar.addEventListener("click", function () {
          productos[productoEditando] = {
            nombre,
            cantidad,
            categoria,
            fecha,
            precio,
          };

          const row = tablaProductos.rows[productoEditando];
          row.cells[0].textContent = nombre;
          row.cells[1].textContent = cantidad;
          row.cells[2].textContent = categoria;
          row.cells[3].textContent = fecha;
          row.cells[4].textContent = precio;

          formulario.reset();
          agregarBtn.textContent = "Agregar Producto";
          productoEditando = null;
          modalConfirmacion.style.display = "none";
          modal.style.display = "none";
        });

        btnCancelar.addEventListener("click", function () {
          modalConfirmacion.style.display = "none";
        });
      } else {
        const producto = { nombre, cantidad, categoria, fecha, precio };
        productos.push(producto);

        formulario.reset();
        modal.style.display = "none";
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  const botonLimpiar = document.querySelector('button[type="reset"]');
  botonLimpiar.addEventListener("click", () => {
    formulario.reset();
  });
});
