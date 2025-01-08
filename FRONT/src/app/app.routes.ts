import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component'; 
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard'; 
import { ProfileComponent } from '../profile/profile.component';
import { DocsComponent } from './docs/docs.component';
import { AppComponent } from './app.component';


export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'faq', component: FaqComponent},
    { path: 'terms', component: TermsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'docs', component: DocsComponent},

];
