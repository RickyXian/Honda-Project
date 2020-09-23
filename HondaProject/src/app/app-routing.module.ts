import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShorttermComponent } from './components/shortterm/shortterm.component';
import { StchartsComponent } from './components/stcharts/stcharts.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'shortterm', component:ShorttermComponent},
  {path: 'stcharts', component:StchartsComponent},
  {path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
