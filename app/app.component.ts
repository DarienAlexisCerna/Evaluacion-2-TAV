import { Component } from '@angular/core';



interface Componente{

  name: string;

  icon: string;

  redirecTo: string;

}



@Component({

  selector: 'app-root',

  templateUrl: 'app.component.html',

  styleUrls: ['app.component.scss'],

})

export class AppComponent {

  constructor() {}





  componentes: Componente[]=[

  {

    name:'inicio',

    icon:'body-outline',

    redirecTo:'/Inicio'

  },


  {

    name:'Lista',

    icon:'information-circle-outline',

    redirecTo:'/listar'

  },
  {

    name:'qr',

    icon:'information-circle-outline',

    redirecTo:'/qr'

  },

 ]

}
