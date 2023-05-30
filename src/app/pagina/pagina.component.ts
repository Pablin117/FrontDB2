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

  init:boolean = false
  connection:any = {}
  usuario: any;
  password: any;
  esquema: any;
  valid_user: boolean = false;


  constructor(private http: HttpClient) {
    this.valid_user = false
  }

  ngOnInit(): void {
    this.validation()
    this.funcionModal()
    this.funcionTabla()

  }

  validation(){
    //Seteo de variables de conexión para cada sentencia

    this.connection.user = localStorage.getItem("user")
    if(this.connection.user == null || this.connection.user == ""){
      this.connection = localStorage.getItem("connection")
      this.connection = JSON.parse(this.connection)
    }else{
      this.connection.password = localStorage.getItem("password")
      this.connection.db = localStorage.getItem("db")

    }
    //validación para sacar al usuario si no se ha logeado
     if(this.connection == null || this.connection.user == null || this.connection.user == ""){
       location.href=""
     }
  }

  async funcionTabla() {

    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    const resultadoElement = document.getElementById('resultado');


    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        this.validation()
        const sentencia = inputText.value;
        console.log(sentencia)
        this.init = true
        try {


          this.usuario = this.connection.user
          this.password = this.connection.password
          this.esquema = this.connection.db

          const response = await axios.post('http://localhost:4043/execute-db', {
            url: this.esquema,
            username: this.usuario,
            password: this.password,
            sentencia: sentencia
          });
          const info = response.data;
          console.log(info)
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
          const userInput = document.getElementById('user-text') as HTMLInputElement;
          const passwordInput = document.getElementById('password-text') as HTMLInputElement;
          const esquemaInput = document.getElementById('esquema-text') as HTMLInputElement;

          if (sendButton) {
            sendButton.addEventListener('click', async () => {

              try {
                const user = userInput.value;
                const password = passwordInput.value;
                const esquema = esquemaInput.value;

                console.log(user)
                console.log(password)
                console.log(esquema)

                const response = await axios.post('http://localhost:4043/check-db', {
                  url: esquema, username: user, password: password
                });
                const info = response.data;
                const message: string = info.message;
                const error: string = info.error;
                console.log(info)
                console.log(message)
                console.log(error)

                if (message != null) {
                  localStorage.setItem("user", user);
                  localStorage.setItem("password", password);
                  localStorage.setItem("db", esquema);
                  alert(message)
                  modal.style.display = 'none';
                } else {
                  modal.style.display = 'none';
                }

              } catch (error) {
                console.error(error);
                alert("No hay comunicación con el servidor");
              }

            });
          }

          if (closeBtn) {
            closeBtn.onclick = function () {
              if (modal) {
                modal.style.display = 'none'
              }
            }
          }
        }
      };
    }
  }

  cerrar(){
    localStorage.clear()
    location.href=""
  }

}
