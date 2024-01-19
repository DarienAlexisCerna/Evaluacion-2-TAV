import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Iregistrar } from '../interfaces/interfaces';
import { ApicrudService } from 'src/app/servicios/apicrud.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newregistrar: Iregistrar = {
    id:0,
    username: "",
    password: "",
    asignatura: "",
    role: "",
    isactive: true
  };

  RegistroForm :FormGroup;

  userdata:any;


  constructor(private authservice: AuthService,
    private router: Router,
    private apicrud: ApicrudService,
    private alertController: AlertController, 
    private toastController: ToastController, 
    private builder: FormBuilder){
    this.RegistroForm = this.builder.group({
      'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(4)])
    })
  } 
  ngOnInit() {
  }

  usuario={
    id:0,
    username:"",
    password:"",
    role:"",
    isactive: true
  }




  async MostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Registro completo!',
      message: 'Se ha registrado correctamente!',
      buttons: ['OK'],
    });
    await alert.present();
  }



  crearRegistrar(){
    this.apicrud.crearregistrar(this.newregistrar).subscribe();
    this.router.navigateByUrl("/inicio");
  }


  Registro(){
    if (this.RegistroForm.valid){
      this.authservice.GetUserById(this.RegistroForm.value.username).subscribe(resp=>{ 
        this.userdata=resp;
        console.log(this.userdata);
        if (this.userdata.length>0){    //si cumple la condición el objeto trae datos
          this.usuario={                //userdata llega en formato de arreglo
            id : this.userdata[0].id,
            username: this.userdata[0].username,
            password: this.userdata[0].password,
            role: this.userdata[0].role,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password===this.RegistroForm.value.password){
            if (this.usuario.isactive){
              //iniciamos sesión del usuarios 
              sessionStorage.setItem('username', this.usuario.username);
              sessionStorage.setItem('userrole', this.usuario.role);
              sessionStorage.setItem('ingresado', 'true');
              //invocamos una alerta utilizando Toast
              this.showToast('Sesión Iniciada');
              this.router.navigateByUrl("/inicio");
            }
          
          }

        }
      })

    }
    

  }
  async showToast(msg: any){
    const toast= await this.toastController.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }
}
