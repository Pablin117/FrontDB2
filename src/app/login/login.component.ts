import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variables
  connection:any = {}
  alert:any
  bl_alert:boolean = false

  ngOnInit(): void {
  localStorage.clear()
  }

  //conexion a la db - form de login
  async connect(){
    try{


      console.log(this.connection)
      const response = await axios.post('http://localhost:4043/check-db', {
        url: this.connection.db,
        username: this.connection.user,
        password: this.connection.password
      });

      const info = response.data;
      const message: string = info.message;
      const error: string = info.error;
      console.log(info)
      console.log(message)
      console.log(error)

      if (message != null) {
        localStorage.setItem("connection", JSON.stringify(this.connection))
        location.href="/home"
      } else {
        this.bl_alert = true
        this.alert = error
      }

    }catch (error){
      console.error(error);
      alert("No hay comunicación con el servidor");
    }
  }
}

