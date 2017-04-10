package com.Salesforce.SalesforceSProximityConL3J;

import android.app.Application;

import com.estimote.sdk.EstimoteSDK;

//
// Running into any issues? Drop us an email to: contact@estimote.com
//

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        // this is to allow the application to interact with estimote cloud
        EstimoteSDK.initialize(getApplicationContext(), "salesforce-s-proximity-con-l3j", "b81487cb4477fc166881c19f744041cd");

        // uncomment to enable debug-level logging
        // it's usually only a good idea when troubleshooting issues with the Estimote SDK
//        EstimoteSDK.enableDebugLogging(true);
    }
}
