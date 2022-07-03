package com.ecomedic.medlink;

import android.app.Application;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
// import com.beefe.picker.PickerViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableNativeMap;
import java.util.Arrays;
import java.util.List;
import org.reactnative.camera.RNCameraPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.horcrux.svg.SvgPackage;
import com.christopherdro.RNPrint.RNPrintPackage;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new MapsPackage(),
          new LinearGradientPackage(),
          new RNFusedLocationPackage(),
          new RNVersionNumberPackage(),
          new RNGestureHandlerPackage(),
          new RNVersionCheckPackage(),
          new VectorIconsPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseMessagingPackage(),
          new PickerPackage(),
          new FastImageViewPackage(),
          new MPAndroidChartPackage(),   
          new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
          new RNCameraPackage(),
          new PhotoViewPackage(),
          new RNSoundPackage(),
          new SvgPackage(),
          new RNPrintPackage(),
          new RNHTMLtoPDFPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    ReadableNativeArray.setUseNativeAccessor(true);
    ReadableNativeMap.setUseNativeAccessor(true);
  }
}
