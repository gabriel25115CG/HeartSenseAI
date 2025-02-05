import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, MarkdownModule.forRoot())  
  ]
}).catch(err => console.error(err));
