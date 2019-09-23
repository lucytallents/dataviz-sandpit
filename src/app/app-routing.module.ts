import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component'
import { DcExampleComponent } from './views/dc-example/dc-example.component'
import { LoadcsvComponent } from './views/loadcsv/loadcsv.component'



const routes: Routes = [  {
  path: 'home', component: HomeComponent,
},
{
  path: 'dc-example', component: DcExampleComponent,
},
{
  path: 'loadcsv', component: LoadcsvComponent,
},
// {
//   path: 'dataviz/cites', component: CitesComponent, 
//   pathMatch: 'full',
//   resolve: {centroid: CentroidResolver}
// },
{
  path: '**', redirectTo: '/home'
},
{
  path: '', redirectTo: '/home', pathMatch: "full"
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
