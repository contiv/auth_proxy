/**
 * Created by vjain3 on 10/14/16.
 */
import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module';

export const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(AppModule);