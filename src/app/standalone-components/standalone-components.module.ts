import { NgModule } from '@angular/core';
import { AboutComponent } from '../about/about.component'; // Ruta relativa

@NgModule({
  imports: [
    AboutComponent // Importa el componente standalone aquí
  ]
})
export class StandaloneComponentsModule { }
