import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs";
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
  usuarioInvalido: boolean = false;
  msjUsuarioInvalido: String = "El usuario o contraseña son incorrectas."

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.funcionTabla()
    this.funcionModal()
    localStorage.clear()
    this.limpiar()
  }

  async funcionTabla() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const resultadoElement = document.getElementById('resultado');



    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const sentencia = inputText.value;
        try {
          //const response = await axios.post('http://localhost:4043/custom-table', {sentencia, result, usuario} );
          const response = await axios.post('http://localhost:4043/connect-db', {url: 'dbOS2', username: 'root', password: 'Tumadre12', sentencia: sentencia});
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
                  console.log(headerCell)
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
    const sendButton = document.getElementById('send-button');

    if (btn) {
      btn.onclick = function () {
        if (modal) {
          modal.style.display = 'block';
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

      if (sendButton != null) {
        sendButton.addEventListener('click', async () => {
          try {
            //const response = await axios.post('http://localhost:4043/custom-table', {sentencia, result, usuario} );
            const response = await axios.post('http://localhost:4043/connect-db', {
              url: 'dbOS2', username: 'root', password: 'Tumadre21'
            });
            const info = response.data;

          } catch (error) {
            console.error(error);
            alert("No hay comunicación con el servidor");
          }
        });

      }

    }

  }

  formulariologin() {
    this.usuarioInvalido = false
    let formularioValido: any = document.getElementById("loginForm");
    if (formularioValido.reportValidity()) {
      //llamada al servicio de login
      this.servicioLogin().subscribe(
        (respuesta: any) => this.login(respuesta)
      )
    }
  }

  servicioLogin() {
    if(this.user.usuario !== undefined ){

      this.user.usuario = this.user.usuario.toUpperCase()
    }else{
      console.log("no existe en la db")
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    console.log(this.user);
    return this.http.post<any>("http://localhost:4043/check-db", this.user, httpOptions).pipe(
      catchError(e => "e")
    )

  }

  login(res: any) {
    console.log(res);

  }

  limpiar(){
    this.user = {};
    this.pass  = ""
  }

}
