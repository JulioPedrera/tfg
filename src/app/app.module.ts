import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { News } from '../pages/news/news';
import { Graphs } from '../pages/graphs/graphs';
import { Profes } from '../pages/profes/profes';
import { Perfil } from '../pages/perfil/perfil';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Tabs } from '../pages/tabs/tabs';
import { LocalDataService } from './local-data.service';
import { ApiComponents } from './components/api-components';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Login,
    News,
    Graphs,
    Profes,
    Perfil,
    Tabs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom'}),
    TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    News,
    Graphs,
    Profes,
    Perfil,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalDataService,
		ApiComponents,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
