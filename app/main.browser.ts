/**
 * Created by vjain3 on 10/6/16.
 */
import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module';

let upgradeAdapter = new UpgradeAdapter(AppModule);

upgradeAdapter.bootstrap(document.documentElement, ['contivApp']);
