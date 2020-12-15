package com.rnn;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends NavigationActivity {

  // copy these lines
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
  }
  
}
