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
  private json: any;
  private string: any;


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.funcionTabla()
  }

   clearOutput() {
     const tableBody = document.getElementById('table-body');
     const resultadoElement = document.getElementById('resultado');
    if (tableBody != null) {
      tableBody.innerHTML = '';
    }
     if (resultadoElement != null) {
       resultadoElement.innerHTML = '';
     }
  }

  async funcionTabla() {

    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const tableBody = document.getElementById('table-body');
    const resultadoElement = document.getElementById('resultado');


    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          const response = await axios.post('http://localhost:4043/custom-table', {sentencia});
          if (typeof response.data === 'object') {
            console.log("entro en object")
            // La respuesta es un objeto JSON




            if (tableBody != null ) {
              // Limpiar el contenido de la tabla
              tableBody.innerHTML = '';
              console.log("entro")

              const info = response.data;
              if (info.length > 0) {
                // Obtener los campos presentes en los objetos de la respuesta
                const fields = Object.keys(info[0]);
                // Crear las columnas de la tabla
                const headerRow = document.createElement('tr');
                fields.forEach(field => {
                  const headerCell = document.createElement('th');
                  headerCell.textContent = field;
                  headerRow.appendChild(headerCell);
                });
                tableBody.appendChild(headerRow);
                // Iterar sobre los objetos del array y agregar filas a la tabla
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
                  tableBody.appendChild(row);
                });
              }
            }
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

