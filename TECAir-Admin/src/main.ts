import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhIfkx3RXxbf1xzZFZMYF9bRHBPMyBoS35RdUVqWH9ec3RWRmdeVkZy");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
