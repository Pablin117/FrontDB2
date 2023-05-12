import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import axios from 'axios';
import {catchError} from "rxjs";

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

 this.makeRequest()
    this.funcion2();
  }

  async makeRequest() {
    console.log("soi");
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const resultadoElement = document.getElementById('resultado');

    if (sendButton != null && resultadoElement != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          const response = await axios.post('http://localhost:4043/custom-table', { sentencia });
          console.log(response.data);
          if (response.data == "e") {
            alert("No hay servicio");
          } else {
            if (typeof response.data === 'string') {
              // La respuesta es un string
              console.log(response.data);
              resultadoElement.innerHTML = response.data;
            } else if (typeof response.data === 'object') {
              // La respuesta es un objeto JSON
              console.log(response.data);
            }
          }
        } catch (error) {
          console.error(error);
          alert("Debes ingresar una sentencia");
        }
      });
    }
  }

  async funcion2() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const tableBody = document.getElementById('table-body');

    const sendButton = document.getElementById('send-button');
    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;

        try {
          const response = await this.http.post('http://localhost:4043/custom-table', { sentencia }).toPromise();
          console.log(response);

          if (tableBody) {
            // Limpiar el contenido de la tabla
            tableBody.innerHTML = '';

            const info = response && response && response;
            if (info && Array.isArray(info) && info.length > 0) {
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
              info.forEach(item => {
                const row = document.createElement('tr');
                fields.forEach(field => {
                  const cell = document.createElement('td');
                  cell.textContent = item[field];
                  row.appendChild(cell);
                });
                tableBody.appendChild(row);
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

}
