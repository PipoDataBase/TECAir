import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmtCf1NpRGNGfV5yd0VFalxSTnZZUiweQnxTdEZiWX9ccHVUQ2JaV0NzXw==");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
