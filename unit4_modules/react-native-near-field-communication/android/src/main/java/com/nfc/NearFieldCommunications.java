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

public class NearFieldCommunications  extends ReactContextBaseJavaModule  implements CreateNdefMessageCallback {
    public Activity activity;
    String _message = null;
    public NfcAdapter nfcAdapter;
    public NearFieldCommunications( ReactApplicationContext reactContext, Activity activity, NfcAdapter nfcAdapter){
        super(reactContext);
        this.activity  = activity;
        this.nfcAdapter = nfcAdapter;
    }
    
    public NearFieldCommunications( ReactApplicationContext reactContext){
        super(reactContext);
    }
    
    public void processIntent(Intent intent){
        Parcelable[] rawMsgs = intent.getParcelableArrayExtra(
                NfcAdapter.EXTRA_NDEF_MESSAGES);
        // only one message sent during the beam
        NdefMessage msg = (NdefMessage) rawMsgs[0];
        WritableMap params = Arguments.createMap();
        contact.putString("text", new String(msg.getRecords()[0].getPayload()));
        Toast.makeText(activity,new String(msg.getRecords()[0].getPayload()), Toast.LENGTH_LONG).show();
        sendEvent(reactContext, "nfcText", params);
        // record 0 contains the MIME type, record 1 is the AAR, if present
        // textView.setText(new String(msg.getRecords()[0].getPayload()));
    }
    private void sendEvent(ReactContext reactContext,
                       String eventName,
                       @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
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