import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  title = 'DB2';
  public columns: string[] = [];
  public rows: any;
  public objeto: any;
  public objetos: any;
  public itemsArray: any;
  prueba:any;
  tabla:string[];

  constructor(private http: HttpClient) {
this.tabla = []
  }

  ngOnInit(): void {
    this.funcionTabla2()
  }

  async  funcionTabla() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const tableBody = document.getElementById('table-body');
    const resultadoElement = document.getElementById('resultado');

    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          const response = await axios.post('http://localhost:4043/custom-table', { sentencia });
          const info = response.data;
          console.log(info)
          if (typeof response.data === 'object') {


            if (tableBody != null) {
              const tableParent = tableBody.parentNode; // Obtener el padre de la tabla
              console.log("entro en if")
              // Eliminar temporalmente la tabla original
              tableBody.remove();

              // Crear una nueva tabla vacía
              const newTable = document.createElement('tbody');
              newTable.id = 'table-body';
              newTable.className = tableBody.className;

              if (info.length > 0) {
                const fields = Object.keys(info[0]);
                const headerRow = document.createElement('tr');
                fields.forEach(field => {
                  const headerCell = document.createElement('th');
                  headerCell.textContent = field;
                  headerRow.appendChild(headerCell);
                });
                newTable.appendChild(headerRow);
                info.forEach((item: any) => {
                  const row = document.createElement('tr');
                  fields.forEach(field => {
                    const cell = document.createElement('td');
                    const value = item[field];
                    if (typeof value === 'object') {
                      cell.textContent = JSON.stringify(value);
                    } else {
                      cell.textContent = value;
                    }
                    row.appendChild(cell);
                  });
                  newTable.appendChild(row);
                });
              }

              // Reinsertar la nueva tabla en el lugar de la tabla original
              tableParent?.appendChild(newTable);
            }
          } else if (typeof response.data === 'string') {
            if (resultadoElement != null) {
              resultadoElement.innerHTML = response.data;
            }
          }
        } catch (error) {
          console.error(error);
          alert("No hay comunicación con el servidor");
        }
      });
    }
  }


  async funcionTabla2() {

    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const tableBody = document.getElementById('table-body');
    const resultadoElement = document.getElementById('resultado');


    if (sendButton != null ) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          const response = await axios.post('http://localhost:4043/custom-table', {sentencia});


          if (typeof response.data === 'object') {
            console.log("entro en object")
            // La respuesta es un objeto JSON

            //NUEVO
            this.prueba = response.data
            this.prueba = JSON.stringify(response.data)
            this.prueba = JSON.parse(this.prueba)

            console.log(this.prueba)


            for(let obj of this.prueba){
              var seg = obj

              for(var key in seg){
                console.log(key)
                this.tabla.push(key)
              }
              break
            }

            console.log(this.tabla)
            //NUEVOO


            /*
                        for (const objetoKey in this.objeto) {
                          if (this.objeto.hasOwnProperty(objetoKey)) {
                            console.log(`Iterando sobre el objeto ${objetoKey}:`);
                            this.objetos = this.objeto[objetoKey];
                            for (const clave in this.objetos) {
                              if (this.objetos.hasOwnProperty(clave)) {
                                const valor = this.objetos[clave];
                                console.log(`${clave}: ${valor}`);
                              }
                            }
                          }
                        }


             */


          } else if (typeof response.data === 'string') {

            if (resultadoElement != null) {
              resultadoElement.innerHTML = response.data;

            }
          }
        } catch (error) {
          console.error(error);
          alert("Debes ingresar una sentencia");
        }
      });
    }
  }



}
