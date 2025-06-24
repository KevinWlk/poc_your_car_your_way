import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientChatComponent } from './chat/client-chat/client-chat.component';
import { SupportChatComponent } from './chat/support-chat/support-chat.component';

const routes: Routes = [
  { path: 'client-chat', component: ClientChatComponent },
  { path: 'support-chat', component: SupportChatComponent },
  { path: '', redirectTo: 'client-chat', pathMatch: 'full' },
  { path: '**', redirectTo: 'client-chat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
