package com.nfc;

import android.app.Activity;

import android.content.Intent;
import android.nfc.NfcEvent;
import android.nfc.NdefMessage;
import android.nfc.NfcAdapter;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class NFCManager implements ReactPackage {
    private NearFieldCommunications nfcCommunications;
    private Activity _activity;
    private NfcAdapter _nfcAdapter;
    private Intent _intent;
    private ReactApplicationContext appContext;
    public NFCManager(Activity activity, NfcAdapter nfcAdapter) {
        this._activity = activity;
        this._nfcAdapter = nfcAdapter;
    }
    
    public void processIntent(Intent intent) {
        if(nfcCommunications == null) {
            createNfcCommunications();
        }
        
        if(nfcCommunications != null) {
                nfcCommunications.processIntent(intent);
        }
        else {
            this._intent = intent;
            Toast.makeText(_activity, "No nfc communcations", Toast.LENGTH_LONG).show();
        }
    }
    
    public NdefMessage createNdefMessage(NfcEvent event) {
        if(nfcCommunications != null) {
            return nfcCommunications.createNdefMessage(event);
        }
        else {
            Toast.makeText(_activity, "Create ndef:No nfc communcations", Toast.LENGTH_LONG).show();
        }
        return null;
    }
    void createNfcCommunications(){
        if(this.appContext != null)
            this.nfcCommunications = new NearFieldCommunications(this.appContext, this._activity, this._nfcAdapter);
    }
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        this.appContext = reactContext;
        createNfcCommunications();
        
        modules.add(nfcCommunications);
        if(this._intent != null){
                nfcCommunications.processIntent(this._intent);
        }
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
    }
    
}