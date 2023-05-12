import {Component, OnInit,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  title = 'DB2';


  user: any = {};
  usuarioInvalido: boolean = false;


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  funcion() {
    const inputText = document.getElementById('input-text') as HTMLInputElement;
    const sendButton = document.getElementById('send-button');
    if (sendButton != null) {
      sendButton.addEventListener('click', async () => {
        const text = inputText ? inputText.value : '';
        const response = await axios.post('/custom-table', {text});
        console.log(response.data);
      });
    }
  }




}
