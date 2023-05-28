import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  //variables
  user: any = {};
  pass: string = ""
  usuarioInvalido: boolean = false;
  msjUsuarioInvalido: String = "El usuario o contraseña son incorrectas."

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    localStorage.clear()
    this.limpiar()

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
    return this.http.post<any>("http://localhost:4043/usuario/login", this.user, httpOptions).pipe(
      catchError(e => "e")
    )

  }

  login(res: any) {
    if(res =="e"){
      alert("¡No hay comunicación con el servidor!")
    }else{
      if (res.idusuario != 0) {
        res = JSON.parse(JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(this.user))
        location.href = "/home";
      }else{
        this.usuarioInvalido = true
        this.limpiar()
      }
    }

  }

  limpiar(){
    this.user = {};
    this.pass  = ""
  }


}
