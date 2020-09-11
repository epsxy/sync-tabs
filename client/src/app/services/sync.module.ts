import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from '@angular/core';
import { SyncStoreService } from './sync.service';

@NgModule({
    providers: [SyncStoreService],
})
export class SyncStoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: SyncStoreModule) {
        if (parentModule) {
            throw new Error(
                'SyncStoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
    static forRoot(channelName: string, blacklist: string[]): ModuleWithProviders<SyncStoreModule> {
        return {
            ngModule: SyncStoreModule,
            providers: [
                SyncStoreService,
                { provide: 'blacklist', useValue: blacklist },
                { provide: 'channelName', useValue: channelName },
            ],
        };
    }
}
