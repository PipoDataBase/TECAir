import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpRGNGfV5yd0VFalhRTnVdUiweQnxTdEZiWX5fcHdRRmNfV01wWA==");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
