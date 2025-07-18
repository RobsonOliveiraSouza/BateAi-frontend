import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, appConfig);bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...appConfig.providers!,
      importProvidersFrom(BrowserAnimationsModule)
    ]
  });