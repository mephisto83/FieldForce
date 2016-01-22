package com.nfc;

import android.app.Activity;

import android.content.Intent;
import android.nfc.NfcEvent;
import android.nfc.NdefMessage;
import android.widget.Toast;

import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.NfcAdapter.CreateNdefMessageCallback;
import android.nfc.NfcEvent;
import android.os.Parcelable;
import java.nio.charset.Charset;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class NearFieldCommunications  extends ReactContextBaseJavaModule  implements CreateNdefMessageCallback {
    public Activity activity;
    String _message = null;
    public NfcAdapter nfcAdapter;
    ReactApplicationContext _reactContext;
    private static Intent _intent;
    public NearFieldCommunications( ReactApplicationContext reactContext, Activity activity, NfcAdapter nfcAdapter){
        super(reactContext);
        this.activity  = activity;
        this.nfcAdapter = nfcAdapter;
        this._reactContext = reactContext;
    }
    
    public void processIntent(Intent intent){
        Parcelable[] rawMsgs = intent.getParcelableArrayExtra(
                NfcAdapter.EXTRA_NDEF_MESSAGES);
        // only one message sent during the beam
        NdefMessage msg = (NdefMessage) rawMsgs[0];
        if(msg != null){ 
            NdefRecord[] records = msg.getRecords();
            if(records != null && records.length > 0) {
                WritableMap params = Arguments.createMap();
                WritableArray data = Arguments.createArray();
                for(int i = 0; i < records.length; i++){
                    WritableMap messageParams = Arguments.createMap();
                    messageParams.putString("text", new String(records[i].getPayload()));
                    data.pushMap(messageParams);
                }
                params.putArray("messages", data);
                ReactApplicationContext reactContext = getReactApplicationContext();
                
                // Toast.makeText(activity,new String(msg.getRecords()[0].getPayload()), Toast.LENGTH_LONG).show();
                if(reactContext != null) {
                    sendEvent(reactContext, "nfcText", params);
                    NearFieldCommunications._intent = null;
                }
                else{
                    NearFieldCommunications._intent = intent;
                    Toast.makeText(activity,"No context found ", Toast.LENGTH_LONG).show();
                }
            }
        }
        // record 0 contains the MIME type, record 1 is the AAR, if present
        // textView.setText(new String(msg.getRecords()[0].getPayload()));
    }
    private void sendEvent(ReactContext reactContext,
                       String eventName,
                       WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
    @ReactMethod
    public void exposeIntent(){
        if(NearFieldCommunications._intent != null) {
            this.processIntent(NearFieldCommunications._intent);
        }
        else {
            //  WritableMap params = Arguments.createMap();
            //     ReactApplicationContext reactContext = getReactApplicationContext();
            //     sendEvent(reactContext, "nfcText", params);
        }
    }
    @ReactMethod
    public void setMessage(String message){
        this._message = message;
        
        if(this.nfcAdapter != null){
          NdefMessage mess = this.createNdefMessage(null);
          this.nfcAdapter.setNdefPushMessage(mess, this.activity);  
        }
    }
    
    @Override
    public NdefMessage createNdefMessage(NfcEvent event) {
        String text = _message == null ? ("Beam me up, Android!\n\n" +
                "Beam Time: " + System.currentTimeMillis()) : _message;
        NdefMessage msg = new NdefMessage(
                new NdefRecord[] { NdefRecord.createMime("text/plain", text.getBytes())
         /**
          * The Android Application Record (AAR) is commented out. When a device
          * receives a push with an AAR in it, the application specified in the AAR
          * is guaranteed to run. The AAR overrides the tag dispatch system.
          * You can add it back in to guarantee that this
          * activity starts when receiving a beamed message. For now, this code
          * uses the tag dispatch system.
          */
          //,NdefRecord.createApplicationRecord("com.example.android.beam")
        });
        return msg;
    }
     
  
    @Override
    public String getName() {
        return "NearFieldCommunications";
    }
}