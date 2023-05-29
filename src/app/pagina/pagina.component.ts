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



  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.funcionTabla()
    this.funcionModal1()
    localStorage.clear()

  }

  async funcionTabla() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const resultadoElement = document.getElementById('resultado');

    console.log(inputText)
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
    const btn = document.getElementById('abrirModal');
    const closeBtn = document.getElementsByClassName('close')[0] as HTMLElement;
    const modal = document.getElementById('Modal');

    if (btn) {
      btn.onclick = function () {
        if (modal) {
          modal.style.display = 'block';

          const sendButton = document.getElementById('send-buttonU');
          const UserInput = document.getElementById('user-text') as HTMLInputElement;
          const passwordInput = document.getElementById('password-text') as HTMLInputElement;
          const esquemaInput = document.getElementById('esquema-text') as HTMLInputElement;


          const user = UserInput.value;
          const password = passwordInput.value;
          const esquema = esquemaInput.value;



          if (sendButton != null) {
            sendButton.addEventListener('click', async () => {
              try {
                const response = await axios.post('http://localhost:4043/check-db', {
                  url: 'dbOS2', username: 'root', password: 'cristian13'
                });
                const info = response.data;
                const message: string = info.message;
                alert(message)
                modal.style.display = 'none';
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
      }
    }
  }

  async  funcionModal1() {
    const btn = document.getElementById('abrirModal');
    const closeBtn = document.getElementsByClassName('close')[0] as HTMLElement;
    const modal = document.getElementById('Modal');

    if (btn) {
      btn.onclick = function () {
        if (modal) {
          modal.style.display = 'block';

          const sendButton = document.getElementById('send-buttonU');

          if (sendButton) {
            sendButton.addEventListener('click', async () => {
              const UserInput = document.getElementById('user-text') as HTMLInputElement;
              const passwordInput = document.getElementById('password-text') as HTMLInputElement;
              const esquemaInput = document.getElementById('esquema-text') as HTMLInputElement;

              const user = UserInput.value;
              const password = passwordInput.value;
              const esquema = esquemaInput.value;

              try {
                const response = await axios.post('http://localhost:4043/check-db', {
                  url: 'dbOS2', username: user, password: password
                });
                const info = response.data;
                const message: string = info.message;
                alert(message)
                modal.style.display = 'none';
              } catch (error) {
                console.error(error);
                alert("No hay comunicación con el servidor");
              }
            });
          }
        }
      };
    }

    // Resto del código...
  }


}
