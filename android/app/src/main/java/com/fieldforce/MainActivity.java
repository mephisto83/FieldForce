package com.fieldforce;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import android.nfc.NfcAdapter.CreateNdefMessageCallback;
import android.content.Intent;
import android.app.PendingIntent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.content.IntentFilter.MalformedMimeTypeException;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.smixx.reactnativeicons.ReactNativeIcons;  // <--- import
import java.util.Arrays; // <--- import this if you want to specify which fonts to load
import com.smixx.reactnativeicons.IconFont; // <--- import this if you want to specify which fonts to load

import android.nfc.NfcAdapter;
import android.nfc.NfcEvent;
import android.widget.Toast;
import com.nfc.NFCManager;

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler, CreateNdefMessageCallback  {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private NfcAdapter mNfcAdapter;
    private NFCManager nfcPackage;
    PendingIntent pendingIntent;
     IntentFilter[] intentFiltersArray;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        // Check for available NFC Adapter
        mNfcAdapter = NfcAdapter.getDefaultAdapter(this);
        nfcPackage = new NFCManager(this, mNfcAdapter);
         if (mNfcAdapter == null) {
            Toast.makeText(this, "NFC is not available", Toast.LENGTH_LONG).show();
        }
        else {
            Toast.makeText(this, "NFC is available", Toast.LENGTH_LONG).show();
            
            pendingIntent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0);
             IntentFilter ndef = new IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED);
                 try {
                            ndef.addDataType("text/plain");    /* Handles all MIME based dispatches.
                                                You should specify only the ones that you need. */
                  }
                    catch (MalformedMimeTypeException e) {
                        throw new RuntimeException("fail", e);
                    }
            intentFiltersArray = new IntentFilter[] {ndef };
            // Register callback
            mNfcAdapter.setNdefPushMessageCallback(this, this);
        }
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new ReactNativeIcons())              // <------ add here
                .addPackage(nfcPackage)
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "FieldForce", null);

        setContentView(mReactRootView);
    }
    @Override
    public NdefMessage createNdefMessage(NfcEvent event) {
        return nfcPackage.createNdefMessage(event);
    }
    
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
      } else {
        super.onBackPressed();
      }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
      super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mNfcAdapter.disableForegroundDispatch(this);

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this, this);
        }
        mNfcAdapter.enableForegroundDispatch(this, pendingIntent, intentFiltersArray,  new String[][] {  new String[] { } });

        Intent intent = getIntent();
        // Check to see that the Activity started due to an Android Beam
        if (intent  != null && NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction()) && nfcPackage != null) {
            
            nfcPackage.processIntent(intent);
        }
    }
    
    @Override
    public void onNewIntent(Intent intent) {
        // onResume gets called after this to handle the intent
        // setIntent(intent);
        nfcPackage.processIntent(intent);
    }
}
