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


}
