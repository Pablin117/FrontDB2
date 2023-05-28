import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  public itemsArray: any;
  user: any = {};
  pass: string = ""


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.funcionTabla()
    this.funcionModal()
    localStorage.clear()

  }

  async funcionTabla() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const resultadoElement = document.getElementById('resultado');
    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          const response = await axios.post('http://localhost:4043/connect-db', {
            url: 'dbOS2',
            username: 'root',
            password: 'cristian13',
            sentencia: sentencia
          });
          const info = response.data;
          if (typeof response.data === 'object') {
            if (resultadoElement != null) {
              resultadoElement.innerHTML = ''
              if (info.length > 0) {
                const fields = Object.keys(info[0]);
                console.log(fields)
                const headerRow = document.createElement('tr');
                fields.forEach(field => {
                  const headerCell = document.createElement('th');
                  headerCell.textContent = field;
                  headerRow.appendChild(headerCell);
                });
                resultadoElement.appendChild(headerRow)
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
                  resultadoElement.appendChild(row); // Agregar la fila al cuerpo de la tabla
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
          alert("No hay comunicación con el servidor");
        }
      });
    }
  }


  async funcionModal() {
    const modal = document.getElementById('Modal');
    const btn = document.getElementById('abrirModal');
    const closeBtn = document.getElementsByClassName('close')[0] as HTMLElement;
    const sendButton = document.getElementById('send-buttonU');

    if (btn) {
      btn.onclick = function () {
        if (modal) {
          modal.style.display = 'block';
          console.log("entro ")
          if (sendButton != null) {
            sendButton.addEventListener('click', async () => {
              try {
                const response = await axios.post('http://localhost:4043/check-db', {
                  url: 'dbOS2', username: 'root', password: 'cristian13'
                });
                const info = response.data;
                console.log(info)


              } catch (error) {
                console.error(error);
                alert("No hay comunicación con el servidor");
              }
            });

          }
        }
      };
    }
    if (closeBtn) {
      closeBtn.onclick = function () {
        if (modal) {
          modal.style.display = 'none';
        }
      };
    }

    window.onclick = function (event) {
      if (modal && event.target === modal) {
        modal.style.display = 'none';
        console.log("windo")
      }
    }
  }


}
