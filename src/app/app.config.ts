import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), [importProvidersFrom(HttpClientModule)], provideAnimations(), importProvidersFrom(MatNativeDateModule)],
};
